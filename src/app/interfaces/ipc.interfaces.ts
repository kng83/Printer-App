

// angular electron data exchange

export interface IpcChannel extends String{
  channel:string
}

export interface IpcData {
 [key: string]: any ;
 }