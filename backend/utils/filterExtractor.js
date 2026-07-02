const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const filterExtractor = async (message) => {
    try {

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const prompt = `
            You are a real estate AI assistant.

            Your task:
            1. First detect user intent
            2. If user is greeting or casual talk (hello, hi, hey, how are you), return intent = "greeting"
            3. If user is asking for property search, return intent = "search"

            IMPORTANT RULES:
            - Return ONLY valid JSON
            - NO markdown
            - NO explanation
            - NO extra text

            OUTPUT FORMAT:

            If greeting:
            {
              "intent": "greeting"
            }

            If property search:
            {
              "intent": "search",
              "location": "",
              "category": "",
              "bedrooms": null,
              "bathrooms": null,
              "minPrice": null,
              "maxPrice": null,
              "area": null
            }

            User Message:
            ${message}
        `;

        const result = await model.generateContent(prompt);

        let text = result.response.text();

        console.log("RAW AI RESPONSE:", text);

        
        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        
        const match = text.match(/\{[\s\S]*\}/);

        if (!match) {
            throw new Error("No valid JSON found in AI response");
        }

        const filters = JSON.parse(match[0]);

        return filters;

    } catch (error) {
        console.error("filterExtractor Error (Using fallback parser):", error.message);

        
        const lower = message.toLowerCase();
        const filters = {
            intent: "search",
            location: "",
            category: "",
            bedrooms: null,
            bathrooms: null,
            minPrice: null,
            maxPrice: null,
            area: null
        };

        
        const locMatch = lower.match(/(?:in|at|near)\s+([a-z]+)/);
        if (locMatch) {
            const loc = locMatch[1];
            filters.location = loc.charAt(0).toUpperCase() + loc.slice(1);
        }

        // Category detection
        if (lower.includes("villa")) filters.category = "villa";
        else if (lower.includes("farm-house") || lower.includes("farmhouse")) filters.category = "Commercial";

        // Bedrooms detection
        const bedMatch = lower.match(/(\d+)\s*(?:bhk|bed|bedroom|room)/);
        if (bedMatch) {
            filters.bedrooms = parseInt(bedMatch[1]);
        }

        // Bathrooms detection
        const bathMatch = lower.match(/(\d+)\s*(?:bath|bathroom)/);
        if (bathMatch) {
            filters.bathrooms = parseInt(bathMatch[1]);
        }

        // Price detection: under/below/less than X Cr/Lakhs/M
        const priceLimitMatch = lower.match(/(?:under|below|less than|max|budget)\s*(?:rs\.?|₹)?\s*(\d+(?:\.\d+)?)\s*(cr|crore|lakh|lakhs|l|m|million)?/);
        if (priceLimitMatch) {
            let value = parseFloat(priceLimitMatch[1]);
            const unit = priceLimitMatch[2];
            if (unit === "cr" || unit === "crore") {
                value = value * 10000000;
            } else if (unit === "lakh" || unit === "lakhs" || unit === "l") {
                value = value * 100000;
            } else if (unit === "m" || unit === "million") {
                value = value * 1000000;
            }
            filters.maxPrice = value;
        }

        return filters;
    }
};

module.exports = filterExtractor;