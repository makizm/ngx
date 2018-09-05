import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

import { PbArticle } from '../../../../pinkbike/article';

@Component({
	selector: 'post-list',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostComponent implements OnInit {

	@Input() data: PbArticle[];
	@Output() open: EventEmitter<PbArticle> = new EventEmitter();

	constructor() { }

	ngOnInit() {
		
	}

	openArticle(article: PbArticle) {
		this.open.emit(article);
	}
}