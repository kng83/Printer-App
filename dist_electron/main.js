"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
function createWindow() {
    // Stwórz okno przeglądarki.
    var win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    //
    //** Life electron reload */
    var mainDirName = path.join(__dirname, '..');
    console.log(process.argv, 'some argv');
    require('electron-reload')(__dirname, {
        electron: require(mainDirName + "/node_modules/electron"),
        hardResetMethod: 'quit',
        argv: [process.argv[1]] //here is passed path './src_electron/main.js
    });
    // and load the index.html of the app. ///
    win.loadFile(path.join(mainDirName, 'dist/Printer-App/index.html'));
    // win.loadURL(url.format({
    //   pathname: path.join(__dirname, '/dist/Printer-App/index.html'),
    //   protocol: 'file:',
    //   slashes: true
    // }));
    //
    win.webContents.openDevTools();
}
electron_1.app.whenReady().then(createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
electron_1.ipcMain.on('openModal', function (event, arg) {
    console.log(arg, 'some snake was found in srg ');
});
//
//# sourceMappingURL=main.js.map