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

export interface MonthlyReport  {
  month: number;     
  year: number;     
  income: number;
  outcome: number;
  total: number;
  networth: number;
};

export interface analyticreturn  {
  success: boolean;
  data: MonthlyReport[];
};

export interface yearreturn {
    success : boolean,
    years : number[]
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
    monthlyreport : MonthlyReport[],
    years : number[],
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
    fetchyears : (
        id : string
    ) => Promise<void>,
    fetchmonthlyreport : (
        id : string,
        year : number
    ) => Promise<void>
}