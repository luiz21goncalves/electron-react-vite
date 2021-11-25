/* eslint-disable @typescript-eslint/ban-types */
import { contextBridge, ipcRenderer } from 'electron';

import { loading } from './loading';

const { appendLoading, removeLoading } = loading();

export function domReady(
  condition: DocumentReadyState[] = ['complete', 'interactive'],
) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

(async () => {
  await domReady();
  appendLoading();
})();

export const api = {
  removeLoading,
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message);
  },
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (event, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld('Main', api);
