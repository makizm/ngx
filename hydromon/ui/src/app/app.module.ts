import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { AppRoutes } from './app.routing';
// import { NavComponent } from './nav';
import { NavModule } from './nav';
import { ControlsModule } from './controls';
import { GoogleChartModule } from './services';

const NGA_COMPONENTS = [
  
]

const NGA_SERVICES = []

@NgModule({
  declarations: [
    AppComponent,
    ...NGA_COMPONENTS
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AppRoutes,
    ControlsModule,
    GoogleChartModule,
    NavModule
  ],
  // entryComponents: [],
  providers: [
    ...NGA_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
