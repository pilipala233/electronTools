const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const { find } = require('./search')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	})
	win.loadFile('index.html')
	//win.webContents.openDevTools()
	ipcMain.handle('dialog:openFile', openFileDialog)
	ipcMain.handle('find', (event, ...arg) => {
		find(...arg)
			.then(value => {


				win.webContents.send('notice', value)
			})
			.catch(

				err => { win.webContents.send('notice', -1) }
			)
	}
	)


}

app.whenReady().then(() => {

	createWindow()
})

async function openFileDialog() {

	const options = {
		title: '选择文件夹',
		properties: ['openDirectory']
	};
	const { canceled, filePaths } = await dialog.showOpenDialog(options)
	if (canceled) {
		return ''
	} else {
		return filePaths[0]
	}

}




