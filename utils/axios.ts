import axios from "axios";

// const baseUrl = "http://192.168.1.71:3000/api/v1"
const baseUrl = "https://nomnom-backend.vercel.app/api/v1"

const axiosInstance = axios.create({
    baseURL: baseUrl
});

export default axiosInstance;