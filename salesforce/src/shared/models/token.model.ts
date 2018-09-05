export class OAuthToken {
    constructor()
    constructor(
        value?: string,
        ttl?: number,
        issuedAt?: number,
        id?: string,
        instance?: string,
        scope?: string
    )
    constructor(
        public value?: string,
        public ttl?: number,
        public issuedAt?: number,
        public id?: string,
        public instance?: string,
        public scope?: string
        
    ){
        this.value = value || null;
        this.ttl = ttl || null;
        this.issuedAt = issuedAt || null;
        this.id = id || null;
        this.instance = instance || null;
        this.scope = scope || null;
    }

    public static fromResponse(res: any) {
        // Reference doc
        // https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_understanding_web_server_oauth_flow.htm
        
        // access_token <- this is the value
        // id <- URL that can be used in an HTTP request to get more information about the end user
        // id_token <- ?
        // instance_url <- Identifies the Salesforce instance to which API calls should be sent
        // issued_at <- number of seconds since the Unix epoch 
        // scope <- ?
        // signature <- Base64-encoded HMAC-SHA256 signature signed with the client_secret. Don't care
        // token_type <- Bearer

        let token = new OAuthToken();

        if(typeof res == 'object') {
            console.log("This is object!")
        }

        if(res) {
            token.value = res['access_token'];
            token.ttl = 0;  // needs to be calculated for cookie lifetime
            token.id = res['id'];
            token.instance = res['instance_url'];
            token.scope = res['scope'];
            token.issuedAt = res['issued_at'];
        }

        return token;
    }
}
