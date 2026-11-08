import { describe, expect, test } from 'bun:test';

import { guestUsageSnapshotSchema } from '@openchamber/sdk/schemas';

import type { QuotaProviderMeta } from '@/lib/quota';
import type { ProviderResult, QuotaProviderId, UsageWindow } from '@/types';

import { buildGuestUsageSnapshot, type UsageFeedInput } from './usage-feed.ts';

const usageWindow = (overrides: Partial<UsageWindow> = {}): UsageWindow => ({
  usedPercent: 10,
  remainingPercent: 90,
  windowSeconds: 18_000,
  resetAfterSeconds: null,
  resetAt: null,
  resetAtFormatted: null,
  resetAfterFormatted: null,
  ...overrides,
});

const providerResult = (overrides: Partial<ProviderResult> & { providerId: QuotaProviderId }): ProviderResult => ({
  providerName: overrides.providerId,
  ok: true,
  configured: true,
  usage: { windows: {} },
  fetchedAt: 1,
  ...overrides,
});

const meta = (id: QuotaProviderId, name: string = id): QuotaProviderMeta => ({ id, name });

const feed = (overrides: Partial<UsageFeedInput> = {}): UsageFeedInput => ({
  results: [],
  refreshErrors: {},
  providers: [],
  dropdownProviderIds: [],
  selectedModels: {},
  displayMode: 'usage',
  timeFormatPreference: 'auto',
  translate: (key) => key,
  icons: new Map(),
  updatedAt: null,
  loading: false,
  ...overrides,
});

describe('buildGuestUsageSnapshot', () => {
  test('keeps the app order and includes configured providers the user does not show', () => {
    const snapshot = buildGuestUsageSnapshot(feed({
      providers: [meta('claude', 'Claude'), meta('codex', 'Codex'), meta('google', 'Google'), meta('openrouter', 'OpenRouter')],
      results: [
        providerResult({ providerId: 'codex', providerName: 'Codex' }),
        providerResult({ providerId: 'claude', providerName: 'Claude', usage: { windows: { '5h': usageWindow() } } }),
        providerResult({ providerId: 'google', providerName: 'Google', configured: false, ok: false, usage: null }),
      ],
      refreshErrors: { openrouter: 'request failed' },
      dropdownProviderIds: ['codex'],
    }));

    expect(snapshot.providers.map((provider) => provider.id)).toEqual(['claude', 'codex', 'openrouter']);
    expect(snapshot.providers.map((provider) => provider.shown)).toEqual([false, true, false]);
    // A confirmed absence is not part of the feed.
    expect(snapshot.providers.some((provider) => provider.id === 'google')).toBe(false);
    // A first read that failed still names a provider whose configuration is unknown.
    expect(snapshot.providers[2]).toMatchObject({ configured: false, ok: false, status: 'header.services.usageUnavailable' });
  });

  test('projects windows in server order and only the selected models', () => {
    const snapshot = buildGuestUsageSnapshot(feed({
      providers: [meta('codex', 'Codex')],
      results: [providerResult({
        providerId: 'codex',
        usage: {
          windows: {
            '5h': usageWindow({ usedPercent: 12.5, remainingPercent: 87.5, resetAfterFormatted: 'in 2 h' }),
            '7d': usageWindow({ usedPercent: 60, remainingPercent: 40 }),
          },
          models: {
            'gpt-5': { windows: { weekly: usageWindow({ usedPercent: 30, remainingPercent: 70 }) } },
            'gpt-5-mini': { windows: { weekly: usageWindow({ usedPercent: 20, remainingPercent: 80 }) } },
          },
        },
      })],
      selectedModels: { codex: ['gpt-5'] },
      displayMode: 'usage',
      updatedAt: 1_700_000_000_000,
      loading: true,
    }));

    const provider = snapshot.providers[0];
    expect(snapshot).toMatchObject({ displayMode: 'usage', updatedAt: 1_700_000_000_000, loading: true });
    expect(provider.windows.map((window) => window.key)).toEqual(['window-0', 'window-1']);
    expect(provider.windows[0]).toMatchObject({
      label: '5-Hour',
      usedPercent: 12.5,
      remainingPercent: 87.5,
      resetLabel: 'in 2 h',
      valueLabel: '13%',
      tone: 'default',
    });
    expect(provider.models).toHaveLength(1);
    expect(provider.models[0]).toMatchObject({ key: 'gpt-5', name: 'gpt-5' });
    expect(provider.models[0].windows[0]).toMatchObject({ key: 'model-0-0', label: 'Weekly', usedPercent: 30 });
  });

  test('formats a value from structured data and never forwards a provider valueLabel', () => {
    const email = 'user@example.com';
    const extAcme: QuotaProviderId = 'ext-acme';
    const snapshot = buildGuestUsageSnapshot(feed({
      providers: [meta('openrouter', 'OpenRouter'), meta(extAcme, 'Acme')],
      results: [
        providerResult({
          providerId: 'openrouter',
          usage: { windows: { monthly: usageWindow({ valueLabel: email, value: { kind: 'spend', spent: 0.01, limit: null } }) } },
        }),
        providerResult({
          providerId: extAcme,
          usage: { windows: { AcmeOrg: usageWindow({ valueLabel: email }) } },
        }),
      ],
    }));

    expect(snapshot.providers[0].windows[0].valueLabel).toBe('quota.value.spent');
    expect(snapshot.providers[1].windows[0]).toMatchObject({ key: 'window-0', label: 'window-0', valueLabel: null });
    const json = JSON.stringify(snapshot);
    expect(json).not.toContain(email);
    expect(json).not.toContain('AcmeOrg');
  });

  test('built-in window labels match Work Status, extension labels stay opaque', () => {
    const extAcme: QuotaProviderId = 'ext-acme';
    const snapshot = buildGuestUsageSnapshot(feed({
      providers: [meta('codex', 'Codex'), meta(extAcme, 'Acme')],
      results: [
        providerResult({
          providerId: 'codex',
          usage: {
            windows: {
              '30d': usageWindow(),
              '1d': usageWindow(),
              '12h': usageWindow(),
              custom: usageWindow(),
            },
          },
        }),
        providerResult({
          providerId: extAcme,
          usage: { windows: { '30d': usageWindow(), AcmeOrg: usageWindow() } },
        }),
      ],
    }));

    expect(snapshot.providers[0].windows.map((window) => window.label)).toEqual([
      '30-Day Limit',
      '1-Day Limit',
      '12-Hour Limit',
      'custom',
    ]);
    expect(snapshot.providers[1].windows.map((window) => window.label)).toEqual([
      '30-Day Limit',
      'window-1',
    ]);
    expect(JSON.stringify(snapshot.providers[1])).not.toContain('AcmeOrg');
  });

  test('built-in valueLabels pass through as Work Status shows them; extension ones do not', () => {
    const extAcme: QuotaProviderId = 'ext-acme';
    const snapshot = buildGuestUsageSnapshot(feed({
      providers: [meta('codex', 'Codex'), meta(extAcme, 'Acme')],
      results: [
        providerResult({
          providerId: 'codex',
          usage: { windows: { credits_balance: usageWindow({ usedPercent: null, remainingPercent: null, valueLabel: '$12.34' }) } },
        }),
        providerResult({
          providerId: extAcme,
          usage: { windows: { credits_balance: usageWindow({ usedPercent: null, remainingPercent: null, valueLabel: 'ops@example.com' }) } },
        }),
      ],
    }));

    expect(snapshot.providers[0].windows[0].valueLabel).toBe('$12.34');
    expect(snapshot.providers[1].windows[0].valueLabel).toBeNull();
    expect(JSON.stringify(snapshot.providers[1])).not.toContain('ops@example.com');
  });

  test('maps the Work Status tone thresholds on the used share', () => {
    const tones = [49.9, 50, 79.9, 80, null].map((used) => buildGuestUsageSnapshot(feed({
      providers: [meta('claude', 'Claude')],
      results: [providerResult({
        providerId: 'claude',
        usage: { windows: { '5h': usageWindow({ usedPercent: used, remainingPercent: used === null ? null : 100 - used }) } },
      })],
    })).providers[0].windows[0].tone);
    expect(tones).toEqual(['default', 'warning', 'warning', 'error', 'default']);
  });

  test('speaks in its own words and never passes provider error text through', () => {
    const expired = 'The key for ops@example.com expired for Example Org';
    const failed = buildGuestUsageSnapshot(feed({
      providers: [meta('codex', 'Codex')],
      results: [providerResult({ providerId: 'codex', ok: false, error: expired, usage: null })],
    }));
    expect(failed.providers[0].status).toBe('header.services.usageUnavailable');
    expect(JSON.stringify(failed)).not.toContain('ops@example.com');

    const stale = buildGuestUsageSnapshot(feed({
      providers: [meta('codex', 'Codex')],
      results: [providerResult({ providerId: 'codex', usage: { windows: { '5h': usageWindow() } } })],
      refreshErrors: { codex: expired },
    }));
    expect(stale.providers[0].status).toBe('header.services.usageRefreshFailed');
    expect(JSON.stringify(stale)).not.toContain('ops@example.com');

    const quiet = buildGuestUsageSnapshot(feed({
      providers: [meta('codex', 'Codex')],
      results: [providerResult({ providerId: 'codex' })],
    }));
    expect(quiet.providers[0].status).toBe('header.services.noRateLimitsReported');
  });

  test('drops accounts, plans, console budgets and gift resets from the JSON', () => {
    const snapshot = buildGuestUsageSnapshot(feed({
      providers: [meta('codex', 'Codex')],
      results: [providerResult({
        providerId: 'codex',
        accountLabel: 'ops@example.com',
        planLabel: 'Team',
        usage: {
          windows: {
            '5h': usageWindow({
              giftReset: { recordId: 7, expireAt: 1_700_000_000_000, grantType: 'GLOBAL' },
            }),
          },
          consoleBudgets: {
            workspace: 'Example Org',
            budgets: [{
              id: 'budget-1',
              limit: 100,
              spent: 40,
              usedPercent: 40,
              reached: false,
              resetsAt: 1_700_000_000_000,
              sharing: 'you',
              perModel: false,
              kind: 'all',
              vendors: [],
              models: [],
              inputPriceAtLeast: null,
            }],
          },
        },
      })],
    }));

    const json = JSON.stringify(snapshot);
    expect(json).not.toContain('ops@example.com');
    expect(json).not.toContain('Example Org');
    expect(json).not.toContain('"Team"');
    expect(json).not.toContain('recordId');
    expect(json).not.toContain('expireAt');
    expect(json).not.toContain('consoleBudgets');
    expect(json).not.toContain('accountLabel');
    expect(json).not.toContain('planLabel');
    expect(guestUsageSnapshotSchema.safeParse(snapshot).success).toBe(true);
  });

  test('stays inside the SDK bounds and drops an unusable icon', () => {
    // SAFETY: an extension quota provider id is `ext-<guest id>`, the shape this test builds.
    const providers = Array.from({ length: 65 }, (_, index) => meta(`ext-provider-${index}` as QuotaProviderId));
    const window = Object.fromEntries(Array.from({ length: 33 }, (_, index) => [`w${index}`, usageWindow()]));
    const models = Object.fromEntries(Array.from({ length: 65 }, (_, index) => [`m${index}`, { windows: { w: usageWindow() } }]));
    const snapshot = buildGuestUsageSnapshot(feed({
      providers,
      results: providers.map((provider) => providerResult({
        providerId: provider.id,
        usage: provider.id === providers[0].id ? { windows: window, models } : { windows: {} },
      })),
      icons: new Map([[providers[0].id, 'data:text/plain,nope']]),
    }));

    expect(snapshot.providers).toHaveLength(64);
    expect(snapshot.providers[0].windows).toHaveLength(32);
    expect(snapshot.providers[0].models).toHaveLength(64);
    expect(snapshot.providers[0].icon).toBeNull();
    expect(guestUsageSnapshotSchema.safeParse(snapshot).success).toBe(true);
  });

  test('carries the provider icon a resolved map names', () => {
    const icon = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3C%2Fsvg%3E';
    const snapshot = buildGuestUsageSnapshot(feed({
      providers: [meta('claude', 'Claude')],
      results: [providerResult({ providerId: 'claude' })],
      icons: new Map([['claude', icon]]),
    }));
    expect(snapshot.providers[0].icon).toBe(icon);
    expect(guestUsageSnapshotSchema.safeParse(snapshot).success).toBe(true);
  });
});
