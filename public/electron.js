// ./main.js
const {app, BrowserWindow} = require('electron')
const path = require('path');
const url = require('url');
const { ipcMain } = require('electron');
const loadBalancer = require('electron-load-balancer');
let win = null;

function createWindow() {
  const starturl = url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });
  let win = new BrowserWindow({ frame: false, height: 1000, width: 700,webPreferences:{webSecurity:false,blinkFeatures: 'OverlayScrollbars', allowRunningInsecureContent:true}});
  win.show();
  win.loadURL("http://localhost:3000/");
  win.webContents.openDevTools();
  win.on('closed', function () {
    win = null;
    loadBalancer.stopAll();
  });
}


app.on('ready', function () {

  createWindow();

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});