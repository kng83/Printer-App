import { MenuItem, MenuItemConstructorOptions, BrowserWindow, dialog, ipcMain } from 'electron';
import { openFileService, comService, storageService } from '../Services/service_list.service';
import { ComList, LoadFile } from '../Interfaces/main_lists';



comService.on(ComList.sendToElectron, (event, content) => {
  console.log(content);
})

export const template: MenuItemConstructorOptions[] = [
  {
    label: 'Plik',
    submenu: [
    //  { role: 'services', type: 'normal', label: 'Otwórz plik', click: () => openFileService.getData(LoadFile.secondFile, storageService) },
      {role: 'about', type: 'normal', label: 'O aplikacji', click: () => console.log('about clicked')}
    ]
  }
]