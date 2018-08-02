import { TestBed, inject } from '@angular/core/testing';

import { PostComponent } from './post.component';

describe('a post component', () => {
	let component: PostComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				PostComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([PostComponent], (PostComponent) => {
		component = PostComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});