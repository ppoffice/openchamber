import { clampHeaderItemWidth, type WidthRequest } from '@openchamber/sdk';

/**
 * A header item gives way to the session tabs. It shrinks this much faster
 * than the tabs row, so the tabs keep their width until the item reaches the
 * minimum its guest named; only then does the tabs row shrink and scroll.
 * Without the larger factor both shrink together, proportional to their base
 * sizes, and a header strip steals width from the tabs from the first pixel
 * that goes missing.
 */
export const HEADER_ITEM_FLEX_SHRINK = 1000;

type GuestHeaderItemSize = { preferred: number; min: number };

/**
 * The width a guest asked for, inside the SDK range, with `min` never above
 * `preferred`. `null` before the first request, when the item holds no width.
 */
export const readHeaderItemSize = (request: WidthRequest | null): GuestHeaderItemSize | null => {
  if (!request) return null;
  const preferred = clampHeaderItemWidth(request.preferred);
  return { preferred, min: Math.min(preferred, clampHeaderItemWidth(request.min)) };
};

type HeaderItemFlexStyle = {
  flexGrow: number;
  flexShrink: number;
  flexBasis: string;
  minWidth: string;
};

/**
 * The flex child a header item occupies: nothing until the guest asks, then
 * its preferred width as the basis, shrinking down to its minimum.
 */
export const headerItemFlexStyle = (request: WidthRequest | null): HeaderItemFlexStyle => {
  const size = readHeaderItemSize(request);
  if (!size) return { flexGrow: 0, flexShrink: 0, flexBasis: '0px', minWidth: '0px' };
  return {
    flexGrow: 0,
    flexShrink: HEADER_ITEM_FLEX_SHRINK,
    flexBasis: `${size.preferred}px`,
    minWidth: `${size.min}px`,
  };
};
