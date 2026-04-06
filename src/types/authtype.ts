export interface authreturn {
    success: boolean,
    message: string
}

export interface authuserinfo {
    success: boolean,
    data: {
        id: string,
        name: string,
        email: string,
        type: string
    }
}

export interface googleuser {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale?: string;
}


export interface authcreate {
    loadingsignup: boolean,
    loadinglogin: boolean,
    loadinguser : boolean,
    loadinggoogle : boolean,
    loadingsupport : boolean,
    id : string | null,
    name : string | null,
    email : string | null,
    type : string | null,
    resetacc : () => void,
    googlelogin: (
        name: string,
        email: string,
    ) => Promise<authreturn>,
    usersignup: (
        name: string,
        email: string,
        password: string,
        confirmpassword: string) => Promise<authreturn>,
    userlogin: (
        email: string,
        password: string
    ) => Promise<authreturn>,
    userfetch: () => Promise<void>,
    userlogout : () => Promise<authreturn>,
    supportmessage : (
        name : string,
        email : string,
        message : string
    ) => Promise<authreturn>,
}