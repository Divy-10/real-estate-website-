import axios from "axios";
import { getBackendUrl } from "../utils/config";

const API_URL = getBackendUrl("/api/chat");

export const sendMessage = async (message) => {
    const token = localStorage.getItem("token");
    const headers = {};
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await axios.post(
        API_URL,
        { message },
        { headers }
    );

    return res.data;
};