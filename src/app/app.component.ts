import { Component } from "@angular/core";
import { IpcRenderer } from "electron";
import {IpcService} from "./services/ipc.service"
import { ComList } from 'src_electron/Interfaces/main_lists';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Printer-App";

  constructor(private ipcService: IpcService){

  }
  
  sendData(){
    this.ipcService.send(ComList.sendToElectron, { cat: "bobo 1" })
  }

}
