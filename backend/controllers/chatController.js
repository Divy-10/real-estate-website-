const aiService = require("../services/aiService");
const propertySearch = require("../services/propertySearch");
const responseService = require("../services/responseService");

const chat = async (req, res) => {
    try {

        const { message } = req.body;

        if (!message || message.trim() === "") {
            return res.status(400).json({ message: "Message required" });
        }

        const lowerMsg = message.toLowerCase();

       
        const greetings = ["hi","hii", "hello", "hey", "good morning", "good evening"];

        if (greetings.includes(lowerMsg.trim())) {
            return res.json({
                success: true,
                message: "Hello  I am your real estate assistant. Tell me your property requirements.",
                properties: []
            });
        }

        
        const filters = await aiService(message);

        console.log("AI OUTPUT:", filters);

        const properties = await propertySearch(filters);

        const response = responseService(properties);

        res.json(response);

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

module.exports = {
    chat,
};