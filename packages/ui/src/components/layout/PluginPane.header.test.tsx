import { expect, spyOn, test } from 'bun:test';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { OpenCode } from '@opencode/client';
import { Window } from 'happy-dom';
import { hostMessageSchema } from '@openchamber/sdk/schemas';
import type { GuestMessage, HostMessage, WidthRequest } from '@openchamber/sdk';

import { ThemeSystemContext, type ThemeContextValue } from '@/contexts/theme-system-context';
import { getDefaultTheme } from '@/lib/theme/themes';
import { I18nProvider } from '@/lib/i18n';
import { getRuntimeKey } from '@/lib/runtime-switch';
import { useGuestBadgeStore } from '@/lib/guests/badge-store';
import { useGuestsStore } from '@/lib/guests/store';
import type { InstalledGuest } from '@/lib/guests/types';
import { pluginModeFromId } from '@/lib/surfaces/modes';
import { useUIStore } from '@/stores/useUIStore';
import { SyncProvider } from '@/sync/sync-context';
import { PluginPane } from './PluginPane';

const headerGuest: InstalledGuest = {
  id: 'demo',
  name: 'Demo',
  icon: 'window',
  entry: 'panel/index.html',
  headerEntry: 'header/index.html',
  source: 'path',
  capabilities: { requested: [], granted: [] },
};

/**
 * Mounts one pane in a happy-dom window, with the guest catalog already
 * answered and the frame's contentWindow swapped for a guest window, so the
 * test can post guest messages and read what the host sends back.
 */
const mountPane = async (guests: InstalledGuest[], children: React.ReactNode) => {
  const dom = new Window({ url: 'http://guest.test', settings: { disableIframePageLoading: true } });
  const originals = new Map<string, PropertyDescriptor | undefined>();
  for (const [key, value] of Object.entries({ window: dom, document: dom.document, navigator: dom.navigator,
    localStorage: dom.localStorage, getComputedStyle: dom.getComputedStyle.bind(dom), Event: dom.Event, MessageEvent: dom.MessageEvent,
    IS_REACT_ACT_ENVIRONMENT: true })) {
    originals.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  const fetchSpy = spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
    const target = String(input instanceof Request ? input.url : input);
    if (target.includes('/frame-grant')) return Response.json({ grant: 'grant-test', expiresAt: Date.now() + 60_000 });
    if (target.includes('/auth/url-token')) return Response.json({ token: 'scoped-test', expiresAt: Date.now() + 60_000 });
    if (target.includes('/session-warming')) return Response.json({ revision: 1, enabled: false, minutes: 30, sessions: [] });
    if (target.includes('/event')) return new Response(new ReadableStream(), { headers: { 'content-type': 'text/event-stream' } });
    return Response.json({ data: [] });
  });
  const sdk = OpenCode.make({ baseUrl: 'http://sync.test', fetch: async (request) => {
    const path = new URL(request instanceof Request ? request.url : request.toString()).pathname;
    if (path.endsWith('/event')) return new Response(new ReadableStream(), { headers: { 'content-type': 'text/event-stream' } });
    return Response.json(path.endsWith('/session/active') ? {} : { data: [] });
  } });
  const theme = getDefaultTheme(false);
  const themeContext: ThemeContextValue = {
    currentTheme: theme, availableThemes: [theme], customThemeIds: [], setTheme: () => {}, customThemesLoading: false,
    reloadCustomThemes: async () => {}, importTheme: async () => theme, deleteImportedTheme: async () => {},
    isSystemPreference: false, setSystemPreference: () => {}, themeMode: 'light', setThemeMode: () => {},
    lightThemeId: theme.metadata.id, darkThemeId: theme.metadata.id, setLightThemePreference: () => {}, setDarkThemePreference: () => {},
  };
  const runtimeKey = getRuntimeKey();
  useGuestsStore.getState().resetForRuntimeSwitch(runtimeKey);
  useGuestsStore.getState().replaceCatalog(guests, runtimeKey);
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);
  const guestWindow = new Window();
  const received: HostMessage[] = [];
  const restores: Array<() => void> = [];
  const post = spyOn(guestWindow, 'postMessage').mockImplementation((data) => { received.push(hostMessageSchema.parse(data)); });
  restores.push(() => post.mockRestore());
  const cleanup = async () => {
    await act(async () => root.unmount());
    for (const restore of restores) restore();
    fetchSpy.mockRestore();
    useGuestsStore.getState().resetForRuntimeSwitch(runtimeKey);
    useGuestBadgeStore.getState().resetForRuntimeSwitch();
    await guestWindow.happyDOM.close();
    await dom.happyDOM.close();
    for (const [key, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  };
  try {
    await act(async () => root.render(
      <I18nProvider><ThemeSystemContext.Provider value={themeContext}>
        <SyncProvider sdk={sdk} directory="/visible">{children}</SyncProvider>
      </ThemeSystemContext.Provider></I18nProvider>,
    ));
    let frame: HTMLIFrameElement | null = null;
    for (let attempt = 0; attempt < 100 && !frame; attempt++) {
      frame = container.querySelector<HTMLIFrameElement>('iframe');
      if (!frame) await act(async () => { await new Promise((resolve) => setTimeout(resolve, 10)); });
    }
    if (!frame) throw new Error('Extension frame did not mount');
    Object.defineProperty(frame, 'contentWindow', { configurable: true, value: guestWindow });
    const ownerSource = frame.contentWindow;
    if (!ownerSource) throw new Error('Guest window is missing');
    const send = async (message: GuestMessage, source: MessageEventSource = ownerSource) => {
      await act(async () => { window.dispatchEvent(new MessageEvent('message', { source, data: message })); });
    };
    const ready = () => received.find((message) => message.type === 'ready');
    const result = (id: string) => received.find((message) => message.type === 'result' && message.id === id);
    return { send, ready, result, cleanup };
  } catch (error) {
    await cleanup();
    throw error;
  }
};

const base = { channel: 'openchamber.sdk', v: 1 } as const;

test('a header frame advertises header sizing and popovers', async () => {
  const widths: WidthRequest[] = [];
  const pane = await mountPane([headerGuest], (
    <PluginPane mode="plugin:demo" surface="header" item={null} onWidth={(request) => { widths.push(request); }} />
  ));
  try {
    await pane.send({ ...base, type: 'hello' });
    expect(pane.ready()).toMatchObject({
      payload: { surface: 'header', features: { headerWidth: true, popovers: true } },
    });
    await pane.send({ ...base, type: 'width', id: 'width-1', payload: { preferred: 200, min: 60 } });
    expect(widths).toEqual([{ preferred: 200, min: 60 }]);
    expect(pane.result('width-1')).toMatchObject({ ok: true });
  } finally {
    await pane.cleanup();
  }
});

test('a dialog frame advertises neither header sizing nor popovers', async () => {
  const pane = await mountPane([headerGuest], (
    <PluginPane mode="plugin:demo" surface="dialog" item={null} />
  ));
  try {
    await pane.send({ ...base, type: 'hello' });
    const ready = pane.ready();
    expect(ready).toMatchObject({ payload: { surface: 'dialog' } });
    const features = ready?.type === 'ready' ? ready.payload.features ?? {} : {};
    expect(features.headerWidth).toBeUndefined();
    expect(features.popovers).toBeUndefined();
  } finally {
    await pane.cleanup();
  }
});

test('a header-only package keeps an open rail tab', async () => {
  const mode = pluginModeFromId('demo');
  const previousPanels = useUIStore.getState().contextPanelByDirectory;
  useUIStore.getState().openContextPanelTab('/repo', { mode });
  const tabOpen = () => useUIStore.getState().contextPanelByDirectory['/repo']?.tabs.some((tab) => tab.mode === mode) ?? false;
  expect(tabOpen()).toBe(true);
  const pane = await mountPane([{ ...headerGuest, entry: undefined }], (
    <PluginPane mode="plugin:demo" surface="header" item={null} />
  ));
  try {
    await pane.send({ ...base, type: 'hello' });
    expect(tabOpen()).toBe(true);
  } finally {
    await pane.cleanup();
    useUIStore.setState({ contextPanelByDirectory: previousPanels });
  }
});

test('widths come only from the owning frame and a header frame sets no rail badge', async () => {
  const widths: WidthRequest[] = [];
  const pane = await mountPane([headerGuest], (
    <PluginPane mode="plugin:demo" surface="header" item={null} onWidth={(request) => { widths.push(request); }} />
  ));
  const strangerFrame = document.createElement('iframe');
  document.body.append(strangerFrame);
  const strangerWindow = new Window();
  Object.defineProperty(strangerFrame, 'contentWindow', { configurable: true, value: strangerWindow });
  const strangerSource = strangerFrame.contentWindow;
  if (!strangerSource) throw new Error('Stranger window is missing');
  try {
    await pane.send({ ...base, type: 'hello' });
    await pane.send({ ...base, type: 'width', id: 'width-stranger', payload: { preferred: 480, min: 300 } }, strangerSource);
    expect(widths).toEqual([]);
    expect(pane.result('width-stranger')).toBeUndefined();

    await pane.send({ ...base, type: 'width', id: 'width-owner', payload: { preferred: 168, min: 72 } });
    expect(widths).toEqual([{ preferred: 168, min: 72 }]);
    expect(pane.result('width-owner')).toMatchObject({ ok: true });

    await pane.send({ ...base, type: 'badge', id: 'badge-1', payload: { count: 7 } });
    expect(useGuestBadgeStore.getState().countByGuest.demo).toBeUndefined();
    expect(pane.result('badge-1')).toMatchObject({ ok: true });
  } finally {
    await pane.cleanup();
    await strangerWindow.happyDOM.close();
  }
});
