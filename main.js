const { app, BrowserWindow, ipcMain } = require('electron')
const url = require("url");
const path = require("path");

require('electron-reload')(__dirname, {
    electron: require("electron")
});

let mainWindow
// sloem
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/Printer-App/index.html`),
            protocol: "file:",
            slashes: true
        })
    );
    //      mainWindow.loadUrl(`file://${__dirname}/dist/Printer-App/index.html`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})


ipcMain.on('openModal', (event, arg) => {
    console.log(arg, 'some textsssmmsssss');
})

