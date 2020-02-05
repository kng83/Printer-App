const { app, BrowserWindow, ipcMain } = require('electron')



//** Life electron reload */
require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});

function createWindow () {
    // Stwórz okno przeglądarki.
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });
  
    // and load the index.html of the app. ///
    win.loadFile('./dist/Printer-App/index.html')
  
    // Otwórz Narzędzia Deweloperskie.
    win.webContents.openDevTools()
  }
  //so

  app.whenReady().then(createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  
ipcMain.on('openModal', (event, arg) => {
    console.log(arg, 'some ss');
})

