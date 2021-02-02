import { Injectable } from '@angular/core';
import { BehaviorSubject} from "rxjs";
import{first} from "rxjs/operators"


type PairMul = [firstNumber: number, secondNumber: number, answer: number];

@Injectable({
  providedIn: 'root'
})
export class MathService {
  
  score = 0;
  lives = 3;
  $score :BehaviorSubject<number> = new BehaviorSubject(0);
  $lives :BehaviorSubject<number> = new BehaviorSubject(3);

  getPairOfMul(): PairMul {
    const firstNumber = Math.round(Math.random() * 10);
    const secondNumber = Math.round(Math.random() * 10);
    return [firstNumber, secondNumber, firstNumber * secondNumber]
  }
 

  removeLives(){
    this.$lives.pipe(first()).subscribe(lives =>{
        this.$lives.next(lives- 1)
    })
  }

  addScore(){
    this.$score.pipe(first()).subscribe(score =>{
      this.$score.next(score+1);
    })
  }

}
