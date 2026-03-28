import axios from "axios";

export const Server = axios.create({
    baseURL : "http://localhost:4000",
    withCredentials : true
})