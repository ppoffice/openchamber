// Baked into every main-process bundle. Runtime environment cannot re-enable
// updates or turn an installed fork into the official application.
export const IS_FORK = typeof __OPENCHAMBER_FORK_BUILD__ !== 'undefined' && __OPENCHAMBER_FORK_BUILD__ === true;
export const APP_NAME = IS_FORK ? 'OpenChamber Fork' : 'OpenChamber';
export const APP_ID = IS_FORK ? 'dev.openchamber.desktop.fork' : 'dev.openchamber.desktop';
export const DEEP_LINK_SCHEME = IS_FORK ? 'openchamber-fork' : 'openchamber';
