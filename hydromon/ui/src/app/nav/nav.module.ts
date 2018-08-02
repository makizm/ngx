import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavComponent } from './nav.component';
import { SliderComponent } from './slider/slider.component';
import { ButtonComponent } from './button/button.component';

import { WaterValveService } from '../services';

@NgModule({
  declarations: [
    SliderComponent,
    ButtonComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
      NavComponent
  ],
  // entryComponents: [],
  providers: [
    WaterValveService
  ]
})
export class NavModule { }
