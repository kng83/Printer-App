import { dialog, OpenDialogReturnValue } from 'electron';
import * as fs from 'fs';
import * as util from 'util';
import { MainError } from '../Interfaces/main_interface';

//** Service for file open and data get */
export class OpenFileService {

    filePath: string;

    async getFilePath(): Promise<string | MainError> {
        try {
            let dataFromFile = await dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'CSV', extensions: ['csv'] }] })
            this.filePath = dataFromFile.filePaths[0];
            return this.filePath;
        } catch (e) {
            return {err:true, message: e.message}
        }

    }

    async getDataFromFile(): Promise<string | MainError> {
        try {
            let pathToFile  = await this.getFilePath();
            if(typeof pathToFile !== "string") {
                return pathToFile;
            }

            const readFile = util.promisify(fs.readFile);
            let data = await readFile(pathToFile)
            return data.toString();

        } catch (e) {
            return {err:true, message: e.message}
        }
    }

    getData() {
        return this.getDataFromFile().then(data => console.log(data)).catch(console.log)
    }


}