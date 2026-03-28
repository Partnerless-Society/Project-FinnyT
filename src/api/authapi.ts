import { Server } from "@/config/axiosconfig";
import type { authreturn } from "@/types/authtype";

export const authapi = {
    //Signup
    usersignup: async (
        name: string,
        email: string,
        password: string,
        type: string,
    ): Promise<authreturn> => {
        const response = await Server.post("/api/signup", {
            name,
            email,
            password,
            type
        })
        return response.data
    },
    //Login
    userlogin: async (
        email: string,
        password: string
    ): Promise<authreturn> => {
        const response = await Server.post("/api/login", {
            email,
            password
        })
        return response.data;
    }
}