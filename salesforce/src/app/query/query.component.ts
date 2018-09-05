import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { QueryValidator } from './query.formvalidator';

import { SalesforceService, GlobalState } from '../../shared';

import { SfVersion } from '../../shared/models';

@Component({
	selector: 'query',
	templateUrl: './query.component.html',
	styleUrls: ['./query.component.scss']
})

export class QueryComponent implements OnInit {

	public instanceUrl: string;

	public queryUrl: string;

	public errorMsg: string;

	// store server response as raw text
	public responseRaw: Object;

	// search query value from input form
	public queryValue: string = "";

	// for storing query history attempts
	// value - user entered search string
	// success - was the query run successful
	public queryHistory: Array<{ value: string, success: boolean }> = [];

	// store api versions for user selection
	public apiVersions: SfVersion[] = [];

	public queryForm = new FormGroup({
		queryInput: new FormControl('', [
			Validators.required,
			QueryValidator.validateCharacters
		]),
		apiVersion: new FormControl('')
	})

	constructor(private _salesforce: SalesforceService, private _state: GlobalState) {
		this.instanceUrl = this._salesforce.token.instance || null;

		this._state.notify({ name: 'page', value: 'query' });

		// this.queryUrl = this.instanceUrl + this._salesforce.config.queryPath + "/?q="
	}

	private _setQueryUrl(ver: SfVersion) {
		console.log("Setting api version to " + ver.version)

		this.queryUrl = this.instanceUrl + ver.url + "/?q=";
	}

	ngOnInit() {
		console.log(this._salesforce.token)

		if(!this.instanceUrl) {
			// not authenticated
			// redirect to login page
			this.errorMsg = "You're not authenticated to Salesforce. Redirecting to login page...";

			setTimeout(() => {
				// window.location.href = "/login"
			}, 3000);
		}

		this._salesforce.GetAvailApiVersions()
			.subscribe(vers => {
				vers.sort();
				vers.reverse();

				this.apiVersions = vers;

				// set default version to most recent
				this._setQueryUrl(vers[0])
				this.queryForm.setValue({ apiVersion: vers[0], queryInput: '' })
			})

		this.queryForm.valueChanges
			.subscribe(val => {
				let query = val['queryInput'] || null;
				let version = val['apiVersion'] || null;

				if(version) {
					this._setQueryUrl(version);
				}

				if(query) {
					if(this.queryForm.invalid) {
						let errors = this.queryForm.controls.queryInput.errors;
						
						// check if form validation detected invalid character
						if(errors['invalid_characters']) {
							let char = errors['invalid_characters'][0];

							switch(char) {
								case '\n':
									char = "Line feed";
									break;
								case '\r':
									char = "Carriage return";
									break;
								case ' ':
									char = "Space";
									break;
								case '\t':
									char = "Tab";
									break;
							}

							this.errorMsg = char + " is not a valid character";
						} else {
							// some other form input error
							this.errorMsg = "Invalid input";
						}
					} else {
						// update query value for display
						this.queryValue = query;
					}
				}
			})
	}

	private _jPretty(match, pIndent, pKey, pVal, pEnd) {
		var key = '<span class=text-danger>';
		var val = '<span class=text-primary>';
		var str = '<span class=text-secondary>';

		var r = pIndent || '';

		if (pKey)
		   r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';

		if (pVal)
		   r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';

		return r + (pEnd || '');
	}

	Submit() {
		// grab current query input value
		let query = this.queryForm.value.queryInput;

		
		this._salesforce.ExecQuery(query)
			.subscribe(res => {
				if(res['code'] == 400) {
					// got error 400
					this.queryHistory.push({ value: query, success: false });
				} else if (res['code'] == 401) {
					// not authenticated
					this.queryHistory.push({ value: query, success: false });

					this.errorMsg = "401 Must be logged in to Salesforce. Redirecting to login page...";

					// redirect to login page
					setTimeout(() => {
						window.location.href = "/login";
					}, 3000);
				} else {
					this.queryHistory.push({ value: query, success: true });
				}

				this.responseRaw = res;
			})
	}

	public get response(): string {
		let out = "";

		if(this.responseRaw) {
			out = JSON.stringify(this.responseRaw)
		}

		return out;
	}

	public get responseHtml(): string {
		let out = "";

		if(this.responseRaw) {
			var jsonLineRegex = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;

			out = JSON.stringify(this.responseRaw, null, 3)
				// make the output pretty HTML formatted
				.replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
				.replace(/</g, '&lt;').replace(/>/g, '&gt;')
				.replace(jsonLineRegex, this._jPretty)
		}

		return out;
	}

	DissmissAlert(event?: any): void {
		this.errorMsg = null;
	}

	SetSearchValue(index: number): void {
		let item = this.queryHistory[index];

		// note current api version value to retain it
		let apiVer = this.queryForm.value.apiVersion;

		if(item) this.queryForm.setValue({ queryInput: item.value, apiVersion: apiVer })
	}

	// TO DO: process paged responses
	// nextRecordsUrl: value
}