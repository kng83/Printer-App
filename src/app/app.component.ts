import { Component, OnInit } from "@angular/core";
import {IpcService} from "./services/ipc.service"
import { ComList } from 'src_electron/Interfaces/main_lists';
import { MathService } from "./services/math.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit{
  title = "Printer-App";
  lives:number;
  score:number;

  constructor(private ipcService: IpcService ,private mathService:MathService){
    this.someData();
  }
  ngOnInit(){
    this.mathService.$score.subscribe(score=>{
      this.score = score;
    })
    this.mathService.$lives.subscribe(lives=>{
      this.lives = lives;
    })

  }


  sendData(){
    this.ipcService.send(ComList.sendToElectron, { cat: "bobo 1" })
  }

  someData(){
    this.ipcService.on(ComList.sendToAngular,(event,content)=>{
       console.log(content);
    });
  }

}
