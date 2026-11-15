import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const source = fs.readFileSync(new URL('./desktop-flavour.mjs', import.meta.url), 'utf8');
const flavour = (fork, updatesDisabled) => vm.runInNewContext(
  `${source.replaceAll('export const ', 'const ')}\n({ IS_FORK, UPDATES_DISABLED, APP_NAME, APP_ID, DEEP_LINK_SCHEME })`,
  { __OPENCHAMBER_FORK_BUILD__: fork, __OPENCHAMBER_UPDATES_DISABLED__: updatesDisabled },
);

test('updates-off retains stable runtime identity; fork remains isolated', () => {
  const stable = flavour(false, false);
  const official = flavour(false, true);
  assert.equal(official.IS_FORK, false);
  assert.equal(official.UPDATES_DISABLED, true);
  for (const key of ['APP_NAME', 'APP_ID', 'DEEP_LINK_SCHEME']) assert.equal(official[key], stable[key]);
  assert.equal(stable.UPDATES_DISABLED, false);
  const fork = flavour(true, false);
  assert.equal(fork.UPDATES_DISABLED, true);
  assert.equal(fork.APP_NAME, 'OpenChamber Fork');
  assert.equal(fork.APP_ID, 'dev.openchamber.desktop.fork');
  assert.equal(fork.DEEP_LINK_SCHEME, 'openchamber-fork');
});

test('unbundled development preserves the stable update policy', () => {
  const development = vm.runInNewContext(`${source.replaceAll('export const ', 'const ')}\n({ IS_FORK, UPDATES_DISABLED })`);
  assert.equal(development.IS_FORK, false);
  assert.equal(development.UPDATES_DISABLED, false);
});
