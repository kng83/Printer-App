import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IpcService } from 'src/app/services/ipc.service';
import { ComList } from 'src_electron/Interfaces/main_lists';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  showMatchButton = false;
  showColumnPicker = false;
  showTable = false;
  showMsgFileCreated = false;
  textFromElectron_1:string;
  textFromElectron_2:string;
  textFromElectron_3:string;
  textFromElectron_4:string;
  firstFileColumn:number;
  secondFileColumn:number;
  pickOptions = {
    omitRepeatedValues:false,
    addGermanTranslation:false,
    addAdditionalInfo:false
  }
  rowsContent:string[][];

  constructor(private ipcService: IpcService,  private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.ipcService.on<string>(ComList.infoMessage_2,(event, content)=>{
      this.textFromElectron_2 = content
      this.showColumnPicker = true;
      this.showMsgFileCreated = false;
      this.cdr.detectChanges();
    })

    this.ipcService.on<string[][]>(ComList.sendDataRows,(event,content)=>{
      this.rowsContent = content;
      this.showTable = true;
      this.cdr.detectChanges();

    })

    this.ipcService.on<string>(ComList.infoMessage_4,(event,content)=>{
      this.textFromElectron_4 = content;
      this.showMsgFileCreated = true;
      this.cdr.detectChanges();
    })
  }

  compareFiles(){
    console.log('compare')
  }

  onSubmit(){
    this.ipcService.send(ComList.sendColumnsInfo,this.pickOptions);
  }

}
