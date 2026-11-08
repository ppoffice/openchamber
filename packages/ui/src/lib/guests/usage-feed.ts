import {
  GUEST_USAGE_ID_MAX,
  GUEST_USAGE_LABEL_MAX,
  GUEST_USAGE_MODELS_MAX,
  GUEST_USAGE_PROVIDERS_MAX,
  GUEST_USAGE_STATUS_MAX,
  GUEST_USAGE_WINDOWS_MAX,
  isGuestUsageIcon,
  type GuestUsageDisplayMode,
  type GuestUsageModel,
  type GuestUsageProvider,
  type GuestUsageSnapshot,
  type GuestUsageTone,
  type GuestUsageWindow,
} from '@openchamber/sdk';

import { formatQuotaResetLabel, formatQuotaWindowValueLabel, formatWindowLabel, resolveUsageTone } from '@/lib/quota';
import { getDisplayModelName } from '@/lib/quota/model-families';
import type { I18nKey, I18nParams } from '@/lib/i18n';
import type { QuotaProviderMeta } from '@/lib/quota';
import type { TimeFormatPreference } from '@/stores/useUIStore';
import type { ProviderResult, QuotaProviderId, UsageWindow } from '@/types';

type Translate = (key: I18nKey, params?: I18nParams) => string;

export type UsageFeedInput = {
  /** The store's samples, one per provider it has read. */
  results: readonly ProviderResult[];
  /** Per-provider refresh failures; a first-load failure names a provider the store has no sample for. */
  refreshErrors: Partial<Record<QuotaProviderId, string>>;
  /** Every usage provider on this instance, built-ins then extensions, in the server's order. */
  providers: readonly QuotaProviderMeta[];
  /** The providers the user shows in Work Status; every configured provider is still sent, marked `shown`. */
  dropdownProviderIds: readonly QuotaProviderId[];
  selectedModels: Readonly<Record<string, readonly string[]>>;
  displayMode: GuestUsageDisplayMode;
  timeFormatPreference: TimeFormatPreference;
  translate: Translate;
  /** `data:image/svg+xml` icon per provider id, or `null` where the host has none. */
  icons: ReadonlyMap<string, string | null>;
  /** The store's last successful refresh, or `null` before the first one. */
  updatedAt: number | null;
  loading: boolean;
};

const cut = (value: string, maximum: number): string => value.slice(0, maximum);

/** A name the schema accepts; a provider name is never empty, but a model display name could be. */
const nonEmpty = (value: string, fallback: string): string => (value.length > 0 ? value : fallback);

const percent = (value: number | null): number | null => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return Math.max(0, Math.min(100, value));
};

/**
 * The Work Status tone for a window, from the used share, through the same
 * `resolveUsageTone` thresholds that panel uses.
 */
const toneOf = (window: UsageWindow): GuestUsageTone => {
  const tone = resolveUsageTone(percent(window.usedPercent));
  if (tone === 'critical') return 'error';
  if (tone === 'warn') return 'warning';
  return 'default';
};

const projectWindow = (
  key: string,
  label: string,
  window: UsageWindow,
  input: UsageFeedInput,
): GuestUsageWindow => {
  const usedPercent = percent(window.usedPercent);
  const remainingPercent = percent(window.remainingPercent);
  const displayPercent = input.displayMode === 'remaining' ? remainingPercent : usedPercent;
  // Only a string the host made from structured data crosses. A provider's or
  // extension's own `valueLabel` is free text and can carry an account name.
  const valueLabel = window.value !== undefined || window.creditsUsed !== undefined
    ? formatQuotaWindowValueLabel(window, displayPercent, input.translate)
    : null;
  const resetLabel = formatQuotaResetLabel(
    window.resetAt,
    window.resetAfterFormatted ?? window.resetAtFormatted,
    input.timeFormatPreference,
  );
  return {
    key: cut(key, GUEST_USAGE_ID_MAX),
    label: cut(nonEmpty(label, key), GUEST_USAGE_LABEL_MAX),
    usedPercent,
    remainingPercent,
    resetAt: typeof window.resetAt === 'number' && Number.isSafeInteger(window.resetAt) ? window.resetAt : null,
    resetLabel: resetLabel.length > 0 ? cut(resetLabel, GUEST_USAGE_LABEL_MAX) : null,
    valueLabel: valueLabel === null || valueLabel === '-' ? null : cut(valueLabel, GUEST_USAGE_LABEL_MAX),
    tone: toneOf(window),
  };
};

/** Provider windows in the server's order, then one row per selected model with its first window. */
const projectProvider = (
  provider: QuotaProviderMeta,
  result: ProviderResult | undefined,
  input: UsageFeedInput,
): GuestUsageProvider => {
  const windows: GuestUsageWindow[] = [];
  for (const [label, window] of Object.entries(result?.usage?.windows ?? {})) {
    if (windows.length >= GUEST_USAGE_WINDOWS_MAX) break;
    const key = `window-${windows.length}`;
    const formatted = formatWindowLabel(label);
    // A label the host does not know is provider free text. The opaque key is
    // the whole of what crosses for it.
    windows.push(projectWindow(key, formatted === label ? key : formatted, window, input));
  }

  const models: GuestUsageModel[] = [];
  const modelEntries = Object.entries(result?.usage?.models ?? {});
  const selected = input.selectedModels[provider.id] ?? [];
  const visibleModels = selected.length > 0
    ? modelEntries.filter(([modelName]) => selected.includes(modelName))
    : modelEntries;
  for (const [modelName, modelUsage] of visibleModels) {
    if (models.length >= GUEST_USAGE_MODELS_MAX) break;
    const entries = Object.entries(modelUsage.windows ?? {});
    if (entries.length === 0) continue;
    const [label, window] = entries[0];
    const name = nonEmpty(getDisplayModelName(modelName), modelName);
    const key = `model-${models.length}-0`;
    const formatted = formatWindowLabel(label);
    models.push({
      key: cut(modelName, GUEST_USAGE_ID_MAX),
      name: cut(name, GUEST_USAGE_LABEL_MAX),
      windows: [projectWindow(key, formatted === label ? key : formatted, window, input)],
    });
  }

  // The provider's own words never cross: an error string can carry an
  // account email or organization name. The host says what happened in its
  // own translated words instead.
  const refreshError = input.refreshErrors[provider.id];
  let status: string | null = null;
  if (refreshError) {
    status = result?.usage
      ? input.translate('header.services.usageRefreshFailed')
      : input.translate('header.services.usageUnavailable');
  } else if (!result?.ok && result?.error) {
    status = input.translate('header.services.usageUnavailable');
  } else if (windows.length === 0 && models.length === 0) {
    status = input.translate('header.services.noRateLimitsReported');
  }

  const icon = input.icons.get(provider.id) ?? null;
  return {
    id: cut(provider.id, GUEST_USAGE_ID_MAX),
    name: cut(nonEmpty(provider.name, provider.id), GUEST_USAGE_LABEL_MAX),
    icon: icon !== null && isGuestUsageIcon(icon) ? icon : null,
    ok: result?.ok === true,
    configured: result?.configured === true,
    status: status !== null ? cut(status, GUEST_USAGE_STATUS_MAX) : null,
    shown: input.dropdownProviderIds.includes(provider.id),
    windows,
    models,
  };
};

/**
 * The `usage` feed a granted extension frame receives: every configured
 * provider (or one whose first read failed), in the app's provider order,
 * with the windows and model rows Work Status draws. Account labels, plan
 * labels, console budgets and gift-reset ids stay behind, the same cut
 * `usage.read` makes.
 */
export const buildGuestUsageSnapshot = (input: UsageFeedInput): GuestUsageSnapshot => {
  const resultsByProvider = new Map(input.results.map((result) => [result.providerId, result]));
  const providers: GuestUsageProvider[] = [];
  for (const provider of input.providers) {
    if (providers.length >= GUEST_USAGE_PROVIDERS_MAX) break;
    const result = resultsByProvider.get(provider.id);
    // A confirmed absence is not part of the feed; an unknown configuration
    // whose first read failed still is, as Work Status shows it.
    if (result?.configured !== true && (result || !input.refreshErrors[provider.id])) continue;
    providers.push(projectProvider(provider, result, input));
  }
  return {
    displayMode: input.displayMode,
    updatedAt: typeof input.updatedAt === 'number' && Number.isSafeInteger(input.updatedAt) && input.updatedAt >= 0
      ? input.updatedAt
      : null,
    loading: input.loading,
    providers,
  };
};
