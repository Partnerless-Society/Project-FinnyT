export interface servicereturn {
    success: boolean,
    message: string
}

export interface servicedata {
    _id: string,
    email: string,
    date: Date
}

export interface serviceurl {
    success: boolean,
    url: string[]
}

export interface servicefetchreturn {
    success: boolean,
    data: servicedata
}

export interface servicecreate {
    servicedata: servicedata | null
    loadingservice: boolean,
    loadingfetch: boolean,
    loadingurl: boolean,
    url: string[],
    resetservice: () => void,
    testconnection: (
        id: string,
        email: string,
        key: string
    ) => Promise<servicereturn>,
    servicefetch: (
        id: string
    ) => Promise<void>,
    addurl: (
        id: string,
        url: string
    ) => Promise<servicereturn>,
    fetchurl: (
        id: string
    ) => Promise<void>,
    Servicedelete : (
        id : string
    ) => Promise<servicereturn>
}