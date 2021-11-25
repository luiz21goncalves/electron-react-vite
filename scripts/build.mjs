/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-template-curly-in-string */
import { build as viteBuild } from 'vite';
import { build as electronBuild } from 'electron-builder';
import chalk from 'chalk';

const TAG = chalk.bgGrey('[build.mjs]');

const viteConfigPaths = {
  main: 'config/vite.main.ts',
  preload: 'config/vite.preload.ts',
  reactTs: 'config/vite.renderer.ts',
};

async function buildElectron() {
  for (const [name, path] of Object.entries(viteConfigPaths)) {
    console.log(TAG, name);
    await viteBuild({ configFile: path, mode: process.env.NODE_ENV });
    console.groupEnd();
    console.log();
  }
}

async function packElectron() {
  return electronBuild({
    config: {
      asar: true,
      directories: {
        output: 'release/${version}',
      },
      files: ['!node_modules', 'dist', 'package.json'],
      mac: {
        artifactName: '${productName}_${version}.${ext}',
        target: ['dmg'],
      },
      win: {
        target: [
          {
            target: 'nsis',
            arch: ['x64'],
          },
        ],
        artifactName: '${productName}_${version}.${ext}',
      },
      nsis: {
        oneClick: false,
        perMachine: false,
        allowToChangeInstallationDirectory: true,
        deleteAppDataOnUninstall: false,
      },
      linux: {
        target: ['deb', 'rpm', 'tar.gz'],
      },
    },
  }).then((result) => {
    console.log(TAG, 'files:', chalk.green(result));
  });
}

await buildElectron();
await packElectron();
