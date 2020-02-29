import {OpenFileService} from '../Services/open_file.service';
import { ComService } from './com.service';
import { StorageService } from './storage.service';
import { SearchService } from './search.service';

export const openFileService =  new OpenFileService();
export const comService = new ComService();
export const storageService = new StorageService();
export const searchService = new SearchService();