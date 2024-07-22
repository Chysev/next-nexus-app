import axios from "axios";
axios.defaults.withCredentials = true;

const Axios = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
