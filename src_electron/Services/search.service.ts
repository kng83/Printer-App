import { comService, storageService } from './service_list.service';
import { ComList, LoadFile } from '../Interfaces/main_lists';


export class SearchService {

    constructor() {
        this.onSearchStarted();
    }

    private sendDataToAngular(dataArray: string[][]) {
        comService.send(ComList.sendDataRows, dataArray)
    }

    onSearchStarted() {
        comService.on(ComList.sendColumnsInfo, (event, content) => {
            const columnFirstFile = 0
            const columnSecondFile = 3

            const original2 = storageService.load(LoadFile.firstFile).original;
            const mut2:string[] = storageService.load(LoadFile.firstFile).mut;
            const original: string[][] = storageService.load(LoadFile.secondFile).original;
            const mut: string[] = storageService.load(LoadFile.secondFile).mut;
            const equalRows:[number,number][] = [[0,0]];
            let counter = 0;
          
            mut.forEach((logEl, index) => {

               for (let i = 0; i < mut2.length; i++) {
                    const mainFileEl = mut2[i];          
                       // if (logEl.length === mainFileEl.length){                          
                                if(logEl.localeCompare(mainFileEl)){
                                    equalRows.push([i,index]);
                                    counter++;
                                    break;
                               }       
                   // }
                }
            })
            console.log(counter,'row count')
            this.sendDataToAngular(this.menageData(equalRows));

        })
    }

    private menageData(listOfRows: [number,number][]) {
        const  original2 = storageService.load(LoadFile.firstFile).original
        const  original = storageService.load(LoadFile.secondFile).original 

        let dataArray = [];
        for (let i = 0;i<1000;i++){
          //  const time = original2[listOfRows[]]
            const polishName = (original2[listOfRows[i][0]])[1]
            const germanName = (original[listOfRows[i][0]])[1]
            dataArray.push([polishName,germanName])
        }
        // listOfRows.forEach(element => {
        //     dataArray.push(original[element])
        // })
        return dataArray;
    }

}