import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const mainSource = fs.readFileSync(new URL('./main.mjs', import.meta.url), 'utf8');
for (const name of ['buildMacMenu', 'buildAutoHiddenMenu']) {
  test(`${name} disables the native update action only in updates-off builds`, () => {
    // Evaluate the real menu builder without booting Electron or registering a
    // protocol handler. Callbacks are not invoked by template construction.
    const source = mainSource.match(new RegExp(`const ${name} = [\\s\\S]*?\\n};`))?.[0];
    assert.ok(source);
    for (const disabled of [true, false]) {
      const template = vm.runInNewContext(`${source}\n${name}('en')`, {
        UPDATES_DISABLED: disabled,
        Menu: { buildFromTemplate: (value) => value },
        menuLabel: (_locale, key) => key,
        roleMenuItem: (_locale, role, label) => ({ role, label }),
        menuKey: (_key, fallback) => fallback,
        closeTabOrWindow: () => {},
      });
      const item = template[0].submenu.find((entry) => entry.label === 'checkForUpdates');
      assert.equal(item.enabled, !disabled);
    }
  });
}
