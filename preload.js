const { contextBridge ,ipcRenderer} = require('electron')

// import {test } from './main'

contextBridge.exposeInMainWorld('electronAPI', {

    // queryFilepath:()=>folderPath,
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    find:(filePath,outpullFilePath,noStatistics,resfilename) => ipcRenderer.invoke('find',filePath,outpullFilePath,noStatistics,resfilename),
    notice: (callback) => ipcRenderer.on('notice', callback)
    // 能暴露的不仅仅是函数，我们还可以暴露变量
})