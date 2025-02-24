import axios from 'axios'
import { BACKEND_URL } from '../config/envConstants';

const api = axios.create({
    baseURL : BACKEND_URL
})

let logoutUser = null;

export const passLogout = (logout) => {
    logoutUser = logout
}

api.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem('token');
        if(!config.url.includes('/api/auth/signup') && !config.url.includes('/api/auth/signin')) {
            if(token) {
            config.headers['Authorization'] = `Bearer ${token}`
            }
        }
        return config;
        },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    response => response,
    (error) =>{
        console.log(error)
        if(error.response.status === 401) {
            if(logoutUser) logoutUser();
        }

        return Promise.reject(error)
    }
)

  export default api;