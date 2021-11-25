import { app, BrowserWindow, screen } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'

const isMac = process.platform === 'darwin'

function createBrowser() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  const window = new BrowserWindow({
    width,
    height,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.cjs')
    }
  })

  window.removeMenu()

  window.loadURL('http://localhost:3000')

  if(isDev) {
    window.webContents.openDevTools()
  }
}

app.whenReady().then(createBrowser).catch(e => console.error(e))

app.on('window-all-closed', () => {
  if(!isMac) {
    app.quit()
  }
})

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) {
    createBrowser()
  }
})
