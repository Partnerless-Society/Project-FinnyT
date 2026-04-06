import axios from "axios";

//Server Backend Configure
export const Server = axios.create({
    baseURL : "https://finnyt-server.vercel.app",
    withCredentials : true
})