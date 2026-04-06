import { Server } from "@/config/axiosconfig";
import type { authreturn, authuserinfo, googleuser } from "@/types/authtype";
import axios from "axios";
import type { TokenResponse } from "@react-oauth/google";

export const authapi = {
     googletoken: async (response: TokenResponse) : Promise<googleuser> => {
        const res = await axios.get<googleuser>("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${response.access_token}`
            }
        })
        return res.data;
    },
    usergooglelogin : async (
        name : string,
        email : string,
    ) : Promise<authreturn> => {
        const response = await Server.post("/user/api/googlelogin",{
            name,
            email
        })
        return response.data;
    },
    //Signup
    usersignup: async (
        name: string,
        email: string,
        password: string,
        confirmpassword: string
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
    },
    userfetch: async (): Promise<authuserinfo> => {
        const response = await Server.get("/user/api/userinfo");
        return response.data;
    },
    userlogout: async (): Promise<authreturn> => {
        const response = await Server.post("/user/api/logout");
        return response.data;
    },
    supportmessage : async (
        name : string,
        email : string,
        message : string
    ) : Promise<authreturn> => {
        const response = await Server.post("/user/api/support" , {
            name,
            email,
            message
        });
        return response.data;
    }
}