
export {}

declare global {
  interface Window {
    Main: {
      __dirname: string
      __filename: string
      fs: typeof import('fs')
      path: typeof import('path')
      ipcRenderer: import('electron').IpcRenderer
      removeLoading: () => void
    }
  }
}