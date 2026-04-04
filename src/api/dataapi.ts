import { Server } from "@/config/axiosconfig"
import type { analyticreturn, datareturn, datareturnchart, datareturnmessage, datareturntrackincomeoutcome, yearreturn } from "@/types/datatype"

export const dataapi = {
    //Fetch
    fetchdata: async (
        id: string
    ): Promise<datareturn> => {
        const response = await Server.get("/data/api/dashboarddata", {
            params: {
                id
            }
        })
        return response.data
    },
    //Create Data
    datacreate: async (
        id: string,
        type: string,
        amount: Number,
        category: string,
        source: string
    ): Promise<datareturnmessage> => {
        const response = await Server.post("/data/api/create", {
            id,
            type,
            amount,
            category,
            source
        })
        return response.data;
    },
    //Track
    fetchtrackincome: async (
        id: string
    ): Promise<datareturntrackincomeoutcome> => {
        const response = await Server.get("/data/api/fetchtrackincome", {
            params: {
                id
            }
        })
        return response.data
    },
    fetchtrackoutcome: async (
        id: string
    ): Promise<datareturntrackincomeoutcome> => {
        const response = await Server.get("/data/api/fetchtrackoutcome", {
            params: {
                id
            }
        })
        return response.data
    },
    //Piechart data
    fetchchartincome : async (
        id : string
    ) : Promise<datareturnchart> => {
        const response = await Server.get("/data/api/fetchchartincome",{
            params : {
                id
            }
        })
        return response.data
    },
    fetchchartoutcome : async (
        id : string
    ) : Promise<datareturnchart> => {
        const response = await Server.get("/data/api/fetchchartoutcome",{
            params : {
                id
            }
        })
        return response.data
    },
    //AnalyticsChart
    fetchyears : async (
        id : string
    ) : Promise<yearreturn> => {
        const response = await Server.get("/data/api/getyears", {
            params : {
                id
            }
        })
        return response.data;
    },
    fetchanalyticschart : async (
        id : string,
        year : number
    ) : Promise<analyticreturn> => {
        const response = await Server.get("/data/api/getmonthlydatas",{
            params : {
                id,
                year
            }
        })
        return response.data;
    }
}