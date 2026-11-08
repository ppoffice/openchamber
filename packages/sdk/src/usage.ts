// The provider usage feed a granted extension reads with `host.onUsage`
// (capability `usage`). The host pushes one `GuestUsageSnapshot` per change;
// this file holds the types, the bounds and a zod-free reader, so a guest
// bundle keeps no schema library. The host's zod parse is `usage-schemas.ts`.
//
// The snapshot carries only what a readout draws. Account and plan names,
// console budgets, gift-reset ids and every credential stay on the host: the
// `usage.read` control tool makes the same cut.

/** Providers in one snapshot. */
export const GUEST_USAGE_PROVIDERS_MAX = 64;
/** Windows on one provider or model. */
export const GUEST_USAGE_WINDOWS_MAX = 32;
/** Models on one provider. */
export const GUEST_USAGE_MODELS_MAX = 64;
/** Characters of a provider id or a window/model key. */
export const GUEST_USAGE_ID_MAX = 80;
/** Characters of a provider, window or model label. */
export const GUEST_USAGE_LABEL_MAX = 120;
/** Characters of a provider status line. */
export const GUEST_USAGE_STATUS_MAX = 500;
/** Bytes of a provider icon's `data:` URL. */
export const GUEST_USAGE_ICON_MAX = 64 * 1024;

export const GUEST_USAGE_DISPLAY_MODES = ['usage', 'remaining'] as const;
export type GuestUsageDisplayMode = (typeof GUEST_USAGE_DISPLAY_MODES)[number];

export const GUEST_USAGE_TONES = ['default', 'warning', 'error'] as const;
/** A window's colour; the host maps `usedPercent` 50 to `warning` and 80 to `error`, as Work Status does. */
export type GuestUsageTone = (typeof GUEST_USAGE_TONES)[number];

/** One limit window of a provider or model. Percentages are 0 to 100. */
export type GuestUsageWindow = {
  key: string;
  label: string;
  usedPercent: number | null;
  remainingPercent: number | null;
  /** Epoch milliseconds, or `null` when the provider reports no reset time. */
  resetAt: number | null;
  /** The host's formatted reset text, ready to draw. */
  resetLabel: string | null;
  /** What the provider counts, such as spend or requests, ready to draw. */
  valueLabel: string | null;
  tone: GuestUsageTone;
};

/** A model with its own windows, as a provider reports them. */
export type GuestUsageModel = {
  key: string;
  name: string;
  windows: GuestUsageWindow[];
};

export type GuestUsageProvider = {
  id: string;
  name: string;
  /** A `data:image/svg+xml` or `data:image/png` URL, at most `GUEST_USAGE_ICON_MAX` bytes. */
  icon: string | null;
  /** The last read succeeded. */
  ok: boolean;
  /** The user configured credentials for this provider. */
  configured: boolean;
  /** A provider-level message: a fetch error or "nothing reported". */
  status: string | null;
  /** The provider is in the user's Work Status list, in its order. */
  shown: boolean;
  windows: GuestUsageWindow[];
  models: GuestUsageModel[];
};

export type GuestUsageSnapshot = {
  displayMode: GuestUsageDisplayMode;
  /** Epoch milliseconds of the last successful refresh, or `null` before the first one. */
  updatedAt: number | null;
  loading: boolean;
  providers: GuestUsageProvider[];
};

const USAGE_ICON_PREFIX = /^data:image\/(?:svg\+xml|png)(?:;[^,]*)?,/;

/** Whether a value is a bounded `data:` SVG or PNG image URL. */
export const isGuestUsageIcon = (value: string): boolean => (
  String(value) === value
  && value.length > 0
  && value.length <= GUEST_USAGE_ICON_MAX
  && !value.includes('\0')
  && USAGE_ICON_PREFIX.test(value)
);

// The fields the reader touches, typed as the wire carries them. Validators
// take one of these values; each caller checks the object before casting.
type UsageWindowWire = {
  key?: unknown;
  label?: unknown;
  usedPercent?: unknown;
  remainingPercent?: unknown;
  resetAt?: unknown;
  resetLabel?: unknown;
  valueLabel?: unknown;
  tone?: unknown;
};
type UsageModelWire = { key?: unknown; name?: unknown; windows?: unknown };
type UsageProviderWire = {
  id?: unknown;
  name?: unknown;
  icon?: unknown;
  ok?: unknown;
  configured?: unknown;
  status?: unknown;
  shown?: unknown;
  windows?: unknown;
  models?: unknown;
};
type UsageSnapshotWire = { displayMode?: unknown; updatedAt?: unknown; loading?: unknown; providers?: unknown };

type UsageWireValue = UsageSnapshotWire[keyof UsageSnapshotWire];

const USAGE_TONES: ReadonlySet<string> = new Set(GUEST_USAGE_TONES);

const isText = (value: UsageWireValue, maximum: number, minimum = 1): value is string => {
  const text = String(value);
  if (text !== value) return false;
  return text.length >= minimum && text.length <= maximum && !text.includes('\0');
};

const isNullableText = (value: UsageWireValue, maximum: number): value is string | null => (
  value === null || isText(value, maximum, 0)
);

const isPercent = (value: UsageWireValue): value is number | null => {
  if (value === null) return true;
  const amount = Number(value);
  return amount === value && Number.isFinite(amount) && amount >= 0 && amount <= 100;
};

const isTimestamp = (value: UsageWireValue): value is number | null => {
  if (value === null) return true;
  const time = Number(value);
  return time === value && Number.isInteger(time) && time >= 0;
};

const isTone = (value: UsageWireValue): value is GuestUsageTone => {
  const tone = String(value);
  return tone === value && USAGE_TONES.has(tone);
};

const readWindows = (value: UsageWireValue): GuestUsageWindow[] | null => {
  if (!Array.isArray(value) || value.length > GUEST_USAGE_WINDOWS_MAX) return null;
  const windows: GuestUsageWindow[] = [];
  for (const item of value) {
    if (Object(item) !== item || item === null) return null;
    // SAFETY: a non-null object; readWindow checks every field it reads.
    const window = readWindow(item as UsageWindowWire);
    if (!window) return null;
    windows.push(window);
  }
  return windows;
};

const readWindow = (wire: UsageWindowWire): GuestUsageWindow | null => {
  const { key, label, usedPercent, remainingPercent, resetAt, resetLabel, valueLabel, tone } = wire;
  if (!isText(key, GUEST_USAGE_ID_MAX) || !isText(label, GUEST_USAGE_LABEL_MAX)) return null;
  if (!isPercent(usedPercent) || !isPercent(remainingPercent) || !isTimestamp(resetAt)) return null;
  if (!isNullableText(resetLabel, GUEST_USAGE_LABEL_MAX) || !isNullableText(valueLabel, GUEST_USAGE_LABEL_MAX)) return null;
  if (!isTone(tone)) return null;
  return { key, label, usedPercent, remainingPercent, resetAt, resetLabel, valueLabel, tone };
};

const readModels = (value: UsageWireValue): GuestUsageModel[] | null => {
  if (!Array.isArray(value) || value.length > GUEST_USAGE_MODELS_MAX) return null;
  const models: GuestUsageModel[] = [];
  for (const item of value) {
    if (Object(item) !== item || item === null) return null;
    // SAFETY: a non-null object; readModel checks every field it reads.
    const model = readModel(item as UsageModelWire);
    if (!model) return null;
    models.push(model);
  }
  return models;
};

const readModel = (wire: UsageModelWire): GuestUsageModel | null => {
  if (!isText(wire.key, GUEST_USAGE_ID_MAX) || !isText(wire.name, GUEST_USAGE_LABEL_MAX)) return null;
  const windows = readWindows(wire.windows);
  if (!windows) return null;
  return { key: wire.key, name: wire.name, windows };
};

const readProvider = (wire: UsageProviderWire): GuestUsageProvider | null => {
  const { id, name, icon, ok, configured, status, shown } = wire;
  if (!isText(id, GUEST_USAGE_ID_MAX) || !isText(name, GUEST_USAGE_LABEL_MAX)) return null;
  if (!(icon === null || (String(icon) === icon && isGuestUsageIcon(String(icon))))) return null;
  if (ok !== true && ok !== false) return null;
  if (configured !== true && configured !== false) return null;
  if (shown !== true && shown !== false) return null;
  if (!isNullableText(status, GUEST_USAGE_STATUS_MAX)) return null;
  const windows = readWindows(wire.windows);
  if (!windows) return null;
  const models = readModels(wire.models);
  if (!models) return null;
  return { id, name, icon, ok, configured, status, shown, windows, models };
};

/**
 * The guest's read of a host `usage` push. The sender is the verified parent
 * frame, so this checks the shape and the bounds rather than re-parsing JSON;
 * a snapshot that does not pass is dropped whole.
 */
export const readGuestUsageSnapshot = (value: UsageSnapshotWire | null | undefined): GuestUsageSnapshot | null => {
  if (Object(value) !== value || value === null || value === undefined) return null;
  const wire = value;
  const { displayMode, updatedAt, loading, providers } = wire;
  if (displayMode !== 'usage' && displayMode !== 'remaining') return null;
  if (!isTimestamp(updatedAt) || (loading !== true && loading !== false)) return null;
  if (!Array.isArray(providers) || providers.length > GUEST_USAGE_PROVIDERS_MAX) return null;
  const parsed: GuestUsageProvider[] = [];
  for (const item of providers) {
    if (Object(item) !== item || item === null) return null;
    // SAFETY: a non-null object; readProvider checks every field it reads.
    const provider = readProvider(item as UsageProviderWire);
    if (!provider) return null;
    parsed.push(provider);
  }
  return { displayMode, updatedAt, loading, providers: parsed };
};
