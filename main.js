const {app, BrowserWindow} = require('electron')

/*
require('electron-reload')(__dirname, {
  electron: require('electron-prebuilt')
});
*/
require('electron-reload')(__dirname);


const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 900, height: 900, resizable: false})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)
/*
app.on('browser-window-created',function(e,window) {
     window.setMenu(null);
 });
 */

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
