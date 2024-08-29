import axios from "axios";
axios.defaults.withCredentials = true;

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "nexus-key": process.env.NEXT_PUBLIC_NEXUS_KEY,
  },
});

export default Axios;
