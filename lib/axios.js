import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://mellow-gentleness-production.up.railway.app/api",
  withCredentials: true,
});

export default axiosInstance;