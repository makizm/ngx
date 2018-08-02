import { NgModule } from '@angular/core';
// import { CommonModule }  from '@angular/common';

import { SensorGagueComponent } from './sensorGauge';

const NGA_COMPONENTS = [
    SensorGagueComponent
]

@NgModule({
  declarations: [
    ...NGA_COMPONENTS
  ],
  imports: [
    // GoogleChartModule
  ],
  exports: [
    ...NGA_COMPONENTS
  ],
  // entryComponents: [],
  providers: [  ]
})
export class ControlsModule { }
