import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { forkBuildConfig, officialNoUpdatesBuildConfig } from './fork-build-config.mjs';

test('official-no-updates differs from the entire stable configuration only in publish', () => {
  const release = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8')).build;
  const original = structuredClone(release);
  const config = officialNoUpdatesBuildConfig(release);
  assert.equal(config.publish, null);
  assert.deepEqual({ ...config, publish: release.publish }, release);
  assert.deepEqual(release, original);
});

test('the fork has its own Windows installer identity and no published update source', () => {
  const releaseConfig = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8')).build;
  const original = structuredClone(releaseConfig);
  const fork = forkBuildConfig(releaseConfig);
  assert.equal(fork.appId, 'dev.openchamber.desktop.fork');
  assert.equal(fork.productName, 'OpenChamber Fork');
  assert.equal(fork.extraMetadata.productName, fork.productName);
  // NSIS derives its default install folder from the package name.
  assert.equal(fork.extraMetadata.name, 'openchamber-fork');
  assert.equal(fork.executableName, fork.productName);
  assert.equal(fork.nsis.shortcutName, fork.productName);
  assert.equal(fork.nsis.uninstallDisplayName, fork.productName);
  assert.equal(fork.nsis.perMachine, false);
  assert.equal(fork.publish, null);
  assert.deepEqual(fork.win.target, [{ target: 'nsis', arch: ['x64'] }]);
  assert.deepEqual(releaseConfig, original);
});
