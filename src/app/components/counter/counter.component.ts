import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IpcService } from 'src/app/services/ipc.service';
import { MathService } from 'src/app/services/math.service';
import { ComList } from 'src_electron/Interfaces/main_lists';
import {FormGroup,FormControl} from '@angular/forms'


@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

    firstNumber:number;
    secondNumber:number;
    answer:number;
    ok=0;
    
    profileForm = new FormGroup({
        typedAnswer: new FormControl(''),
        
    });
    
    constructor(private mathService :MathService){}
    
    ngOnInit() {
        [this.firstNumber, this.secondNumber, this.answer ] = this.mathService.getPairOfMul();
    }

    onSubmit(){
        console.log(this.profileForm.value.typedAnswer,this.answer)
      if(parseInt(this.profileForm.value.typedAnswer) === this.answer){
        
          this.ok = 1;
      }else{
          this.ok = 2;
      }
      setTimeout(()=>{
        this.ok =0 ;
        this.ngOnInit();
      },2000)


    }
}