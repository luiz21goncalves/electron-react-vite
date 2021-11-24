import electron from 'electron'
import { spawn } from 'child_process'
import { build as viteBuild } from 'vite'

function getWatcher({ name, configFile, writeBundle }) {
  return viteBuild({
    build: {
      watch: {}
    },
    configFile,
    plugins: [ { name, writeBundle } ]
  })
}

async function watchMain() {
  let electronProcess = null

  const watcher = await getWatcher({
    name: 'electron-main-watcher',
    configFile: 'config/vite.main.ts',
    writeBundle() {
      electronProcess && electronProcess.kill()
      electronProcess = spawn(electron, ['.'], {
        stdio: 'inherit',
        env: Object.assign(process.env)
      })
    }
  })

  return watcher
}

await watchMain()
