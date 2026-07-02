import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5009/api",
});

export default API;