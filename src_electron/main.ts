
import { app, BrowserWindow, ipcMain, Menu, ipcRenderer } from 'electron';
import { template } from './Main_Bar/menu_template';
import * as path from 'path';
import * as url from 'url';
import {comService,openFileService, storageService} from './Services/service_list.service';
import { LoadFile } from './Interfaces/main_lists';


//**For develop serve argument is attached
const appArgs = process.argv.slice(1);
const serve = appArgs.some(val => val === '--serve');
export let win: BrowserWindow = null;


//** building menu from template file
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);


// ** Function which creates window
function createWindow(): BrowserWindow {
  // Stwórz okno przeglądarki.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: true
    }
  });

  //Service Register
  comService.mountWin(win);



  //** Life electron reload */
  const mainDirName = path.join(__dirname, '..');

  //** Serving dev or production mode */
  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${mainDirName}/node_modules/electron`),
      hardResetMethod: 'quit',
      forceHardReset: true,
      argv: [process.argv[1], process.argv[2]] //here is passed path './src_electron/main.js [1] , serve[2]
    })

    //** DEV: Angular view from serve mode */
    win.loadURL('http://localhost:4200');
  } else {
    //** Prod: path to angular build file */
    //  win.loadFile(path.join(mainDirName, 'dist/Printer-App/index.html'));
    win.loadURL(url.format({
      pathname: path.join(mainDirName, 'dist/Printer-App/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    win.webContents.openDevTools()
  }

  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.//
    win = null;
  });

  return win;
}

//** Run electron app */
try {
  // for deprecation warning be carful with that !!! (Why duno?)
   app.allowRendererProcessReuse = false;
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', ()=>{
    createWindow()
    setTimeout(()=>{
      openFileService.getDataDirectFromFile(LoadFile.firstFile, storageService);
    },0)

  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  console.log(e);
}

// ipcMain.on('openModal', (event, arg) => {
//   console.log(arg, 'some snake was found a in srg sssa1');
// })

