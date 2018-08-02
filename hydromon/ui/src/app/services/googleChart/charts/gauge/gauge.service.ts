import { Injectable } from '@angular/core';

import { GoogleChartsBaseService, GoogleChartWrapperOptions } from '../../googleChartBase.service';
import { GaugeChartConfig } from './gauge.config';
import { GoogleGaugeStyleDark } from './gauge.styles';

declare var google: any;

@Injectable()
export class GoogleGaugeChartService extends GoogleChartsBaseService {

  constructor() {
    super();
  }

  public BuildChart(elementId: string, value: number, config: GaugeChartConfig): void {

    let data = [['Label', 'Value'],['%', value]];
    
    let options = new GoogleChartWrapperOptions;
        options.chartType = "Gauge";
        options.dataTable = data;
        options.containerId = elementId;

    if(config.style == 'dark') {
        console.log("Setting style to dark");
        
        options.addListener(GoogleGaugeStyleDark);
    }

    // "style" is not a Google Gauge chart option
    // so remove it before loading the chart
    delete config.style

    // pass along user defined chart options
    options.options = config;

    // draw chart
    this.buildFromWrapper(options)
  }
}
