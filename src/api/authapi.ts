import { Server } from "@/config/axiosconfig";
import type { authreturn } from "@/types/authtype";

export const authapi = {
    //Signup
    usersignup: async (
        name: string,
        email: string,
        password: string,
        confirmpassword : string
    ): Promise<authreturn> => {
        const response = await Server.post("/user/api/signup", {
            name,
            email,
            password,
            confirmpassword
        })
        return response.data
    },
    //Login
    userlogin: async (
        email: string,
        password: string
    ): Promise<authreturn> => {
        const response = await Server.post("/user/api/login", {
            email,
            password
        })
        return response.data;
    }
}