import axios from "axios";

export const fbGraphApi = axios.create({
    baseURL: 'https://graph.facebook.com/v19.0',
    withCredentials: false,
});
