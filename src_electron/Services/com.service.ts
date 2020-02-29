import { BrowserWindow, ipcMain, IpcMain, IpcMainEvent } from 'electron'
import { ComList } from '../Interfaces/main_lists';
import { bindCallback ,Scheduler,Observable} from 'rxjs';
import {promisify} from 'util';


export class ComService {

    ipcMain: IpcMain;
    win: BrowserWindow
    constructor() { }

    public mountWin(win: BrowserWindow) {
        this.win = win;
    }

     

    public on<T>(channel: ComList ,callback:(event:IpcMainEvent,content:T)=>void) {       
          ipcMain.on(channel, callback)
 
    }

    public send<T>(channel: ComList, content: T) {
        this.win.webContents.send(channel, content);
    }
}