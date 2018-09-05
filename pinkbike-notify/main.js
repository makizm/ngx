const { app, BrowserWindow, ipcMain } = require('electron')

const { PinkBike } = require('./pinkbike');

// const RxIpc = require('rx-ipc-electron/lib/main')
// const rxIpc = require('rx-ipc-electron/lib/rx-ipc');

const { Observable, Subject, ReplaySubject, from, of, range } = require('rxjs')
const { map, filter, switchMap } = require('rxjs/operators')

// Electron.BrowserWindow
let win;

let pinkbike = new PinkBike();

// let rxIpcTest = new rxIpc.RxIpc()

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600, 
    height: 600,
    backgroundColor: '#666666',
    icon: "file://${__dirname}/dist/favicon.png"
  })


  win.loadURL(`file://${__dirname}/dist/index.html`)

  pinkbike.post.subscribe(data => {
    // send data to renderer
    win.webContents.send('new-posts', data)
  })
  
  pinkbike.start();

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    pinkbike.stop();

    win = null;
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})