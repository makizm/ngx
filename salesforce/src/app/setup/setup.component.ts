import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SalesforceService, GlobalState } from '../../shared';
import { SfVersion, SalesforceConfig } from '../../shared';

@Component({
	selector: 'setup',
	templateUrl: './setup.component.html',
	styleUrls: ['./setup.component.scss']
})

export class SetupComponent implements OnInit {

	public config: SalesforceConfig;

	public setupForm = new FormGroup({
		redirectUrl: new FormControl({ value: '', disabled: true }),
		clientId: new FormControl(''),
		clientSecret: new FormControl(''),
		apiVers: new FormControl('')
	});

	constructor(private _state: GlobalState, private _salesforce: SalesforceService) {
		this._state.notify({ name: 'page', value: 'setup' });

		this.config = this._salesforce.config;

		// fill values based on existing config
		this.setupForm.patchValue({
			redirectUrl: this.config.redirectUrl,
			clientId: this.config.clientId,
			clientSecret: this.config.clientSecret,
			apiVers: this.config.apiVers
		})
	}

	ngOnInit() { }

	save() {
		let newConfig = this.config;

		Object.keys(this.setupForm.value).map(key => {
			newConfig[key] = this.setupForm.value[key];
		})

		this.config = newConfig;
		this._salesforce.config = newConfig;

		console.log(this._salesforce.config)
	}
}