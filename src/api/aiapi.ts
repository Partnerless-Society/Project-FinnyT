import { Server } from "@/config/axiosconfig"
import type { aiagent, aitype } from "@/types/aitype";

export const aiapi = {
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
    aiagent : async (
        form : FormData
    ) : Promise<aiagent> => {
        const response = await Server.post("/ai/api/aiagent", form);
        return response.data;
    }
}