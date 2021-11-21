const { app, BrowserWindow, screen } = require('electron')

const isMac = process.platform === 'darwin'

function createBrowser() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  const window = new BrowserWindow({
    width,
    height,
  })

  window.loadFile('index.html')
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
