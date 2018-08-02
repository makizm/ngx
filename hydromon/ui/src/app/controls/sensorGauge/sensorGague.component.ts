import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'sensor-gauge',
	templateUrl: './sensorGague.component.html',
	styleUrls: ['./sensorGague.component.css']
})

export class SensorGagueComponent implements OnInit {

	@Input() gClass: string;

	constructor() { }

	ngOnInit() { }
}