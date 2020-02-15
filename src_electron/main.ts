
import { app, BrowserWindow, ipcMain} from 'electron';
import * as path from 'path';


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
//
  //** Life electron reload */
  const mainDirName = path.join(__dirname,'..');
  console.log(process.argv,'some argv')
  
  require('electron-reload')(__dirname, {
  
     electron: require(`${mainDirName}/node_modules/electron`),
     hardResetMethod: 'quit',
     argv:[process.argv[1]] //here is passed path './src_electron/main.js
  })

  // and load the index.html of the app. ///
     win.loadFile(path.join(mainDirName,'dist/Printer-App/index.html'));

  // win.loadURL(url.format({
  //   pathname: path.join(__dirname, '/dist/Printer-App/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));

  //

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
  console.log(arg, 'some snssake is fund homse and 433 ');
})

//