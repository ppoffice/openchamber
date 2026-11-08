import React from 'react';
import { GUEST_HEADER_ITEM_HEIGHT, type WidthRequest } from '@openchamber/sdk';

import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useGuestHeaderItems } from '@/hooks/useGuestSurfaces';
import { headerItemFlexStyle } from '@/lib/guests/header-items';
import type { InstalledGuest } from '@/lib/guests/types';
import { pluginModeFromId } from '@/lib/surfaces/modes';
import { cn } from '@/lib/utils';

// Most headers carry no extension strip; only a package that ships one pays for the pane's code.
const PluginPane = React.lazy(() => import('./PluginPane').then((module) => ({ default: module.PluginPane })));

/**
 * One guest's strip in the header. The frame starts at no width, so nothing
 * flashes before the guest reports its own through `setWidth`; from then on
 * the item takes that preferred width and may shrink to the guest's minimum
 * while the session tabs keep their width. The height belongs to the header.
 */
const HeaderExtensionItem: React.FC<{ guest: InstalledGuest }> = ({ guest }) => {
  const [width, setWidth] = React.useState<WidthRequest | null>(null);
  const handleWidth = React.useCallback((request: WidthRequest) => setWidth(request), []);
  const style = React.useMemo(() => headerItemFlexStyle(width), [width]);

  return (
    <div
      data-guest-header-item={guest.id}
      // The header row is a window drag area; the strip takes the pointer.
      className={cn('app-region-no-drag flex h-full min-w-0 items-center', width && 'me-2')}
      style={style}
    >
      <div className="w-full overflow-hidden" style={{ height: GUEST_HEADER_ITEM_HEIGHT }}>
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
