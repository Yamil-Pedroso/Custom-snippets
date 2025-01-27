import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://custom-snippets.onrender.com/api/v1";
//axios.defaults.baseURL = "http://localhost:3010/api/v1";

// Interceptor para incluir el token en cada solicitud
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axios;

