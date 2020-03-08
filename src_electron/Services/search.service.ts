import {
  comService,
  storageService,
  openFileService
} from "./service_list.service";
import { ComList, LoadFile } from "../Interfaces/main_lists";

interface PickedOptions{
    omitRepeatedValues:boolean,
    sorting:boolean,
    addGermanTranslation:boolean,
    addAdditionalInfo: boolean

}

export class SearchService {
  waitingToEnd = false;
  constructor() {
    this.onSearchStarted();
  }

  private sendDataToAngular(dataArray: string[][]) {
    comService.send(ComList.sendDataRows, dataArray);
  }

  onSearchStarted() {
    comService.on(ComList.sendColumnsInfo, (event, contentOptions:PickedOptions) => {

      if (this.waitingToEnd) return 0;

      this.waitingToEnd = true;
      const mut2: string[] = storageService.load(LoadFile.firstFile).mut;
      let mut: string[]=[];
      const equalRows: number[] = [];
      const matchArr: [string, number][] = [["", 0]];
      const noName:string[] = [];
      let counter = 0;
      let notConvertedCounter = 0;

      let sorted:boolean = true;

      if(!contentOptions.sorting){
        mut = storageService.load(LoadFile.secondFile).mut;
      }else{
        mut = storageService.load(LoadFile.secondFile).mutDataSorted;
      }

      

      mut.forEach((logEl) => {
        let omitFirst = false;
        let omitSecond = false;

        for (let j = matchArr.length - 1; j >= 0; j--) {
          if (matchArr[j][0].length == logEl.length) {
            if (matchArr[j][0] == logEl) {
              equalRows.push(matchArr[j][1]);
              omitFirst = true;
              omitSecond = true;
              counter++;
            }
          }
        }

       if (!omitFirst) {
          for (let i = mut2.length - 1; i >= 0; i--) {
            const mainFileEl = mut2[i];
            if (mainFileEl.length === logEl.length) {
              if (mainFileEl === logEl) {
                equalRows.push(i);
                matchArr.push([logEl, i]);          
                omitSecond = true;
                counter++;
                break;
              }
            }
            counter++;
          }

          if(!omitSecond){
            let compare = noName.find(el => el==logEl);
            if(!compare){
                noName.push(logEl);
                notConvertedCounter++;
            }
            equalRows.push(99999)
            counter++
          }
        }
       
      });
      
      //**Log info */
      console.log(notConvertedCounter,'list of false loop')
      console.log(counter, "row counter");
      console.log(noName,'no name list');
      
      this.sendDataToAngular(this.menageData(equalRows,contentOptions, counter,notConvertedCounter));
      setTimeout(() => {
        this.waitingToEnd = false;
      }, 5000);
    }); 
  }

  private menageData(listOfRows: number[],contentOptions: PickedOptions, counter: number,notConvertedCounter:number) {
    const original3 = storageService.load(LoadFile.patternFile).original;
    let  original:string[] = [];

    

    if(!contentOptions.sorting){
      original = storageService.load(LoadFile.secondFile).original;
    }else{
      original = storageService.load(LoadFile.secondFile).originalSorted
    }


    

    let dataArray = [];
    let secondArray = [];
    let memoryLast = 999998;

    for (let i = 0; i < listOfRows.length; i++) {
     
      //** For not translated text give german equivalents*/
      let translated = '';
      if(listOfRows[i] == 99999){
        translated = original[i][3];
      }else{
        translated =  original3[listOfRows[i]][1];
      }

      let polishName =[];
      //**Basic version */
      if(!contentOptions.addGermanTranslation && !contentOptions.addAdditionalInfo){
            polishName = [
            original[i][0],
            original[i][4],
            translated
          ];         
      }
      //** Version with German translation */
      if(contentOptions.addGermanTranslation && !contentOptions.addAdditionalInfo){
        polishName = [
        original[i][0],
        original[i][4],
        translated,
        original[i][3]
        ];         
    }

    //** Additional information */
    if(!contentOptions.addGermanTranslation && contentOptions.addAdditionalInfo){
        polishName = [
        original[i][0],
        original[i][4],
        translated,
        original[i][1],
        original[i][2],
        original[i][5],
        original[i][6],       
        ];         
    }
        //** German + additional file info */
        if(contentOptions.addGermanTranslation && contentOptions.addAdditionalInfo){
            polishName = [
            original[i][0],
            original[i][4],
            translated,
            original[i][3],
            original[i][1],
            original[i][2],
            original[i][5],
            original[i][6],       
            ];         
        }

  
      //** To omit equals */
      if(contentOptions.omitRepeatedValues){
          if(memoryLast !== listOfRows[i]){
            secondArray.push(polishName);
          }
          memoryLast= listOfRows[i];

      }else{
          secondArray.push(polishName)
      }
    }


    let dataToFile = openFileService.mapFile(secondArray);
    openFileService
      .generateCsvFile(dataToFile)
      .then(done => {
        const pathToNewFile = openFileService.pathToNewFile;
        comService.send(
          ComList.infoMessage_4,
          `Plik został utworzony ścieżka do niego to: ${pathToNewFile}, liczba operacji to ${this.adjNumberLook(counter)}, nie przetlumaczono ${notConvertedCounter} pozycji`
        );
      })
      .catch(e => console.log(e.message));
    return dataArray;
  }

  private adjNumberLook(value:number):string{
      let strNumber = value.toString();
      let helpArr =[]
      for(let i=strNumber.length-1, counter =1;i>=0;i--){
          helpArr.push(strNumber[i])
          if(counter ===3){
              helpArr.push('_')
              counter=0;

          }
          counter++;

      }
    return helpArr.reverse().toString().replace(/\,/g,'');
  }
}
