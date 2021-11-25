import fs from 'fs'
import path from 'path'
import { contextBridge, ipcRenderer } from 'electron'
import { useLoading } from './loading'

const { appendLoading, removeLoading } = useLoading()

export function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

; (async () => {
  await domReady()
  appendLoading()
})();

contextBridge.exposeInMainWorld('Main', {
  __dirname,
  __filename,
  fs,
  path,
  ipcRenderer,
  removeLoading,
})
