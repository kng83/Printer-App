import { MenuItem, MenuItemConstructorOptions, BrowserWindow, dialog, ipcMain } from 'electron';
import { openFileService, comService, storageService } from '../Services/service_list.service';
import { ComList, LoadFile } from '../Interfaces/main_lists';



comService.on(ComList.sendToElectron, (event, content) => {
  console.log(content);
})

export const template: MenuItemConstructorOptions[] = [//
  {
    label: 'File',
    submenu: [
    //  { role: 'services', type: 'normal', label: 'Open File...', click: () => openFileService.getData(LoadFile.firstFile, storageService) },
      { role: 'services', type: 'normal', label: 'Open Second File...', click: () => openFileService.getData(LoadFile.secondFile, storageService) }]
  }
]