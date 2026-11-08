import React from 'react';
import { GUEST_HEADER_ITEM_HEIGHT, type WidthRequest } from '@openchamber/sdk';

import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useGuestHeaderItems } from '@/hooks/useGuestSurfaces';
import { headerItemFlexStyle } from '@/lib/guests/header-items';
import type { InstalledGuest } from '@/lib/guests/types';
import { pluginModeFromId } from '@/lib/surfaces/modes';
import { cn } from '@/lib/utils';

// PluginPane is already in the main chunk through MainLayout; the boundary
// only lets the header commit its row before the frame renders.
const PluginPane = React.lazy(() => import('./PluginPane').then((module) => ({ default: module.PluginPane })));

/**
 * Last width each header item asked for, for this app session. A full-page
 * surface unmounts the header; returning starts from the width the item had
 * instead of collapsing it to zero and shifting the tabs.
 */
const rememberedWidths = new Map<string, WidthRequest>();

/**
 * One guest's strip in the header. The frame starts at no width, so nothing
 * flashes before the guest reports its own through `setWidth`; from then on
 * the item takes that preferred width and may shrink to the guest's minimum
 * while the session tabs keep their width. The height belongs to the header.
 */
const HeaderExtensionItem: React.FC<{ guest: InstalledGuest }> = ({ guest }) => {
  const [width, setWidth] = React.useState<WidthRequest | null>(() => rememberedWidths.get(guest.id) ?? null);
  const handleWidth = React.useCallback((request: WidthRequest) => {
    rememberedWidths.set(guest.id, request);
    setWidth(request);
  }, [guest.id]);
  const style = React.useMemo(() => headerItemFlexStyle(width), [width]);

  return (
    <div
      data-guest-header-item={guest.id}
      className={cn('flex h-full min-w-0 items-center', width && 'me-2')}
      style={style}
    >
      <div className="app-region-no-drag w-full overflow-hidden" style={{ height: GUEST_HEADER_ITEM_HEIGHT }}>
        <ErrorBoundary fallback={null}>
          <React.Suspense fallback={null}>
            <PluginPane
              mode={pluginModeFromId(guest.id)}
              surface="header"
              item={null}
              onWidth={handleWidth}
            />
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

/**
 * Every active guest's header strip, in catalog order. Each item is its own
 * flex child of the header's inner row, placed left of the context ring, so
 * the tabs and the strips bargain over width directly and the tabs win (see
 * `headerItemFlexStyle`).
 */
export const HeaderExtensionItems: React.FC = () => {
  const guests = useGuestHeaderItems();
  if (guests.length === 0) return null;
  return <>{guests.map((guest) => <HeaderExtensionItem key={guest.id} guest={guest} />)}</>;
};
