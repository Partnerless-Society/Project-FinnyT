export interface datareturn {
    success: boolean,
    total: number,
    income: number,
    outcome: number
}

export interface datacreate {
    loadingdata : boolean,
    total : number | null,
    income : number | null,
    outcome : number | null,
    fetchdata : (id : string) => Promise<void>
}