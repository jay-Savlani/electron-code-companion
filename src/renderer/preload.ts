const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('osConnectBridge', {
  openFile: () => ipcRenderer.invoke('openFile'),
  readFile: (filePath: string) => ipcRenderer.invoke('readFile', filePath),
  writeFile: (filePath: string, writeData: string) =>
    ipcRenderer.invoke('writeFile', filePath, writeData),
  appendFile: (filePath: string, appendData: string) =>
    ipcRenderer.invoke('appendFile', filePath, appendData),
  createHistoryFile: () => ipcRenderer.invoke('createHistoryFile'),
  getConfigFile: () => ipcRenderer.invoke('getConfigFile'),
  setupConfig: () => ipcRenderer.invoke('setupConfig'),
});
