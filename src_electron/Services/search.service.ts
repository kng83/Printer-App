import {
  comService,
  storageService,
  openFileService
} from "./service_list.service";
import { ComList, LoadFile } from "../Interfaces/main_lists";


export class SearchService {
  waitingToEnd = false;
  constructor() {
    this.onSearchStarted();
  }

  private sendDataToAngular(dataArray: string[][]) {
    comService.send(ComList.sendDataRows, dataArray);
  }

  onSearchStarted() {
    comService.on(ComList.sendColumnsInfo, (event, content) => {
      if (this.waitingToEnd) return 0;

      this.waitingToEnd = true;
      const mut2: string[] = storageService.load(LoadFile.firstFile).mut;
      const mut: string[] = storageService.load(LoadFile.secondFile).mut;
      const equalRows: number[] = [];
      const matchArr: [string, number][] = [["", 0]];
      let counter = 0;

      mut.forEach((logEl, index) => {
        let omit = false;
        for (let j = matchArr.length - 1; j >= 0; j--) {
          if (matchArr[j][0].length == logEl.length) {
            if (matchArr[j][0] == logEl) {
              equalRows.push(matchArr[j][1]);
              omit = true;
              counter++;
            }
          }
        }
        if (!omit) {
          for (let i = mut2.length - 1; i >= 0; i--) {
            const mainFileEl = mut2[i];
            if (mainFileEl.length == logEl.length) {
              if (mainFileEl == logEl) {
                equalRows.push(i);
                matchArr.push([logEl, i]);
                counter++;
                break;
              }
            }
            counter++;
          }
        }
      });
      console.log(counter, "row count");
      this.sendDataToAngular(this.menageData(equalRows, counter));
      setTimeout(() => {
        this.waitingToEnd = false;
      }, 5000);
    }); //
  }

  private menageData(listOfRows: number[], counter: number) {
    const original2 = storageService.load(LoadFile.firstFile).original;
    const original = storageService.load(LoadFile.secondFile).original;

    let dataArray = [];
    for (let i = 0; i < 10; i++) {
      //  const time = original2[listOfRows[]]
      const polishName = [
        original[i][0],
        original[i][4],
        original2[listOfRows[i]][1],
        original[i][1],
        original[i][5]
      ];
      dataArray.push(polishName);
    }
    let secondArray = [];
    for (let i = 0; i < listOfRows.length; i++) {
      //  const time = original2[listOfRows[]]
      const polishName = [
        original[i][0],
        original[i][4],
        original2[listOfRows[i]][1],
        original[i][1],
        original[i][5]
      ];
      secondArray.push(polishName);
    }
    let dataToFile = openFileService.mapFile(secondArray);
    openFileService
      .generateCsvFile(dataToFile)
      .then(done => {
        const pathToNewFile = openFileService.pathToNewFile;
        comService.send(
          ComList.infoMessage_4,
          `Plik został utworzony ścieżka do niego to: ${pathToNewFile}, liczba operacji to ${counter}`
        );
      })
      .catch(e => console.log(e.message));
    return dataArray;
  }
}
