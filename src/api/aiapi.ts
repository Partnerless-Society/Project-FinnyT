import { Server } from "@/config/axiosconfig"
import type { aitype } from "@/types/aitype";

export const aiapi = {
    aianalyse : async (
        total : number , 
        income : number , 
        outcome : number
    ) : Promise<aitype> => {
       const response = await Server.post("/ai/api/aianalyse" , {
         total,
         income,
         outcome
       });
       return response.data
    }
}