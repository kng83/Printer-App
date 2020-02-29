import {MenuItem,MenuItemConstructorOptions, BrowserWindow, dialog,ipcMain } from 'electron';
import {openFileService, comService,storageService} from '../Services/service_list.service';
import { ComList, LoadFile } from '../Interfaces/main_lists';




function sendStuff(){
  comService.send(ComList.sendToAngular,{pies:"super pies"});
}


 comService.on(ComList.sendToElectron ,(event, content )=>{
   console.log(content);
 })

export  const template: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        { role: 'services', type: 'normal' ,label:'Open File...', click:()=>openFileService.getData(LoadFile.firstFile,storageService)},
        { role: 'services', type: 'normal' ,label:'Open Second File...', click:()=>openFileService.getData(LoadFile.secondFile,storageService)},
        { role: 'services', type: 'normal' ,label:'Send To', click:()=>sendStuff()},
        { role:'quit', type:'normal',label: 'Zamknij'}
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { type: 'separator' },
        { role: 'zoom' },
        { role: 'zoom' },
        { type: 'separator' },
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { role: 'close' }
      ]
    },
    {
      label: 'Connect',
      submenu: [
        {
        role: 'services',
        label:'Connection',
        click: (menuItem: MenuItem, browserWindow: BrowserWindow, event: KeyboardEvent) => {
          console.log('kot pressed',menuItem,browserWindow,event)}
        }
      ]
      
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async (menuItem: MenuItem, browserWindow: BrowserWindow, event: KeyboardEvent) => {
            const { shell } = require('electron')
            await shell.openExternal('https://electronjs.org')
          }
        }
      ]
    }
  ]