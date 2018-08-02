import { Component, Input, OnInit } from '@angular/core';

import { GooglePieChartService } from './pie.service';
import { PieChartConfig } from './pie.config';

declare var google: any;

@Component({
  selector: 'gchart-pie',
  templateUrl: './pie.html'
})
export class PieChartComponent implements OnInit {

    @Input() data: any[];
    @Input() config: PieChartConfig;
    @Input() id: string;

    constructor(private _pieChartService: GooglePieChartService) {}

    ngOnInit(): void {
        this._pieChartService.BuildPieChart(this.id, this.data, this.config); 
    }
}
