import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InfoComponent } from './components/info/info.component';
import { FormsModule }   from '@angular/forms';
//import { IpcService } from './services/ipc.service';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent

  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
