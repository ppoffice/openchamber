import { describe, expect, test } from 'bun:test';

import { GUEST_HEADER_ITEM_WIDTH_MAX, GUEST_HEADER_ITEM_WIDTH_MIN } from '@openchamber/sdk';

import { HEADER_ITEM_FLEX_SHRINK, headerItemFlexStyle, readHeaderItemSize } from './header-items.ts';

describe('header item sizing', () => {
  test('holds no width before the guest asks for one', () => {
    expect(readHeaderItemSize(null)).toBeNull();
    expect(headerItemFlexStyle(null)).toEqual({ flexGrow: 0, flexShrink: 0, flexBasis: '0px', minWidth: '0px' });
  });

  test('takes the preferred width as the basis and the minimum as the floor', () => {
    expect(readHeaderItemSize({ preferred: 168, min: 72 })).toEqual({ preferred: 168, min: 72 });
    expect(headerItemFlexStyle({ preferred: 168, min: 72 })).toEqual({
      flexGrow: 0,
      flexShrink: HEADER_ITEM_FLEX_SHRINK,
      flexBasis: '168px',
      minWidth: '72px',
    });
  });

  test('clamps both numbers to the SDK range and keeps the minimum at or below the preferred width', () => {
    expect(readHeaderItemSize({ preferred: 5000, min: 2 })).toEqual({
      preferred: GUEST_HEADER_ITEM_WIDTH_MAX,
      min: GUEST_HEADER_ITEM_WIDTH_MIN,
    });
    // A raw frame message can carry min above preferred; the schema refuses it,
    // and the sizing stays sane if one ever reaches here.
    expect(readHeaderItemSize({ preferred: 40, min: 300 })).toEqual({ preferred: 40, min: 40 });
  });
});
