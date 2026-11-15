export const forkBuildConfig = (releaseConfig) => ({
  ...structuredClone(releaseConfig),
  appId: 'dev.openchamber.desktop.fork',
  productName: 'OpenChamber Fork',
  executableName: 'OpenChamber Fork',
  extraMetadata: { name: 'openchamber-fork', productName: 'OpenChamber Fork' },
  publish: null,
  win: { ...releaseConfig.win, target: [{ target: 'nsis', arch: ['x64'] }] },
  nsis: { ...releaseConfig.nsis, shortcutName: 'OpenChamber Fork', uninstallDisplayName: 'OpenChamber Fork' },
});
