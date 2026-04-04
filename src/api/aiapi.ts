import { Server } from "@/config/axiosconfig"
import type { aiagent, aitype } from "@/types/aitype";

export const aiapi = {
    //Analyse Ai
    aianalyse : async (
        total : number,
        income : number , 
        outcome : number ,
        net : number
    ) : Promise<aitype> => {
       const response = await Server.post("/ai/api/aianalyse" , {
         total,
         income,
         outcome,
         net
       });
       return response.data
    },
    //Aiagent To See Photo And Input Data
    aiagent : async (
        form : FormData
    ) : Promise<aiagent> => {
        const response = await Server.post("/ai/api/aiagent", form);
        return response.data;
    },
    //GoogleSheetAgent
    aiagentsheetcreate : async (
        id : string,
        url : string,
        prompt : string
    ) : Promise<aiagent> => {
        const response = await Server.post("/ai/api/aiagentsheet",{
            id,
            url,
            prompt
        })
        return response.data;
    },
    aiagentsheetupdate : async (
        id : string,
        url : string,
        prompt : string,
        row? : number,
        col? : number
    ) : Promise<aiagent> => {
        const response  = await Server.post("/ai/api/aiagentsheetupdate",{
            id,
            url,
            prompt,
            row,
            col
        })
        return response.data
    },
    aiagentsheetdelete : async (
        id : string,
        url : string,
        prompt : string,
        row? : number,
        col? : number
    ) : Promise<aiagent> => {
        const response  = await Server.post("/ai/api/aiagentsheetdelete",{
            id,
            url,
            prompt,
            row,
            col
        })
        return response.data
    }
}