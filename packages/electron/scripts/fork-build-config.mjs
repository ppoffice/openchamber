// Retains every stable identity field, including the package-name default that
// NSIS uses for the install folder and uninstall registration.
export const officialNoUpdatesBuildConfig = (releaseConfig) => ({
  ...structuredClone(releaseConfig),
  publish: null,
});

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
