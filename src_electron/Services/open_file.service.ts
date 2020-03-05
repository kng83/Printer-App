import { dialog} from 'electron';
import * as fs from 'fs';
import * as util from 'util';
import * as csvParse from 'csv-parse'
import {comService} from './service_list.service';
import { ComList, LoadFile } from '../Interfaces/main_lists';
import { StorageService } from './storage.service';
import *as path from 'path';
import {serve} from '../main';


//** Service for file open and data get */
export class OpenFileService {

    filePath: string;
    pathToNewFile:string;
    originalDataRecord:string[][];
    originalDataRecord2:string[][];
    mutData:string[];
    mutData2:string[];
    dataFileReadOk:boolean = false;

    private async getFilePath(): Promise<string> {
        try {
            let dataFromFile = await dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'log', extensions: ['csv','txt'] }] })
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
            csvParse(data,{columns:false,skip_lines_with_error:true},(err,record)=>{
                resolve(record);
                reject(err);
            })
        })
    }
    private convertRecord2(data:string[][]):string[]{
              return  data.map(element=> element[0].trim())           

    }

    private convertRecord(data:string[][]):string[]{
        return data.map((element)=> {
            //    console.log(element);
                const len = element[3].length;
                let elementInPickedColumn='';
                if(element[3].slice(0,4)=="<AB>"){
                     elementInPickedColumn = element[3].slice(4,len);
                }
                else{
                    elementInPickedColumn = element[3];
                }
                   return elementInPickedColumn.trim();
     
        });
    }

    public getData(key:string,store:StorageService) {
        return this.getDataFromFile().then(data => {
             this.convertCsvToArray(data).then(record => {
                 console.log(record.length,'length of log record');
                this.originalDataRecord = [...record];

                //** This is mut record with trim etc.. */
                this.mutData =  this.convertRecord(this.originalDataRecord);
                store.save(key,{original:this.originalDataRecord,mut:this.mutData});

                //**!!!!!!!!!! Na razie wyslij info stad */

                comService.send<string>(ComList.infoMessage_2,`Plik został zaladowny i sciezka to ${this.filePath}`);//
             

                }).catch(e => console.log(e.message,'getData'));
      
        }).catch(console.log)//
    }

    private async getDataDirect(): Promise<Buffer> {
        try {
            let pathToFile  = path.join(__dirname,"../../src/assets/data.csv")
            if(!serve){
                pathToFile = path.join(__dirname,"../../dist/Printer-App/assets/data.csv")
            }
           
            const readFile = util.promisify(fs.readFile);
            let data = await readFile(pathToFile)
            return data;

        } catch (e) {
            return e
        }
    }
    public getDataDirectFromFile(key:string,store:StorageService){
        this.getDataDirect().then(data=>{
            this.convertCsvToArray(data).then(record => {
               this.originalDataRecord2 = [...record];

               //** This is mut record with trim etc.. */
               this.mutData2 =  this.convertRecord2(this.originalDataRecord2);

               store.save(key,{original:this.originalDataRecord2,mut:this.mutData2});

               }).catch(e => console.log(e.message));
        })
        
        .catch(e =>console.log(e.message))
        
    }
    public mapFile(data:string[][]){
        return data.map(row => row.join(', ')).join('\n')
    }
    public generateCsvFile(data:string){
        let fileNamePosition = this.filePath.lastIndexOf('\\');
        let pathToDir = this.filePath.slice(0,fileNamePosition);
        let csvFile = util.promisify(fs.writeFile);
        this.pathToNewFile = path.join(pathToDir,'out_data.txt')
        return csvFile(this.pathToNewFile,data)
    }


}