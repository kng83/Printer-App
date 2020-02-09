
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const path = require('path');


console.log(__dirname);
function createWindow() {
  // Stwórz okno przeglądarki.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
     // allowRunningInsecureContent: true
    }
  });

  console.log(__dirname);
  //** Life electron reload */
  const mainDirName = path.join(__dirname,'..');
  const thisDirName = __dirname;
  console.log(mainDirName);
  let pathToElectron = path.join(`${mainDirName}`,'node_modules','electron');
  console.log(pathToElectron);


  require('electron-reload')(__dirname, {
  
  //  electron: require(`${mainDirName}/node_modules/electron`)
   // electron: pathToElectron
     electron: path.join(`${mainDirName}`, 'node_modules/.bin/electron.cmd')
  })

  // and load the index.html of the app. ///
     win.loadFile(path.join(mainDirName,'dist/Printer-App/index.html'));

  // win.loadURL(url.format({
  //   pathname: path.join(__dirname, '/dist/Printer-App/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));

  // Otwórz Narzędzia Deweloperskie.
  win.webContents.openDevTools()
}


app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

ipcMain.on('openModal', (event, arg) => {
  console.log(arg, 'some snake 2s7sssssd');
})

