import { describe, expect, test } from 'bun:test';

import { QUOTA_OPEN_FRESHNESS_MS } from '@/stores/useQuotaStore';

import { createGuestUsageRefresh } from './usage-refresh.ts';

describe('createGuestUsageRefresh', () => {
  test('shares one upstream read and answers inside the freshness window without fetching', async () => {
    let now = 0;
    let calls = 0;
    const resolvers: Array<() => void> = [];
    const refresh = createGuestUsageRefresh(
      () => {
        calls += 1;
        return new Promise<void>((resolve) => { resolvers.push(resolve); });
      },
      () => 'runtime-a',
      () => now,
    );

    const first = refresh();
    const second = refresh();
    await Promise.resolve();
    expect(calls).toBe(1);
    expect(second).toBe(first);
    resolvers[0]();
    await first;

    now = 1_000;
    await refresh();
    expect(calls).toBe(1);

    now = QUOTA_OPEN_FRESHNESS_MS + 1_000;
    const third = refresh();
    await Promise.resolve();
    expect(calls).toBe(2);
    resolvers[1]();
    await third;
  });

  test('a runtime switch starts a new window', async () => {
    let now = 0;
    let calls = 0;
    let runtime = 'runtime-a';
    const refresh = createGuestUsageRefresh(
      async () => { calls += 1; },
      () => runtime,
      () => now,
    );

    await refresh();
    now = 1_000;
    await refresh();
    expect(calls).toBe(1);

    runtime = 'runtime-b';
    await refresh();
    expect(calls).toBe(2);
  });

  test('a failed read still opens the window for the next caller', async () => {
    let now = 0;
    let calls = 0;
    const refresh = createGuestUsageRefresh(
      async () => {
        calls += 1;
        if (calls === 1) throw new Error('upstream failed');
      },
      () => 'runtime-a',
      () => now,
    );

    await expect(refresh()).rejects.toThrow('upstream failed');
    now = 1_000;
    await refresh();
    expect(calls).toBe(1);
  });
});
