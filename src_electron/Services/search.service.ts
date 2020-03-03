import { comService, storageService ,openFileService} from './service_list.service';
import { ComList, LoadFile } from '../Interfaces/main_lists';
import * as fs from 'fs';


export class SearchService {

    waitingToEnd = false
    constructor() {
        this.onSearchStarted();
    }

    private sendDataToAngular(dataArray: string[][]) {
        comService.send(ComList.sendDataRows, dataArray)
    }

    onSearchStarted() {
        comService.on(ComList.sendColumnsInfo, (event, content) => {
            if(this.waitingToEnd) return 0;
            console.log('hererererer');
            this.waitingToEnd = true;
            const mut2:string[] = storageService.load(LoadFile.firstFile).mut;
            const mut: string[] = storageService.load(LoadFile.secondFile).mut;
            const equalRows:number[]= [];
            let counter = 0;
          
            mut.forEach((logEl, index) => {

               for (let i = (mut2.length-1); i>=0; i--) {
                    const mainFileEl = mut2[i]; 
                        if(mainFileEl.length == logEl.length){
                            if(mainFileEl == logEl){
                                equalRows.push(i);
                                counter++;
                                break;
                           }       

                        }                   
                    counter++;               
                }

            })
            console.log(counter,'row count')
            this.sendDataToAngular(this.menageData(equalRows));
            setTimeout(()=>{
                this.waitingToEnd = false;
            },5000)
           
        })
    }

    private menageData(listOfRows: number[]) {
        const  original2 = storageService.load(LoadFile.firstFile).original
        const  original = storageService.load(LoadFile.secondFile).original 

        let dataArray = [];
        for (let i = 0;i<10;i++){
          //  const time = original2[listOfRows[]]
            const polishName = [original[i][0],original[i][4],(original2[listOfRows[i]])[1],(original2[listOfRows[i]])[0],original[i][1]]
            dataArray.push(polishName)
        }
        let secondArray = [];
        for (let i = 0;i<listOfRows.length;i++){
            //  const time = original2[listOfRows[]]
              const polishName = [original[i][0],original[i][4],(original2[listOfRows[i]])[1],(original2[listOfRows[i]])[0],original[i][1]]
              secondArray.push(polishName)
          }
        let dataToFile = openFileService.mapFile(secondArray);
          openFileService.generateCsvFile(dataToFile).then(done=>console.log(done,'promise returned')).catch(e=>console.log(e.message));
        return dataArray;
    }

}