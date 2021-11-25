import { app, BrowserWindow, screen, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';

const isMac = process.platform === 'darwin';

function createBrowser() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const window = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload/index.cjs'),
    },
  });

  window.removeMenu();

  if (isDev) {
    window.loadURL('http://localhost:3000');
    window.webContents.openDevTools();
  } else {
    window.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

async function registerListeners() {
  ipcMain.on('message', (event, message) => {
    console.log({ message });

    event.reply('message-replay', `${message} ${Math.random()}`);
  });
}

app
  .on('ready', createBrowser)
  .whenReady()
  .then(registerListeners)
  .catch((e) => console.error(e));

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createBrowser();
  }
});
