export interface datareturn {
    success: boolean,
    total: number,
    income: number,
    outcome: number,
}

export interface datareturnmessage {
    success: boolean,
    message: string,
}

export interface datatableincomeoutcome {
    category: string,
    amount: number,
    type: string,
    source: string,
    date: Date,
    _id: string
}

export interface datachart {
    category: string,
    income: number,
    outcome: number,
    _id: string
}

export interface datareturntrackincomeoutcome {
    success: boolean,
    data: [datatableincomeoutcome]
}

export interface datareturnchart {
    success: boolean,
    data: [datachart]
}

export interface datacreate {
    loadingdata: boolean,
    loadingcreatedata: boolean,
    loadingincomeoutcome: boolean,
    loadingchart: boolean,
    incomechart: datachart[],
    outcomechart: datachart[],
    incometable: datatableincomeoutcome[],
    outcometable: datatableincomeoutcome[],
    income: number | null,
    outcome: number | null,
    reset : () => void,
    fetchdata: (
        id: string
    ) => Promise<void>,
    createdata: (
        id: string,
        type: string,
        amount: Number,
        category: string,
        source: string
    ) => Promise<datareturnmessage>,
    fetchdataincome: (
        id: string
    ) => Promise<void>,
    fetchdataoutcome: (
        id: string
    ) => Promise<void>,
    fetchchartincome: (
        id: string
    ) => Promise<void>,
    fetchchartoutcome: (
        id: string
    ) => Promise<void>,
}