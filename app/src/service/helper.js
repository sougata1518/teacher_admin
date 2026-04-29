import axios from 'axios';
import { getUserData } from '../localstorage';

export const BASE_URL = 'https://nebulose-yachty-yaritza.ngrok-free.dev';

export const publicAxios = axios.create({
    baseURL:BASE_URL,
    headers:{
        "ngrok-skip-browser-warning": "true"
    }
});

export const privateAxios = axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type':'application/json',
        "ngrok-skip-browser-warning": "true"
    }
});

privateAxios.interceptors.request.use(
    async config =>{
        const token = await getUserData("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)