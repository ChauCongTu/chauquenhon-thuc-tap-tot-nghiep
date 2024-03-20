import axios from "axios";
import { getCookie } from "./cookie";
import toast from "react-hot-toast";

const instance = axios.create({ baseURL: import.meta.env.VITE_API_URL, timeout: 5000, headers: { 'Content-Type': 'application/json' } });

instance.interceptors.request.use((config) => {
    const token = getCookie("ACCESS_TOKEN");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.request.use(
    (res) => res,
    (e) => {
        const message = e.response.data.message || "Contains a few errors";
        toast.error(message);
        return Promise.reject(message);
    }
);

export default instance;