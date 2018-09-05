export class SfUser {
    constructor()
    constructor(
        id?: string,
        assertedUser?: boolean,
        orgId?: number,
        username?: string,
        nickName?: string,
        displayName?: string,
        email?: string,
        emailVerified?: boolean,
        firstName?: string,
        lastName?: string,
        timezone?: string,
        active?: boolean,
        userType?: string,
        lastModified?: Date,
        isAppInstalled?: boolean

    )
    constructor(
        public id?: string,
        public assertedUser?: boolean,
        public orgId?: number,
        public username?: string,
        public nickName?: string,
        public displayName?: string,
        public email?: string,
        public emailVerified?: boolean,
        public firstName?: string,
        public lastName?: string,
        public timezone?: string,
        public active?: boolean,
        public userType?: string,
        public lastModified?: Date,
        public isAppInstalled?: boolean
    ){
        
    }

    public static fromResponse(res: any) {
        // Reference doc
        // <TBD>

        let user = new SfUser();

        if(typeof res == 'object') {
            user.id = res['user_id'];
            user.assertedUser = (res['asserted_user']) ? true : false;
            user.orgId = res['organization_id'];
            user.username = res['username'];
            user.nickName = res['nick_name'];
            user.displayName = res['display_name'];
            user.email = res['email'];
            user.emailVerified = (res['email_verified']) ? true : false;
            user.firstName = res['first_name'];
            user.lastName = res['last_name'];
            user.timezone = res['timezone'];
            user.active = res['active'];
            user.userType = res['user_type'];
            user.lastModified = new Date(res['last_modified_date']);
            user.isAppInstalled = res['is_app_installed'];
        }

        return user;
    }
}
