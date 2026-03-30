import { Server } from "@/config/axiosconfig"
import type { datareturn } from "@/types/datatype"

export const dataapi = {
    fetchdata : async (id : string) : Promise<datareturn> => {
        const response = await Server.get("/data/api/dashboarddata" , {
            params : {
                id
            }
        })
        return response.data
    }
}