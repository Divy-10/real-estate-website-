import axios from "axios";
import { getBackendUrl } from "../utils/config";

const API_URL = getBackendUrl("/api/chat");

export const sendMessage = async (message) => {
    const res = await axios.post(API_URL, {
        message,
    });

    return res.data;
};