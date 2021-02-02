import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';
import {FormGroup,FormControl} from '@angular/forms'
import { pipe } from 'rxjs';

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
    gameOver:boolean = false;
    
    profileForm = new FormGroup({
        typedAnswer: new FormControl(''),
        
    });
    
    constructor(private mathService :MathService){}
    
    ngOnInit() {
        [this.firstNumber, this.secondNumber, this.answer ] = this.mathService.getPairOfMul();
    }

    onSubmit(){
      if(this.ok > 0) return 0;
      if(parseInt(this.profileForm.value.typedAnswer) === this.answer){
        
          this.ok = 1;
          this.mathService.addScore()
      }else{
          this.ok = 2;
          this.mathService.removeLives()
      }

      this.mathService.$lives.subscribe(lives =>{
          if(lives < 0){
              this.mathService.$lives.next(0)
              this.gameOver = true;
              setTimeout(() => {
                  this.gameOver = false;
                  this.mathService.$lives.next(3)
                  this.mathService.$score.next(0);
              }, 3000);
          }
      })
    }

    message(){
        this.ok = 0;
        this.ngOnInit();
        this.profileForm.reset()

    }
}