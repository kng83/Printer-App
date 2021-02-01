import { Injectable } from '@angular/core';


type PairMul = [firstNumber:number, secondNumber:number, answer:number];

@Injectable({
  providedIn: 'root'
})
export class MathService {


    getPairOfMul():PairMul{
        const firstNumber = Math.round(Math.random() * 10);
        const secondNumber = Math.round(Math.random() *10);
        return [firstNumber, secondNumber, firstNumber * secondNumber]
    }
}
//