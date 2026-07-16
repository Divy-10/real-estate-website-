const User = require("../models/User");
const jwt = require("jsonwebtoken");
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

        // 1. Authenticate user optionally
        let userId = null;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
                userId = decoded.id;
            } catch (err) {
                console.warn("[ChatController] Optional JWT decoding failed:", err.message);
            }
        }

        // 2. Greetings
        const greetings = ["hi", "hii", "hello", "hey", "good morning", "good evening"];
        if (greetings.includes(lowerMsg.trim())) {
            return res.json({
                success: true,
                message: "Hello! I am your real estate assistant. Tell me your property requirements.",
                properties: []
            });
        }

        // 3. Favorites Check
        const isFavoritesQuery = lowerMsg.includes("favourite") || lowerMsg.includes("favorite") || lowerMsg.includes("saved property") || lowerMsg.includes("saved properties");
        if (isFavoritesQuery) {
            if (!userId) {
                return res.json({
                    success: false,
                    message: "Please log in to view your favourite properties.",
                    count: 0,
                    properties: []
                });
            }

            const user = await User.findById(userId).populate("favorites");
            if (!user) {
                return res.json({
                    success: false,
                    message: "User not found. Please log in again.",
                    count: 0,
                    properties: []
                });
            }

            const favorites = user.favorites || [];
            if (favorites.length === 0) {
                return res.json({
                    success: true,
                    message: "You haven't added any properties to your favourites yet.",
                    count: 0,
                    properties: []
                });
            }

            return res.json({
                success: true,
                message: `Here are your favourite properties:`,
                count: favorites.length,
                properties: favorites
            });
        }

        // 4. Default Search Flow
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