/**
 * intentService.js
 *
 * Uses Gemini to detect the admin's intent from their message + conversation history.
 * Returns a structured JSON object so aiAdminService.js can route to the right action.
 *
 * Returns:
 * {
 *   intent: string,           // e.g. "CREATE_PROPERTY", "GET_STATS", etc.
 *   entities: object,         // extracted values from the message
 *   confidence: number,       // 0-1
 *   rawText: string           // the original message (pass-through)
 * }
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// All supported intents the system can handle
const INTENT_LIST = `
CREATE_PROPERTY     - Admin wants to add/create a new property listing
UPDATE_PROPERTY     - Admin wants to edit/update an existing property
DELETE_PROPERTY     - Admin wants to remove/delete a property
GET_PROPERTIES      - Admin wants to search, list, or find properties
GET_STATS           - Admin wants dashboard statistics (counts, totals, averages)
GET_INQUIRIES       - Admin wants to view inquiries (today's, pending, all)
DELETE_INQUIRY      - Admin wants to delete an inquiry
UPDATE_INQUIRY      - Admin wants to update inquiry status (mark completed, contacted)
GET_USERS           - Admin wants to list or search users
DELETE_USER         - Admin wants to delete a user
UPDATE_USER         - Admin wants to update user role or status
GENERATE_SEO        - Admin wants to generate SEO content for a property
GENERATE_DESCRIPTION - Admin wants to generate a property description
GENERATE_SOCIAL     - Admin wants to generate Instagram/Facebook/LinkedIn/Email content
ANALYZE_IMAGE       - Admin wants to analyze an uploaded property image
DUPLICATE_PROPERTY  - Admin wants to duplicate/clone a property
CHANGE_STATUS       - Admin wants to change a property's status (available/booked/sold)
GENERAL_CHAT        - Greetings, general questions, help requests, unclear intent
`.trim();

const SYSTEM_PROMPT = `
You are an intent classifier for a Real Estate Admin Panel AI Assistant.

Your job: analyze the admin's message and extract the intent and any entities mentioned.

Available intents:
${INTENT_LIST}

Rules:
1. Always respond with ONLY a valid JSON object — no markdown, no explanation.
2. Extract as many entities as possible from the message.
3. Common entity keys: title, price, location, category, bedrooms, bathrooms, area, description, status, propertyId, userId, inquiryId, unitCount.
4. If the message is part of a multi-turn conversation (e.g. admin is answering "Palm Residency" after being asked "What is the title?"), set intent to "COLLECT_DATA" and put the value in entities.collectedValue.
5. Price can be in formats like "2.5 crore", "50 lakh", "25 lakhs" — keep as string in entities.priceRaw.
6. Category examples: Villa, Apartment, Plot, Commercial, Flat, Bungalow, Shop.
7. Confidence should be between 0.0 and 1.0.

Response format (strict JSON):
{
  "intent": "INTENT_NAME",
  "entities": { ... },
  "confidence": 0.95
}
`.trim();

const parsePrice = (raw) => {
    if (!raw) return null;
    if (typeof raw === "number") return raw;
    const str = String(raw).toLowerCase().replace(/,/g, "");
    const num = parseFloat(str);
    if (str.includes("crore") || str.includes("cr")) return Math.round(num * 10000000);
    if (str.includes("lakh") || str.includes("lac")) return Math.round(num * 100000);
    if (str.includes("k")) return Math.round(num * 1000);
    return Math.round(num) || null;
};

/**
 * Detect intent from admin's message.
 *
 * @param {string} message - The current user message
 * @param {Array}  history - Previous conversation turns [{role, parts}]
 * @returns {Promise<{intent, entities, confidence, rawText}>}
 */
const detectIntent = async (message, history = []) => {
    const lowerMsg = message.toLowerCase().trim();

    // ── LOCAL REGEX FALLBACK DETECTOR (Prevents rate-limit quota exhaustion) ──
    const getLocalIntent = () => {
        // Delete Property
        if ((lowerMsg.includes("delete") || lowerMsg.includes("remove")) && (lowerMsg.includes("property") || lowerMsg.includes("villa") || lowerMsg.includes("listing"))) {
            const idMatch = message.match(/([a-f\d]{24})/i);
            const titleMatch = message.match(/(?:delete|remove)\s+(?:a\s+)?(?:property|villa|listing)\s+(.+)/i);
            return {
                intent: "DELETE_PROPERTY",
                entities: idMatch ? { propertyId: idMatch[1] } : (titleMatch ? { title: titleMatch[1].trim() } : {})
            };
        }
        // Create Property (Flexible paragraph analyzer for direct input)
        if (lowerMsg.includes("create") || lowerMsg.includes("add property") || lowerMsg.includes("new property") || lowerMsg.includes("add villa") || 
            (lowerMsg.includes("bedroom") && lowerMsg.includes("bathroom") && (lowerMsg.includes("sqft") || lowerMsg.includes("price")))) {
            
            const entities = {};
            const categories = ["villa", "apartment", "flat", "plot", "bungalow", "commercial", "shop"];
            const foundCat = categories.find(cat => lowerMsg.includes(cat));
            if (foundCat) entities.category = foundCat;

            // Title / Name extraction
            const titleMatch = message.match(/(?:name|title)\s*:\s*(.+?)(?=\s*(?:and\s+)?(?:location|price|unit|sqft|bedroom|bathroom|:|,|$))/i);
            if (titleMatch) {
                entities.title = titleMatch[1].trim();
            } else {
                const locMatch = message.match(/(?:villa|property|apartment|flat|plot|bungalow|shop) in ([a-zA-Z\s]+)/i);
                if (locMatch) entities.title = `Premium ${foundCat || "Property"} in ${locMatch[1].trim()}`;
            }

            // Location extraction
            const locMatch = message.match(/location\s*:\s*([a-zA-Z\s]+)/i) || message.match(/in\s+([a-zA-Z\s]+)(?:,|\s|$)/i);
            if (locMatch) entities.location = locMatch[1].trim();

            // Price extraction
            const priceMatch = message.match(/price\s*(?::)?\s*([\d\.]+\s*(?:crore|cr|lakh|lac|k|million|thousand)?)/i);
            if (priceMatch) {
                entities.priceRaw = priceMatch[1].trim();
                entities.price = parsePrice(entities.priceRaw);
            }

            // Bedrooms extraction
            const bedMatch = message.match(/(\d+)\s*(?:bedroom|bhk)/i);
            if (bedMatch) entities.bedrooms = parseInt(bedMatch[1]);

            // Bathrooms extraction
            const bathMatch = message.match(/(\d+)\s*(?:bathroom|bath)/i);
            if (bathMatch) entities.bathrooms = parseInt(bathMatch[1]);

            // Area extraction
            const areaMatch = message.match(/(\d+)\s*(?:sqft|sq\.ft|square feet)/i);
            if (areaMatch) entities.area = parseInt(areaMatch[1]);

            // Unit count extraction
            const unitMatch = message.match(/(\d+)\s*(?:unit|room)/i);
            if (unitMatch) entities.unitCount = parseInt(unitMatch[1]);

            return {
                intent: "CREATE_PROPERTY",
                entities
            };
        }
        // Dashboard Stats
        if (lowerMsg.includes("stat") || lowerMsg.includes("revenue") || lowerMsg.includes("how many") || lowerMsg.includes("expensive") || lowerMsg.includes("average price")) {
            return { intent: "GET_STATS", entities: {} };
        }
        // Inquiries
        if (lowerMsg.includes("inquir") || lowerMsg.includes("lead")) {
            let status = undefined;
            if (lowerMsg.includes("pend")) status = "pending";
            if (lowerMsg.includes("complet") || lowerMsg.includes("close")) status = "closed";

            // Check for delete inquiry
            if (lowerMsg.includes("delete") || lowerMsg.includes("remove")) {
                const idMatch = message.match(/([a-f\d]{24})/i);
                return {
                    intent: "DELETE_INQUIRY",
                    entities: idMatch ? { inquiryId: idMatch[1] } : {}
                };
            }

            return { intent: "GET_INQUIRIES", entities: { status } };
        }
        // Users
        if (lowerMsg.includes("user") || lowerMsg.includes("member") || lowerMsg.includes("custom")) {
            return { intent: "GET_USERS", entities: {} };
        }
        // Get Properties (e.g. "show properties", "available properties", "list properties")
        if (lowerMsg.includes("propert") || lowerMsg.includes("villa") || lowerMsg.includes("apartment") || lowerMsg.includes("flat") || lowerMsg.includes("bungalow") || lowerMsg.includes("shop")) {
            if (lowerMsg.includes("show") || lowerMsg.includes("list") || lowerMsg.includes("get") || lowerMsg.includes("find") || lowerMsg.includes("view") || lowerMsg.includes("all") || lowerMsg.includes("avail") || lowerMsg.includes("book") || lowerMsg.includes("sold")) {
                let status = undefined;
                if (lowerMsg.includes("avail")) status = "available";
                if (lowerMsg.includes("book")) status = "booked";
                if (lowerMsg.includes("sold")) status = "sold";
                return { 
                    intent: "GET_PROPERTIES", 
                    entities: status ? { status } : {} 
                };
            }
        }
        // Generate SEO, Description, or Social Posts
        if (lowerMsg.includes("seo") || lowerMsg.includes("meta")) {
            return { intent: "GENERATE_SEO", entities: {} };
        }
        if (lowerMsg.includes("social") || lowerMsg.includes("instagram") || lowerMsg.includes("caption") || lowerMsg.includes("facebook") || lowerMsg.includes("post")) {
            return { intent: "GENERATE_SOCIAL", entities: {} };
        }
        if (lowerMsg.includes("description") || lowerMsg.includes("describe")) {
            return { intent: "GENERATE_DESCRIPTION", entities: {} };
        }
        return null;
    };

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Build context from last 6 turns (to keep token usage low for intent detection)
        const recentHistory = history.slice(-6);
        const contextText = recentHistory.length > 0
            ? recentHistory
                .map(h => `${h.role === "user" ? "Admin" : "AI"}: ${h.parts[0].text}`)
                .join("\n")
            : "";

        const prompt = contextText
            ? `${SYSTEM_PROMPT}\n\nRecent conversation:\n${contextText}\n\nAdmin's new message: "${message}"\n\nJSON:`
            : `${SYSTEM_PROMPT}\n\nAdmin's message: "${message}"\n\nJSON:`;

        const result = await model.generateContent(prompt);
        const raw = result.response.text().trim();

        // Strip any accidental markdown code fences
        const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const parsed = JSON.parse(cleaned);

        return {
            intent: parsed.intent || "GENERAL_CHAT",
            entities: parsed.entities || {},
            confidence: parsed.confidence || 0.5,
            rawText: message,
        };

    } catch (err) {
        console.warn("[IntentService] Rate limit or error hit. Falling back to local Regex parser:", err.message);
        
        const local = getLocalIntent();
        if (local) {
            return {
                intent: local.intent,
                entities: local.entities,
                confidence: 0.9,
                rawText: message
            };
        }

        // Fallback to GENERAL_CHAT
        return {
            intent: "GENERAL_CHAT",
            entities: {},
            confidence: 0.0,
            rawText: message,
        };
    }
};

module.exports = { detectIntent };
