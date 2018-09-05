import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

import { SalesforceService, SalesforceConfig, GlobalState } from '../../shared';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent {

	public loginForm = new FormGroup({
		username: new FormControl('', [
			Validators.required,
			Validators.email
		])
	});

	private _config: SalesforceConfig;

	constructor(private _salesforce: SalesforceService, private _state: GlobalState) {
		this._config = this._salesforce.config;

		this._state.notify({ name: 'page', value: 'login' });
	}
	
	login() {
		// response example
		// code value will expire after 15 minutes and can only be used to
		// request auth token
		// https://www.mysite.com/authcode_callback?code=aWekysIEeqM9PiT

		console.log("Redirecting to Salesforce site for login")
		console.log(this.loginForm.value)

		let login = this.loginForm.value.username;

		let params = new HttpParams()
			.set("response_type", "code")	// must be code
			.append("client_id", this._config.clientId)	// Salesforce app consumer key
			.append("redirect_uri", this._config.redirectUrl)	// must match url configured in Salesforce
			.append("login_hint", login)	// login to prepupolate on redirect

		console.log(params)

		let loginUrl = this._config.loginUrl + "?" + params.toString();

		console.log("Login url " + loginUrl)

		// Redirect to Salesforce login page.
		// After successfuly login client will be redirected back to callback page
		window.location.href = loginUrl;
	}
}
