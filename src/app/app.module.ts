import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InfoComponent } from './components/info/info.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {CounterComponent} from './components/counter/counter.component';
import { MessageComponent } from './components/message/message.component';

//import { IpcService } from './services/ipc.service';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    CounterComponent,
    MessageComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
