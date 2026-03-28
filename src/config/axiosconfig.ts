import axios from "axios";

export const Server = axios.create({
    url : "",
    withCredentials : true
})