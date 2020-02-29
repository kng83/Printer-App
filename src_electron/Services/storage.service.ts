
export class StorageService{

    mainMap:Map<string,any>
    constructor(){
        this.mainMap = new Map<string,any>();
    }

    save<T>(key:string,value:T){
        this.mainMap.set(key,value);
    }

    load<T>(key:string){
        return this.mainMap.get(key);
    }
}