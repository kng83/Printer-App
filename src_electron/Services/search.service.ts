import {comService, storageService} from './service_list.service';
import { ComList, LoadFile } from '../Interfaces/main_lists';


export class SearchService{

    constructor(){
       this.onSearchStarted(); 
    }

    private sendDataToAngular(dataArray:string[][]){
        comService.send(ComList.sendDataRows,dataArray)
    }

    onSearchStarted(){
        comService.on(ComList.sendColumnsInfo,(event,content)=>{
           const columnFirstFile = (<any>content).fileOne
           const columnSecondFile = (<any>content).fileTwo
           console.log(columnFirstFile,columnSecondFile);

           const {original , mut} =  storageService.load(LoadFile.firstFile) as {original:string[][], mut:string[][]}
           const original2:string[][]  = storageService.load(LoadFile.secondFile).original;
           const mut2:string[][] = storageService.load(LoadFile.secondFile).mut;
           const equalRows = [];
           let counter = 0;
           let superMut2 = mut2.slice(0);

           for (let i = 0; i< mut.length; i++){
            const elementInColumn = mut[i][columnFirstFile];

                for(let j = 0 ; j < superMut2.length;j++){
                    const secElementInColumn = superMut2[j][columnSecondFile]
                    if(secElementInColumn === elementInColumn){
                        equalRows.push(i);
                        superMut2[j].splice(j,1);
                        counter++;
                        break;
                    }
                }
        
            if(counter == mut2.length){
                break;
            }
        
        }
            this.sendDataToAngular(this.menageData(equalRows));
        
        })
    }

    private menageData(listOfRows:number[]){
        const {original , mut} =  storageService.load(LoadFile.firstFile) as {original:string[][], mut:string[][]}
        let dataArray = [];
        listOfRows.forEach(element =>{
            dataArray.push(original[element])
        })
        return dataArray;
    }
    
}