import { Server } from "@/config/axiosconfig"
import type { servicefetchreturn, servicereturn, serviceurl } from "@/types/servicetype"

export const serviceapi = {
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
    fetchurl: async (
        id: string
    ): Promise<serviceurl> => {
        const response = await Server.get("/service/api/fetchurl", {
            params: {
                id
            }
        });
        return response.data;
    }
}