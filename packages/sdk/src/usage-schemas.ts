import { z } from 'zod';

import {
  GUEST_USAGE_DISPLAY_MODES,
  GUEST_USAGE_ICON_MAX,
  GUEST_USAGE_ID_MAX,
  GUEST_USAGE_LABEL_MAX,
  GUEST_USAGE_MODELS_MAX,
  GUEST_USAGE_PROVIDERS_MAX,
  GUEST_USAGE_STATUS_MAX,
  GUEST_USAGE_TONES,
  GUEST_USAGE_WINDOWS_MAX,
  isGuestUsageIcon,
  type GuestUsageSnapshot,
} from './usage.ts';

const idSchema = z.string().min(1).max(GUEST_USAGE_ID_MAX);
const labelSchema = z.string().min(1).max(GUEST_USAGE_LABEL_MAX);
const percentSchema = z.number().finite().min(0).max(100);
const timestampSchema = z.number().int().nonnegative();

const windowSchema = z.object({
  key: idSchema,
  label: labelSchema,
  usedPercent: percentSchema.nullable(),
  remainingPercent: percentSchema.nullable(),
  resetAt: timestampSchema.nullable(),
  resetLabel: z.string().max(GUEST_USAGE_LABEL_MAX).nullable(),
  valueLabel: z.string().max(GUEST_USAGE_LABEL_MAX).nullable(),
  tone: z.enum(GUEST_USAGE_TONES),
}).strict();

const modelSchema = z.object({
  key: idSchema,
  name: labelSchema,
  windows: z.array(windowSchema).max(GUEST_USAGE_WINDOWS_MAX),
}).strict();

const providerSchema = z.object({
  id: idSchema,
  name: labelSchema,
  icon: z.string().max(GUEST_USAGE_ICON_MAX).refine(isGuestUsageIcon).nullable(),
  ok: z.boolean(),
  configured: z.boolean(),
  status: z.string().max(GUEST_USAGE_STATUS_MAX).nullable(),
  shown: z.boolean(),
  windows: z.array(windowSchema).max(GUEST_USAGE_WINDOWS_MAX),
  models: z.array(modelSchema).max(GUEST_USAGE_MODELS_MAX),
}).strict();

/** The host's parse of a `usage` push. A snapshot that does not parse is dropped whole. */
export const guestUsageSnapshotSchema = z.object({
  displayMode: z.enum(GUEST_USAGE_DISPLAY_MODES),
  updatedAt: timestampSchema.nullable(),
  loading: z.boolean(),
  providers: z.array(providerSchema).max(GUEST_USAGE_PROVIDERS_MAX),
}).strict();

// The hand-written contract and the schema describe the same snapshot; either
// drifting from the other fails this file's type-check.
type ParsedUsageSnapshot = z.infer<typeof guestUsageSnapshotSchema>;
const assertUsageParsed: (value: ParsedUsageSnapshot) => GuestUsageSnapshot = (value) => value;
const assertUsageContract: (value: GuestUsageSnapshot) => ParsedUsageSnapshot = (value) => value;
void assertUsageParsed; void assertUsageContract;
