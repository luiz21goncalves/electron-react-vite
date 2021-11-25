import electron from 'electron';
import { spawn } from 'child_process';
import { build as viteBuild, createServer } from 'vite';

function getWatcher({ name, configFile, writeBundle }) {
  return viteBuild({
    build: {
      watch: {},
    },
    configFile,
    plugins: [{ name, writeBundle }],
  });
}

async function watchMain() {
  let electronProcess = null;

  const watcher = await getWatcher({
    name: 'electron-main-watcher',
    configFile: 'config/vite.main.ts',
    writeBundle() {
      if (electronProcess) {
        electronProcess.kill();
      }
      electronProcess = spawn(electron, ['.'], {
        stdio: 'inherit',
        env: process.env,
      });
    },
  });

  return watcher;
}

async function watchProload(viteServer) {
  return getWatcher({
    name: 'electron-preload-watcher',
    configFile: 'config/vite.preload.ts',
    writeBundle() {
      viteServer.ws.send({ type: 'full-reload' });
    },
  });
}

const viteServer = await createServer({
  configFile: 'config/vite.renderer.ts',
});

await viteServer.listen();
await watchProload(viteServer);
await watchMain();
