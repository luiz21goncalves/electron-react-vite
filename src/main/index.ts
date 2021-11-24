import { app, BrowserWindow, screen } from 'electron'
import isDev from 'electron-is-dev'

const isMac = process.platform === 'darwin'

function createBrowser() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  const window = new BrowserWindow({
    width,
    height,
  })

  window.removeMenu()

  window.loadFile('index.html')
  // window.loadURL('http://localhost:3000')

  if(isDev) {
    window.webContents.openDevTools({
      mode: 'detach'
    })
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
