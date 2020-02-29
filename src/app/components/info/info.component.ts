import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IpcService } from 'src/app/services/ipc.service';
import { ComList } from 'src_electron/Interfaces/main_lists';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  show = false;
  showMatchButton = false;
  showColumnPicker = false;
  textFromElectron_1:string;
  textFromElectron_2:string;
  textFromElectron_3:string;

  constructor(private ipcService: IpcService,  private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.ipcService.on<string>(ComList.infoMessage_1, (event, content) => {
      this.textFromElectron_1 = content;
      this.show = true;
      this.cdr.detectChanges();
    })

    this.ipcService.on<string>(ComList.infoMessage_2,(event, content)=>{
      this.textFromElectron_2 = content
      this.showColumnPicker = true;
      this.cdr.detectChanges();
    })

    this.ipcService.on<string>(ComList.infoMessage_3,(event, content)=>{
      this.textFromElectron_3 = content
      this.showColumnPicker = true;
      this.cdr.detectChanges();
    })
  }

  compareFiles(){
    console.log('compare')
  }

}
