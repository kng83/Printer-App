import { dialog} from 'electron';
import * as fs from 'fs';
import * as util from 'util';
import * as csvParse from 'csv-parse'
import {comService} from './service_list.service';
import { ComList, LoadFile } from '../Interfaces/main_lists';
import { StorageService } from './storage.service';


//** Service for file open and data get */
export class OpenFileService {

    filePath: string;
    originalDataRecord:string[][];
    mutData:string[][];
    dataFileReadOk:boolean = false;

    private async getFilePath(): Promise<string> {
        try {
            let dataFromFile = await dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'CSV', extensions: ['csv'] }] })
            this.filePath = dataFromFile.filePaths[0];
            return this.filePath;
        } catch (e) {
            return e
        }

    }

    private async getDataFromFile(): Promise<Buffer> {
        try {
            let pathToFile  = await this.getFilePath();
            const readFile = util.promisify(fs.readFile);
            let data = await readFile(pathToFile)
            return data;

        } catch (e) {
            return e
        }
    }

   private async convertCsvToArray(data:Buffer):Promise<string[][]>{
        return new Promise((resolve,reject)=>{
            csvParse(data,{columns:false},(err,record)=>{
                resolve(record);
                reject(err);
            })
        })
    }
    private convertRecord(data:string[][]):string[][]{
        return data.map((strArr)=> {
              return  strArr.map(element=> element.trim())           
        });
    }

    public getData(key:string,store:StorageService) {
        this.dataFileReadOk = false;
        return this.getDataFromFile().then(data => {
             this.convertCsvToArray(data).then(record => {
                this.originalDataRecord = record;

                //** This is mut record with trim etc.. */
                this.mutData =  this.convertRecord(this.originalDataRecord);
                this.dataFileReadOk = true;

                store.save(key,{original:this.originalDataRecord,mut:this.mutData});

                //**!!!!!!!!!! Na razie wyslij info stad */
                if(key === LoadFile.firstFile ){
                    comService.send<string>(ComList.infoMessage_1,`Plik pierwszy zaladowny i sciezka to ${this.filePath}`);
                }

                if(key === LoadFile.secondFile){
                    comService.send<string>(ComList.infoMessage_2,`Plik drugi zaladowny i sciezka to ${this.filePath}`);
                }

                }).catch(e => console.log(e.message));
      
        }).catch(console.log)
    }


}