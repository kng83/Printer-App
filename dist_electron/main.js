"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
//**For develop serve argument is attached
var appArgs = process.argv.slice(1);
var serve = appArgs.some(function (val) { return val === '--serve'; });
var win = null;
// ** Function which creates window
function createWindow() {
    // Stwórz okno przeglądarki.
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: true
        }
    });
    //** Life electron reload */
    var mainDirName = path.join(__dirname, '..');
    //** Serving dev or production mode */
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(mainDirName + "/node_modules/electron"),
            hardResetMethod: 'quit',
            forceHardReset: true,
            argv: [process.argv[1], process.argv[2]] //here is passed path './src_electron/main.js [1] , serve[2]
        });
        //** DEV: Angular view from serve mode */
        win.loadURL('http://localhost:4200');
    }
    else {
        //** Prod: path to angular build file */
        win.loadURL(url.format({
            pathname: path.join(mainDirName, 'dist/Printer-App/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    if (serve) {
        win.webContents.openDevTools();
    }
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    return win;
}
//** Run electron app */
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', createWindow);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    console.log(e);
}
electron_1.ipcMain.on('openModal', function (event, arg) {
    console.log(arg, 'this is some tests');
});
//# sourceMappingURL=main.js.map