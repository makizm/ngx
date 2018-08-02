import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { 
    GooglePieChartService, PieChartComponent,
    // GoogleGaugeChartService, GaugeChartComponent
} from './charts';

import { GoogleGaugeChartService, GaugeChartComponent } from './charts/gauge';

const NGA_DECLARATIONS = [
    PieChartComponent,
    GaugeChartComponent
]

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...NGA_DECLARATIONS
    ],
    exports: [
        ...NGA_DECLARATIONS
    ],
    providers: [
        GooglePieChartService,
        GoogleGaugeChartService
    ]
  })
  export class GoogleChartModule {}