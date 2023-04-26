const { app, BrowserWindow,ipcMain,dialog } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  ipcMain.handle('ping', openFileDialog)
  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
})

function openFileDialog() {

    const options = {
        title: '选择文件夹',
        properties: ['openDirectory']
      };
      
      dialog.showOpenDialog(options).then(result => {
        if (!result.canceled) {
          const folderPath = result.filePaths[0];
          console.log(`选择的文件夹路径为：${folderPath}`);
        }
      }).catch(err => {
        console.log(err);
      });
}


