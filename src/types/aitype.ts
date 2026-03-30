export interface aitype {
    success : boolean,
    data : string
}

export interface aicreate {
    loadingai : boolean,
    Aianalyse : (
        total : number,
        income : number,
        outcome : number
    ) => Promise<aitype>
}