import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SalesforceService } from '../../../shared/salesforce.service';

@Component({
	selector: 'callback',
	templateUrl: './callback.component.html',
	styleUrls: ['./callback.component.scss']
})
// Step 1: On successful user login Salesforce will call this page
// providing authorization code which will expires after 15 minutes.
// You use the authorization code in the next step to get the access token
// 
// Step 2: Authorization code will be used to perform a request
// to supplied endpoint that passes in grant_type, client_id, client_secret, 
// and redirect_uri. The redirect_uri is the URI that Salesforce sends a callback to.
// Store the access token value as a cookie to use in all subsequent requests
//  
export class CallbackComponent implements OnInit {

	public code: string;

	public success: boolean = false;

	public responseMsg: string = "Will show login response here, promise!";

	constructor(private _route: ActivatedRoute, private _salesforce: SalesforceService) {

		this._route.queryParams.subscribe(
			params => {
				let code = params['code'] || null;
				let error = params['error'] || null;

				if(code) {
					this.responseMsg = "Got code " + code;
					this._getToken(code);

				} else if(error) {
					this.responseMsg = "Error: " + error;
					// error_description

					// OAUTH_APP_ACCESS_DENIED
					// add app running user Profile in the app Setup
					// Setup > Manage Apps > Connected Apps
					// click on the label of the app, then add your profile to the list
					// this control what users have access to the app

					// https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=3MVG9uGEVv_svxtKyCx2iULL9qwew4bZLhX.q8MyKAiA32Ve8ZF1mUjGeHsj6rxbGvtlD2W3uon9.X7WCtL_n&redirect_uri=http://localhost:4200/%23/login/callback
					// https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=3MVG9uGEVv_svxtKyCx2iULL9qwew4bZLhX.q8MyKAiA32Ve8ZF1mUjGeHsj6rxbGvtlD2W3uon9.X7WCtL_n&redirect_uri=http://localhost:4200/login/callback
				}
			}
		)
	}

	ngOnInit() { }

	private _getToken(code: string, ttl?: number): void {
		console.log("Got code: " + code)
		
		this._salesforce.OAuth2GetToken(code)
			.subscribe(res => {
				console.log(this._salesforce.token)

				this._salesforce.GetLoggedInUserInfo()
					.subscribe(res => {
						console.log(res)
						if(res) this.success = true;
					})
			})
	}
}