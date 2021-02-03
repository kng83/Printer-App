import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from "rxjs";
import { first } from "rxjs/operators"


type PairMul = [firstNumber: number, secondNumber: number, answer: number];

@Injectable({
  providedIn: 'root'
})
export class MathService {

  score = 0;
  lives = 3;
  $score: BehaviorSubject<number> = new BehaviorSubject(0);
  $lives: BehaviorSubject<number> = new BehaviorSubject(3);
  gameOver: boolean = false;

  getPairOfMul(): PairMul {
    const firstNumber = Math.round(Math.random() * 10);
    const secondNumber = Math.round(Math.random() * 10);
    return [firstNumber, secondNumber, firstNumber * secondNumber]
  }


  removeLives() {
    this.$lives.pipe(first()).subscribe(lives => {
      this.$lives.next(lives - 1)
    })
  }

  addScore() {
    this.$score.pipe(first()).subscribe(score => {
      this.$score.next(score + 1);
    })
  }

  checkGame() { 

    this.$lives.subscribe(lives => {
      if (lives < 0) {
        this.$lives.next(0)
        this.gameOver = true;

        setTimeout(() => {
         this.gameOver = false;
          this.$lives.next(3)
          this.$score.next(0);
        }, 3000);
      }
    })
    return of(this.gameOver);
  }
}
