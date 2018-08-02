import { Component, OnInit } from '@angular/core';

import { PieChartConfig, GooglePieChartService } from './services';
import { GoogleGaugeChartService, GaugeChartConfig } from './services/googleChart/charts/gauge';

import { EarthSensorService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ GooglePieChartService, GoogleGaugeChartService, EarthSensorService ]
})
export class AppComponent implements OnInit {
  title = 'app';

  data1: any[];
	config1: PieChartConfig;
  elementId1: String;
  
  value2: number = 15;
  config2: GaugeChartConfig;

  constructor(private _ess: EarthSensorService) {}

  ngOnInit() {
    this.data1 = [['Task', 'Hours per Day'],
			['Eat',      3],
			['Commute',  2],
			['Watch TV', 5],
			['Video games', 4],
      ['Sleep',    10]];

		this.config1 = new PieChartConfig('My Daily Activities at 20 years old', 0.4);
    this.elementId1 = 'myPieChart1';
    
    this.config2 = new GaugeChartConfig();

    this.config2.yellowColor = '#FA8072';
    this.config2.yellowFrom = 0;
    this.config2.yellowTo = 60;

    this.config2.greenColor = '#40e0d0';
    this.config2.greenFrom = 60;
    this.config2.greenTo = 100;

    this.config2.style = 'dark';

    this._ess.connect().subscribe(value => {
      console.log('Got socket.io data!');
      console.log(value);

      this.value2 = value['a1'] || 0;
    })

    // setInterval(() => {
      
    //   let newVal = this.value2;
    //   ++newVal

    //   if (newVal === 100) newVal = 0;

    //   this.value2 = newVal;

    //   console.log(this.value2)
    // },1000)
  }
}
