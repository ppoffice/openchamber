import { formatMessage, useI18nStore } from '@/lib/i18n/store';
import { formatDateTimeForPreference, formatTimeForPreference } from '@/lib/timeFormat';
import type { TimeFormatPreference } from '@/stores/useUIStore';
import { getCurrentIntlLocale, type I18nKey, type I18nParams } from '@/lib/i18n';
import type { UsageWindow } from '@/types/quota';

const t = (key: Parameters<typeof formatMessage>[1], params?: I18nParams) => formatMessage(useI18nStore.getState().dictionary, key, params);

export const clampPercent = (value: number | null): number | null => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }
  return Math.max(0, Math.min(100, Math.round(value)));
};

export const formatPercent = (value: number | null): string => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return '-';
  }
  return `${Math.round(value)}%`;
};

export const formatQuotaValueLabel = (
  window: Pick<UsageWindow, 'valueLabel' | 'creditsUsed'>,
  percent: number | null,
  translate: (key: I18nKey, params?: I18nParams) => string,
): string => {
  if (window.creditsUsed !== undefined) {
    const rounded = Math.round(window.creditsUsed * 10) / 10;
    const credits = rounded.toLocaleString('en-US', { maximumFractionDigits: 1 });
    return translate('quota.value.creditsUsed', { credits });
  }
  return window.valueLabel ?? formatPercent(percent);
};

export const formatQuotaWindowValueLabel = (
  window: UsageWindow,
  percent: number | null,
  translate: (key: I18nKey, params?: I18nParams) => string,
): string => {
  const value = window.value;
  if (!value) return formatQuotaValueLabel(window, percent, translate);
  if (value.kind === 'requests') {
    return translate('quota.value.requests', { count: new Intl.NumberFormat(getCurrentIntlLocale()).format(value.count) });
  }
  const money = new Intl.NumberFormat(getCurrentIntlLocale(), { style: 'currency', currency: 'USD' });
  const spent = money.format(value.spent);
  return value.limit === null
    ? translate('quota.value.spent', { spent })
    : translate('settings.usage.consoleBudgets.spentOf', { spent, limit: money.format(value.limit) });
};

export const formatQuotaResetLabel = (
  resetAt: number | null,
  fallback?: string | null,
  timeFormatPreference: TimeFormatPreference = 'auto',
): string => {
  if (!resetAt) {
    return fallback ?? '';
  }

  try {
    const resetDate = new Date(resetAt);
    if (!Number.isFinite(resetDate.getTime())) {
      return fallback ?? '';
    }

    const now = new Date();
    const isToday = resetDate.toDateString() === now.toDateString();

    if (isToday) {
      return formatTimeForPreference(resetDate, timeFormatPreference, { fallback: fallback ?? '' });
    }

    return formatDateTimeForPreference(resetDate, timeFormatPreference, {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return fallback ?? '';
  }
};

export const resolveUsageTone = (percent: number | null): 'safe' | 'warn' | 'critical' => {
  if (percent === null) {
    return 'safe';
  }
  if (percent >= 80) {
    return 'critical';
  }
  if (percent >= 50) {
    return 'warn';
  }
  return 'safe';
};

const WINDOW_LABEL_KEYS = new Map<string, I18nKey>([
  ['5h', 'quota.window.5h'],
  ['7d', 'quota.window.7d'],
  ['extra_usage', 'quota.window.extraUsage'],
  ['weekly', 'quota.window.weekly'],
  ['daily', 'quota.window.daily'],
  ['monthly', 'quota.window.monthly'],
  ['credits', 'quota.window.credits'],
  ['key_limit', 'quota.window.keyLimit'],
  ['credits_balance', 'quota.window.creditsBalance'],
  ['monthly_credits', 'quota.window.monthlyCredits'],
  ['purchased_credits', 'quota.window.purchasedCredits'],
  ['free_credits', 'quota.window.freeCredits'],
  ['billing_cycle', 'quota.window.billingCycle'],
  ['plan_limit', 'quota.window.planLimit'],
  ['auto', 'quota.window.auto'],
  ['api', 'quota.window.api'],
  ['on_demand', 'quota.window.onDemand'],
  ['session', 'quota.window.session'],
  ['premium', 'quota.window.premium'],
  ['chat', 'quota.window.chat'],
  ['completions', 'quota.window.completions'],
  ['premium_interactions', 'quota.window.premiumInteractions'],
]);

// Providers build window keys from numbers, such as `30d` or `12h`; Work
// Status translates them like its fixed keys.
const DURATION_WINDOW = /^(\d+)([dhs])$/;

/** A window key the host has a translated label for, fixed or numeric. */
export const isKnownWindowLabel = (label: string): boolean => (
  WINDOW_LABEL_KEYS.has(label) || DURATION_WINDOW.test(label)
);

export const formatWindowLabel = (label: string): string => {
  const key = WINDOW_LABEL_KEYS.get(label);
  if (key) return t(key);
  const match = DURATION_WINDOW.exec(label);
  if (match) {
    const count = Number(match[1]);
    if (match[2] === 'd') return t('quota.window.days', { count });
    if (match[2] === 'h') return t('quota.window.hours', { count });
    return t('quota.window.seconds', { count });
  }
  return label;
};
