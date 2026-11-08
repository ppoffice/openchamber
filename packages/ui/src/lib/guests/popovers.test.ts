import { describe, expect, test } from 'bun:test';

import { GuestPopoverController, guestPopoverSide, positionGuestPopover } from './popovers.ts';

describe('positionGuestPopover', () => {
  test('translates an anchor through a scaled iframe and keeps the panel inside the viewport', () => {
    const positioned = positionGuestPopover({
      anchor: { x: 20, y: 40, width: 100, height: 30 },
      frame: { left: 100, top: 50, width: 400, height: 200, clientWidth: 200, clientHeight: 100 },
      viewport: { width: 500, height: 300 },
      width: 240,
      height: 120,
      side: 'left',
    });

    expect(positioned).toEqual({ left: 8, top: 100, width: 240, height: 120, side: 'left' });
  });

  test('flips a left popover when the viewport gutter leaves no room', () => {
    const positioned = positionGuestPopover({
      anchor: { x: 10, y: 10, width: 20, height: 20 },
      frame: { left: 10, top: 10, width: 100, height: 100, clientWidth: 100, clientHeight: 100 },
      viewport: { width: 400, height: 200 },
      width: 160,
      height: 80,
      side: 'left',
    });

    expect(positioned).toEqual({ left: 46, top: 8, width: 160, height: 80, side: 'right' });
  });

  test('rejects an anchor wholly outside the visible owner frame', () => {
    expect(positionGuestPopover({
      anchor: { x: 120, y: 10, width: 20, height: 20 },
      frame: { left: 10, top: 10, width: 100, height: 100, clientWidth: 100, clientHeight: 100 },
      viewport: { width: 400, height: 200 },
      width: 160,
      height: 80,
      side: 'left',
    })).toBeNull();
  });

  test('hangs a header popover below its 28px strip and clear of the tabs row', () => {
    const frame = { left: 100, top: 10, width: 152, height: 28, clientWidth: 152, clientHeight: 28 };
    const positioned = positionGuestPopover({
      anchor: { x: 0, y: 0, width: 152, height: 28 },
      frame,
      viewport: { width: 1400, height: 900 },
      width: 260,
      height: 190,
      side: guestPopoverSide(undefined, 'header'),
    });

    expect(positioned).toMatchObject({ side: 'bottom', top: 44 });
    if (!positioned) throw new Error('Header popover was not positioned');
    // The item ends at 38; the card starts below it, over the header's last 4 px.
    expect(positioned.top).toBeGreaterThan(frame.top + frame.height);
    expect(guestPopoverSide('top', 'header')).toBe('top');
    expect(guestPopoverSide(undefined, 'status')).toBeUndefined();
  });
});

describe('GuestPopoverController', () => {
  test('replaces the previous owner and ignores a delayed retirement from it', () => {
    const controller = new GuestPopoverController();
    const closed: string[] = [];
    const first = controller.claim({ id: 'first', authorize: () => true, close: (reason) => closed.push(`first:${reason}`) });
    const second = controller.claim({ id: 'second', authorize: () => true, close: (reason) => closed.push(`second:${reason}`) });
    controller.release(first);

    expect(closed).toEqual(['first:replaced']);
    expect(controller.current()).toBe(second);
  });

  test('retires an activation whose captured owner authority is gone', () => {
    let active = true;
    const controller = new GuestPopoverController();
    const closed: string[] = [];
    const activation = controller.claim({ id: 'preview', authorize: () => active, close: (reason) => closed.push(reason) });
    active = false;

    expect(controller.authorize(activation)).toBe(false);
    expect(closed).toEqual(['owner']);
    expect(controller.current()).toBeNull();
  });
});
