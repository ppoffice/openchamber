import React from 'react';

import { GUEST_USAGE_ICON_MAX, isGuestPackageSvgIcon, isGuestUsageIcon } from '@openchamber/sdk';

import { iconSpriteData } from '@/components/icon/sprite';
import { resolveProviderLogoUrls } from '@/hooks/useProviderLogo';
import { isGuestIconName } from '@/lib/guests/icon';
import { quotaProviderList, type ExtensionQuotaProvider } from '@/lib/quota/extensionProviders';
import { runtimeFetch } from '@/lib/runtime-fetch';
import { getRuntimeKey } from '@/lib/runtime-switch';
import type { QuotaProviderMeta } from '@/lib/quota';
import { useQuotaStore } from '@/stores/useQuotaStore';

/**
 * The provider icons a `usage` snapshot carries, as `data:image/svg+xml` URLs.
 *
 * A built-in provider resolves exactly as the host's own `ProviderLogo` does
 * (`resolveProviderLogoUrls`): the bundled asset first, then the provider's
 * mark from models.dev, then none. The chosen URL is fetched once and inlined,
 * so the frame draws it without another origin; a failed fetch falls through
 * to the next source, as the host's `<img onError>` does. An extension
 * provider's icon is the one its card draws: a Remixicon from the host sprite,
 * or the package's SVG read with the runtime's credentials.
 *
 * The SVGs are monochrome (`currentColor`, which resolves to black in an image
 * document) on a transparent background; the guest inverts them in dark mode,
 * as `ProviderLogo` does. That contract is in the SDK documentation.
 */

type IconMap = ReadonlyMap<string, string | null>;

/** A `data:image/svg+xml` URL for SVG text, or `null` when it is not an SVG or would exceed the feed bound. */
const svgDataUrl = (svg: string): string | null => {
  if (!/<svg[\s>]/i.test(svg)) return null;
  const url = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  return url.length <= GUEST_USAGE_ICON_MAX && isGuestUsageIcon(url) ? url : null;
};

const spriteIconDataUrl = (name: string): string | null => {
  if (!isGuestIconName(name)) return null;
  const body = iconSpriteData[name];
  return body ? svgDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${body}</svg>`) : null;
};

/** A missing logo is retried later, so an offline start recovers without a reload. */
const NULL_ICON_TTL_MS = 10 * 60 * 1000;

type CachedIcon = { icon: string | null; expiresAt: number | null };
const iconCache = new Map<string, CachedIcon>();
// One request per key, shared by every provider read that wants it.
const iconRequests = new Map<string, Promise<string | null>>();

// A bundled or models.dev logo is the same on every instance, so its key has
// no runtime. An extension package serves a different file per install, so its
// key keeps the runtime identity.
const iconKey = (providerId: string, extension: ExtensionQuotaProvider | undefined): string => (
  extension ? `extension:${getRuntimeKey()}\u0000${providerId}` : `builtin:${providerId}`
);

const readCachedIcon = (key: string): CachedIcon | undefined => {
  const cached = iconCache.get(key);
  if (!cached) return undefined;
  if (cached.expiresAt !== null && cached.expiresAt <= Date.now()) {
    iconCache.delete(key);
    return undefined;
  }
  return cached;
};

const writeCachedIcon = (key: string, icon: string | null): string | null => {
  iconCache.set(key, { icon, expiresAt: icon === null ? Date.now() + NULL_ICON_TTL_MS : null });
  return icon;
};

const startIconRequest = (key: string, load: () => Promise<string | null>): Promise<string | null> => {
  const pending = iconRequests.get(key);
  if (pending) return pending;
  const settled = Promise.resolve().then(load).catch(() => null).then((icon) => writeCachedIcon(key, icon)).finally(() => {
    if (iconRequests.get(key) === settled) iconRequests.delete(key);
  });
  iconRequests.set(key, settled);
  return settled;
};

/** The icon when it needs no request: an extension's sprite icon, or a proven absence. */
const resolveUsageProviderIconSync = (
  providerId: string,
  extension: ExtensionQuotaProvider | undefined,
): string | null => {
  const key = iconKey(providerId, extension);
  const cached = readCachedIcon(key);
  if (cached) return cached.icon;
  if (extension) {
    if (isGuestPackageSvgIcon(extension.icon)) return null;
    return writeCachedIcon(key, spriteIconDataUrl(extension.icon));
  }
  // A provider with no logo at all is a settled answer; one with a URL is still pending.
  const { local, remote } = resolveProviderLogoUrls(providerId);
  return local || remote ? null : writeCachedIcon(key, null);
};

const readSvg = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url, { credentials: 'omit' });
    if (!response.ok) return null;
    return svgDataUrl(await response.text());
  } catch {
    return null;
  }
};

/** Read a logo once: the local asset, then models.dev, then no icon. */
const readBuiltInIcon = async (providerId: string): Promise<string | null> => {
  const { local, remote } = resolveProviderLogoUrls(providerId);
  const localIcon = local ? await readSvg(local) : null;
  if (localIcon) return localIcon;
  const remoteIcon = remote ? await readSvg(remote) : null;
  return remoteIcon;
};

/** Read an extension package's SVG once, with the runtime's own credentials. */
const readPackageIcon = async (extension: ExtensionQuotaProvider): Promise<string | null> => {
  try {
    const response = await runtimeFetch(`/api/guests/${encodeURIComponent(extension.guestId)}/${extension.icon}`);
    if (!response.ok) return null;
    if (response.headers.get('content-type')?.split(';')[0]?.trim() !== 'image/svg+xml') return null;
    return svgDataUrl(await response.text());
  } catch {
    return null;
  }
};

const resolveUsageProviderIcon = async (
  providerId: string,
  extension: ExtensionQuotaProvider | undefined,
): Promise<string | null> => {
  const key = iconKey(providerId, extension);
  const cached = readCachedIcon(key);
  if (cached) return cached.icon;
  if (extension && !isGuestPackageSvgIcon(extension.icon)) {
    return resolveUsageProviderIconSync(providerId, extension);
  }
  return startIconRequest(key, () => (
    extension ? readPackageIcon(extension) : readBuiltInIcon(providerId)
  ));
};

const computeIconMap = (
  providers: readonly QuotaProviderMeta[],
  extensionProviders: readonly ExtensionQuotaProvider[],
): IconMap => {
  const icons = new Map<string, string | null>();
  for (const provider of providers) {
    icons.set(provider.id, resolveUsageProviderIconSync(
      provider.id,
      extensionProviders.find((entry) => entry.id === provider.id),
    ));
  }
  return icons;
};

const sameIconMap = (left: IconMap, right: IconMap): boolean => (
  left.size === right.size && [...left].every(([id, icon]) => right.get(id) === icon)
);

/**
 * Icons for every usage provider on this instance, read only while a frame is
 * subscribed. A sprite icon and a proven absence are in the map on the first
 * enabled render; a fetched logo arrives once its single read settles.
 */
export const useUsageProviderIcons = (enabled: boolean): IconMap => {
  const extensionProviders = useQuotaStore((state) => state.extensionProviders);
  const providers = React.useMemo(() => quotaProviderList(extensionProviders), [extensionProviders]);
  const [icons, setIcons] = React.useState<IconMap>(() => new Map());

  React.useEffect(() => {
    if (!enabled) return;
    setIcons((current) => {
      const next = computeIconMap(providers, extensionProviders);
      return sameIconMap(current, next) ? current : next;
    });
  }, [enabled, extensionProviders, providers]);

  React.useEffect(() => {
    if (!enabled) return undefined;
    const pending = providers.filter((provider) => {
      const extension = extensionProviders.find((entry) => entry.id === provider.id);
      return !readCachedIcon(iconKey(provider.id, extension));
    });
    if (pending.length === 0) return undefined;
    let cancelled = false;
    void Promise.all(pending.map((provider) => resolveUsageProviderIcon(
      provider.id,
      extensionProviders.find((entry) => entry.id === provider.id),
    ))).then(() => {
      if (cancelled) return;
      setIcons((current) => {
        const next = computeIconMap(providers, extensionProviders);
        return sameIconMap(current, next) ? current : next;
      });
    });
    return () => { cancelled = true; };
  }, [enabled, extensionProviders, providers]);

  return icons;
};
