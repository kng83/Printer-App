import { dialog, OpenDialogReturnValue } from 'electron';
import * as fs from 'fs';
import * as util from 'util';
import * as csvParse from 'csv-parse'
import { ElementSchemaRegistry } from '@angular/compiler';

//** Service for file open and data get */
export class OpenFileService {

    filePath: string;
    originalDataRecord:string[];
    mutData:string[];
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

   private async convertCsvToArray(data:Buffer):Promise<string[]>{
        return new Promise((resolve,reject)=>{
            csvParse(data,{columns:false},(err,record)=>{
                resolve(record);
                reject(err);
            })
        })
    }
    private convertRecord(data:string[]):string[]{
        return data.map((element)=> element.trim())
    }

    public getData() {
        this.dataFileReadOk = false;
        return this.getDataFromFile().then(data => {
             this.convertCsvToArray(data).then(record => {
                 this.originalDataRecord = record;
                 this.dataFileReadOk = true;

                 console.log(record[1])
                 console.log(this.convertRecord(this.originalDataRecord)[1])
                }).catch(e => console.log(e.message));
      
        }).catch(console.log)
    }


}