import axios from "axios";

const API_URL = "http://localhost:5009/api/chat";

export const sendMessage = async (message) => {
    const res = await axios.post(API_URL, {
        message,
    });

    return res.data;
};