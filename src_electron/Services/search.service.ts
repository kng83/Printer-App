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
            console.log(columnFirstFile, columnSecondFile);

            const { original, mut } = storageService.load(LoadFile.firstFile) as { original: string[][], mut: string[][] }
            const original2: string[][] = storageService.load(LoadFile.secondFile).original;
            const mut2: string[][] = storageService.load(LoadFile.secondFile).mut;
            const equalRows = [];
            let counter = 0;


          
            mut2.forEach((element, index) => {

                const len = element[columnSecondFile].length;
 
                const elementInPickedColumn = element[columnSecondFile].slice(4,len);

                for (let i = 0; i < mut.length; i++) {
                    const elementInColumn = mut[i][columnFirstFile];
                    if (elementInPickedColumn === elementInColumn) {
                        equalRows.push(i);
                        counter++;
                        break;
                    }
                }
            })
            console.log(counter,'how')
            this.sendDataToAngular(this.menageData(equalRows));

        })
    }

    private menageData(listOfRows: number[]) {
        const { original, mut } = storageService.load(LoadFile.firstFile) as { original: string[][], mut: string[][] }
        let dataArray = [];
        listOfRows.forEach(element => {
            dataArray.push(mut[element])
        })
        return dataArray;
    }

}