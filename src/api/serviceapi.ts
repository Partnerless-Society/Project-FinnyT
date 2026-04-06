import { Server } from "@/config/axiosconfig"
import type { servicefetchreturn, servicereturn, serviceurl } from "@/types/servicetype"

export const serviceapi = {
    //ServiceAcc test
    testconnection: async (
        id: string,
        email: string,
        key: string
    ): Promise<servicereturn> => {
        const response = await Server.post("/service/api/test", {
            id,
            email,
            key
        })
        return response.data
    },
    //Fetch Service Acc Lists
    fetchserviceacc: async (
        id: string
    ): Promise<servicefetchreturn> => {
        const response = await Server.get("/service/api/fetch", {
            params: {
                id
            }
        })
        return response.data;
    },
    //Add Googlesheet url to allow ai agent to edit
    addurl: async (
        id: string,
        url: string
    ): Promise<servicereturn> => {
        const response = await Server.post("/service/api/addurl", {
            id,
            url
        });
        return response.data;
    },
    //Fetch Googlesheeturl
    fetchurl: async (
        id: string
    ): Promise<serviceurl> => {
        const response = await Server.get("/service/api/fetchurl", {
            params: {
                id
            }
        });
        return response.data;
    },
    Serviceacdelete : async (
        id : string
    ) : Promise<servicereturn> => {
        const response = await Server.post("/service/api/servicedelete",{
            id
        })
        return response.data;
    }
}