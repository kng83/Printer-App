"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var menu_template_1 = require("./Main_Bar/menu_template");
var path = require("path");
var url = require("url");
var service_list_service_1 = require("./Services/service_list.service");
var main_lists_1 = require("./Interfaces/main_lists");
//**For develop serve argument is attached
var appArgs = process.argv.slice(1);
exports.serve = appArgs.some(function (val) { return val === '--serve'; });
exports.win = null;
//** building menu from template file
var menu = electron_1.Menu.buildFromTemplate(menu_template_1.template);
electron_1.Menu.setApplicationMenu(menu);
// ** Function which creates window
function createWindow() {
    // Stwórz okno przeglądarki.
    exports.win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: true
        }
    });
    //Service Register
    service_list_service_1.comService.mountWin(exports.win);
    //** Life electron reload */
    var mainDirName = path.join(__dirname, '..');
    //** Serving dev or production mode */
    if (exports.serve) {
        require('electron-reload')(__dirname, {
            electron: require(mainDirName + "/node_modules/electron"),
            hardResetMethod: 'quit',
            forceHardReset: true,
            argv: [process.argv[1], process.argv[2]] //here is passed path './src_electron/main.js [1] , serve[2]
        });
        //** DEV: Angular view from serve mode */
        exports.win.loadURL('http://localhost:4200');
    }
    else {
        //** Prod: path to angular build file */
        //  win.loadFile(path.join(mainDirName, 'dist/Printer-App/index.html'));
        exports.win.loadURL(url.format({
            pathname: path.join(mainDirName, 'dist/Printer-App/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    if (exports.serve) {
        exports.win.webContents.openDevTools();
    }
    exports.win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.//
        exports.win = null;
    });
    return exports.win;
}
//** Run electron app */
try {
    // for deprecation warning be carful with that !!! (Why duno?)
    electron_1.app.allowRendererProcessReuse = false;
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', function () {
        createWindow();
        setTimeout(function () {
            service_list_service_1.openFileService.getDataDirectFromFile(main_lists_1.LoadFile.firstFile, service_list_service_1.storageService);
        }, 0);
    });
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
        if (exports.win === null) {
            createWindow();
        }
    });
}
catch (e) {
    console.log(e);
}
// ipcMain.on('openModal', (event, arg) => {
//   console.log(arg, 'some snake was found a in srg sssa1');
// })
//# sourceMappingURL=main.js.map