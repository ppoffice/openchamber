import { QUOTA_OPEN_FRESHNESS_MS } from '@/stores/useQuotaStore';

/**
 * The refresh behind `host.refreshUsage`. Overlapping calls share one read,
 * and a call inside `QUOTA_OPEN_FRESHNESS_MS` of the last one answers from the
 * sample already in the store, so a guest cannot loop full upstream reads.
 * A runtime switch starts a new window, because the sample belongs to the
 * instance that just left.
 */
export const createGuestUsageRefresh = (
  fetchAll: () => Promise<boolean | void>,
  identity: () => string = () => '',
  now: () => number = Date.now,
): (() => Promise<void>) => {
  let lastIdentity = identity();
  let lastStartedAt: number | null = null;
  let inFlight: Promise<void> | null = null;

  return () => {
    const currentIdentity = identity();
    if (currentIdentity !== lastIdentity) {
      lastIdentity = currentIdentity;
      lastStartedAt = null;
      inFlight = null;
    }
    if (inFlight) return inFlight;
    const startedAt = now();
    if (lastStartedAt !== null && startedAt - lastStartedAt < QUOTA_OPEN_FRESHNESS_MS) {
      return Promise.resolve();
    }
    lastStartedAt = startedAt;
    const settled = Promise.resolve().then(fetchAll).then(
      () => undefined,
    ).finally(() => {
      if (inFlight === settled) inFlight = null;
    });
    inFlight = settled;
    return settled;
  };
};
