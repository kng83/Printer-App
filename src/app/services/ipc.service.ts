import { Injectable } from '@angular/core';
import { IpcRenderer, IpcRendererEvent } from "electron";
import { ComList } from "../../../src_electron/Interfaces/main_lists";


@Injectable({
  providedIn: 'root'
})
export class IpcService {
  private ipcRenderer: IpcRenderer;
  constructor() {
    if ((<any>window).require) {
      try {
        this.ipcRenderer = (<any>window).require("electron").ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn("App not running inside Electron!");
    }
  }

  send<T>(channel: ComList, data: T) {
    this.ipcRenderer.send(channel, data);
  }

  // from electron
  on<T>(channel: ComList,callback:(event:IpcRendererEvent,content:T)=>void):void {  
      this.ipcRenderer.on(channel, callback)
  }
}

