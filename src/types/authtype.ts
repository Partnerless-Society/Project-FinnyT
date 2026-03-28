export interface authreturn {
    success: boolean,
    message: string
}

export interface authcreate {
    loadingsignup: boolean,
    loadinglogin : boolean,
    usersignup: (
        name: string,
        email: string,
        password: string,
        type: string) => Promise<authreturn>,
    userlogin: (
        email: string,
        password: string
    ) => Promise<authreturn>
}