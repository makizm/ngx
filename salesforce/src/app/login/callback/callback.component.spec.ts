import { TestBed, inject } from '@angular/core/testing';

import { CallbackComponent } from './callback.component';

describe('a callback component', () => {
	let component: CallbackComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CallbackComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([CallbackComponent], (CallbackComponent) => {
		component = CallbackComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});