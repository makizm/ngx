import { Component, OnInit } from '@angular/core';
import { WaterValve } from '../models';

@Component({
	selector: 'nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

	public collapsed:boolean = true;

	private valve:WaterValve = new WaterValve;

	constructor() { }

	ngOnInit() { }

	public toggleMenu() {
		this.collapsed = !this.collapsed;
	}

}