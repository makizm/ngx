import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { NgxElectronModule } from 'ngx-electron';

import { AppComponent } from './app.component';

import { PostComponent } from './components/post';

import { ReversePipe } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    ReversePipe,
    PostComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
