import { OAuthToken } from './models';

export class SalesforceConfig {
    constructor()
    constructor(
        loginUrl?: string,
        tokenUrl?: string,
        revokeUrl?: string,
        redirectUrl?: string,
        clientId?: string,
        clientSecret?: string,
        token?: OAuthToken,
        apiVers?: string,
        queryPath?: string,
    )
    constructor(
        public loginUrl?: string,
        public tokenUrl?: string,
        public revokeUrl?: string,
        public redirectUrl?: string,
        public clientId?: string,
        public clientSecret?: string,
        public token?: OAuthToken,
        public apiVers?: string,
        public queryPath?: string
    ) {

        //
        // api version
        this.apiVers = "v43.0";

        // error responses

        // Salesforce defaults
        // authentication
        this.loginUrl = loginUrl || "https://login.salesforce.com/services/oauth2/authorize";
        this.tokenUrl = tokenUrl || "https://login.salesforce.com/services/oauth2/token";
        this.revokeUrl = revokeUrl || "https://login.salesforce.com/services/oauth2/revoke";
        // other
        this.queryPath = `/services/data/${this.apiVers}/query`;

        // User defined
        this.clientId = clientId || null;
        this.clientSecret = clientSecret || null;
        this.redirectUrl = redirectUrl || null;
    }
}
