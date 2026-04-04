import axios from "axios";

//Server Backend Configure
export const Server = axios.create({
    baseURL : "http://localhost:4000",
    withCredentials : true
})