import { TestBed, inject } from '@angular/core/testing';

import { QueryComponent } from './query.component';

describe('a query component', () => {
	let component: QueryComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				QueryComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([QueryComponent], (QueryComponent) => {
		component = QueryComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});