import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { SalesforceService, GlobalState } from '../shared';
import { QueryComponent } from './query/query.component';
import { HomeComponent } from './home';
import { SetupComponent } from './setup';

@NgModule({
  declarations: [
    AppComponent,
    QueryComponent,
    HomeComponent,
    SetupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRouting,
    ReactiveFormsModule
  ],
  providers: [
    // change url from http://<server>/#/ to http://<server>/
    // salesforce does not like # in the url when redirecting during authentication
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    SalesforceService,
    GlobalState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
