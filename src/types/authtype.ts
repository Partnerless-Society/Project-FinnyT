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

export interface authcreate {
    loadingsignup: boolean,
    loadinglogin: boolean,
    loadinguser : boolean,
    id : string | null,
    name : string | null,
    email : string | null,
    type : string | null,
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
    userlogout : () => Promise<authreturn>
}