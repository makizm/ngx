import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { GoogleGaugeChartService } from './gauge.service';
import { GaugeChartConfig } from './gauge.config';

declare var google: any;

declare var $: any;

@Component({
  selector: 'gchart-gauge',
  templateUrl: './gauge.html'
})
export class GaugeChartComponent implements OnInit {

    // @Input() value: number;
    private _value: number;

    @Input() config: GaugeChartConfig;
    @Input() id: string;

    constructor(private _pieChartService: GoogleGaugeChartService) {}

    @Input()
    set value(value: number) {

        // on new value redraw the chart
        if(value != this._value) {
            this.drawChart(value);
        }

        // update stored value
        this._value = value;
    }
    get value() {
        return this._value;
    }

    ngOnInit() {
        this.drawChart();
    }

    drawChart(newValue?: number) {
        let value = newValue || this._value;

        this._pieChartService.BuildChart(this.id, value, this.config);
    }

}
