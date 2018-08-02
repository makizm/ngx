import { TestBed, inject } from '@angular/core/testing';

import { SensorGagueComponent } from './sensorGague.component';

describe('a sensorGague component', () => {
	let component: SensorGagueComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SensorGagueComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([SensorGagueComponent], (SensorGagueComponent) => {
		component = SensorGagueComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});