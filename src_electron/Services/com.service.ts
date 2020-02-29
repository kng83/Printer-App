import { BrowserWindow, ipcMain, IpcMain, IpcMainEvent } from 'electron'
import { ComList } from '../Interfaces/main_lists';
import { bindCallback ,Scheduler} from 'rxjs';


export class ComService {

    ipcMain: IpcMain;
    win: BrowserWindow
    constructor() { }

    public mountWin(win: BrowserWindow) {
        this.win = win;
    }

    // public on<T>(channel: ComList): Promise<{ event: IpcMainEvent, arg: T }> {
    //     return new Promise((resolve) => {
    //         ipcMain.on(channel, (event, arg: T) => {
    //             resolve({ event, arg })
    //         })
    //     })
    // }

    

    // public on<T>(channel: ComList ,callback:any) {   
    //       ipcMain.on(channel, (callback))
 
    // }
    public on<T>(channel:ComList){
        const boundObservable = bindCallback(ipcMain.on)
        return boundObservable(channel).subscribe(val=>console.log(val))
    }

    public send<T>(channel: ComList, content: T) {
        this.win.webContents.send(channel, content);
    }
}