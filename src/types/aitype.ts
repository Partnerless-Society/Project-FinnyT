export interface aitype {
    success : boolean,
    data : string
}

export interface aiagent{
    success : boolean,
    message : string,
    aireply : string
}

export interface aicreate {
    loadingai : boolean,
    loadingagent : boolean,
    loadingagentsheet : boolean,
    Aianalyse : (
        total : number,
        income : number,
        outcome : number,
        net : number
    ) => Promise<aitype>,
    Aiagent : (
        form : FormData
    ) => Promise<aiagent>,
    Aiagentsheetcreate : (
        id : string,
        url : string,
        prompt : string
    ) => Promise<aiagent>,
    Aiagentsheetupdate : (
        id : string,
        url : string,
        prompt : string,
        row? : number,
        col? : number
    ) => Promise<aiagent>,
    Aiagentsheetdelete : (
        id : string,
        url : string,
        prompt : string,
        row? : number,
        col? : number
    ) => Promise<aiagent>
}