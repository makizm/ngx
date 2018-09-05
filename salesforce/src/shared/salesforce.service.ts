import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { SalesforceConfig } from './salesforce.config';

import { OAuthToken, SfUser, SfVersion } from './models';

import { of, Observable } from 'rxjs';
import { map, tap, catchError, flatMap, scan } from 'rxjs/operators';

const ORIGIN = window.location.origin;

@Injectable()
export class SalesforceService {
	public config: SalesforceConfig;
	
	private _token: OAuthToken;
	private _headers: { [name:string]: string | string[]; };

	constructor(private _http: HttpClient) {
		// Init
		if(!this.config) {
			console.log("Initializing Salesforce service (NEW)")
			
			// create new config
			this.config = new SalesforceConfig();

			// Set default values
			// Saleseforce app cliend id value
			this.config.clientId = "3MVG9uGEVv_svxtKyCx2iULL9qwew4bZLhX.q8MyKAiA32Ve8ZF1mUjGeHsj6rxbGvtlD2W3uon9.X7WCtL_n";
			
			// Saleseforce app client secret
			this.config.clientSecret = "7994396398493863850";

			// Salesforce login redirect url
			// must match app configured value(s)
			this.config.redirectUrl = ORIGIN + "/login/callback";

			// Default headers values
			this._headers = {
				'content-type': 'application/json'
			}

			if(!this._token) {
				// Retrieve from cookie
				this.token = this._getTokenFromCookie();
			}
		} else {
			console.log("Salesforce already initialized, using exisitng config");
			console.log(this.config);
			console.log(this.token);
		}
	}

	public get token() {
		return this._token;
	}

	public set token(newToken: OAuthToken) {
		console.log("Saving token");

		this._token = newToken;

		this._headers["authorization"] = "Bearer " + newToken.value;
		
		console.log(this._token);
		console.log(this._headers);

		// TO DO: save as a cookie
	}

	private _getTokenFromCookie(): OAuthToken {
		let token = new OAuthToken();

		console.log("Cookie token found!")

		token.value = "00D1J000000kbl5!ARcAQDKNE2CjGcTgU7nLaRfFJOotfyqC6SBhTtspaYbrARVoD4xAw4NNpt.8.hs6vgOPXVqA9dcFZFHE0wBiqre0tU9qjEPJ",
		token.ttl = 0
		token.issuedAt = 1533066634832
		token.id = "https://login.salesforce.com/id/00D1J000000kbl5UAA/0051J000005snV5QAI"
		token.instance = "https://na74.salesforce.com"

		// TO DO: Check if token is still valid

		return token;
	}

	private _handleResponseError() {
		// code 401, send to login page
	}

	/**
	 * Creates proxy url to be processed by backend web server service. 
	 * Browsers do not allow cross-origin resource sharing (CORS)
	 * @param url Destination url
	 * @return Resulting proxy url http://<server>:<port>/api/proxy/<encoded destination url>
	 */
	MakeProxyUrl(url: string): string {
		// THIS DOES NOT WORK!!!
		console.log("Encoded URL: " + encodeURIComponent(url))
		return ORIGIN + "/api/proxy/" + encodeURIComponent(url);
	}

	GetAvailApiVersions() {
		let url = this.MakeProxyUrl(this._token.instance + '/services/data/');

		let headers = new HttpHeaders(this._headers);

		return this._http.get<SfVersion[]>(url, { headers: headers });
	}

	/**
	 * Execute a SOQL Query
	 * https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_query.htm
	 */
	ExecQuery(query: string) {
		let queryPath = this.config.queryPath + "/?q=";

		let url = this.MakeProxyUrl(this._token.instance + queryPath + query);

		console.log("Using url: " + url)

		let headers = new HttpHeaders(this._headers)

		return this._http.get(url, { headers: headers })
			.pipe(
				catchError(err => {
					// err: HttpErrorResponse

					let resp = {
						code: err['status'],
						message: err['statusText']
					}

					return of(resp)
				})
			)
	}

	/**
	 * Queries Salesforce for more information about currently authenticated user
	 */
	GetLoggedInUserInfo() {
		let url = this.MakeProxyUrl(this._token.id);

		let headers = new HttpHeaders(this._headers)

		return this._http.get(url, { headers: headers })
			.pipe(map(res => SfUser.fromResponse(res)))
	}

	/**
	 * OAuth2 - Step 2. Requests authentication token using login code
	 * @param code Login code value from OAuth Step 1
	 */
	OAuth2GetToken(code: string) {
		
		let url = ORIGIN + '/api/token';

		let data = {
			'response_type': 'authorization_code',
			'client_id': this.config.clientId,
			'client_secret': this.config.clientSecret,
			'redirect_uri': this.config.redirectUrl,
			'reqUrl': this.config.tokenUrl,
			'code': code
		}

		let headers = new HttpHeaders({'content-type': 'application/json'})

		return this._http.post(url, data, { headers: headers })
			.pipe(
				map(res => OAuthToken.fromResponse(res)),
				tap(token => this.token = token)	// save token
			)
	}
}


// errors
// id: invalid_grant
// msg: expired authorization code
// 