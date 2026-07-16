/**
 * aiAdminService.js
 *
 * The brain of the Admin AI Assistant.
 *
 * Receives: { message, sessionId, imagePath, propertyMapPath }
 * Returns:  { reply, intent, data }
 *
 * IMPORTANT: All DB operations use the existing Mongoose models directly.
 *            We never call the property/inquiry/user HTTP routes from here.
 *            This avoids duplication and keeps everything DRY.
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Existing Models — reused, NOT duplicated
const Property = require("../models/property");
const Inquiry = require("../models/Inquiry");
const User = require("../models/User");

// New services
const conversationService = require("./conversationService");
const { detectIntent } = require("./intentService");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert a price string like "2.5 crore", "50 lakh" to a number.
 */
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
 * Generate a conversational reply using Gemini with full history context.
 */
const generateChat = async (systemContext, history, userMessage) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemContext }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am the Admin AI Assistant for this Real Estate platform. I will help manage properties, users, inquiries and generate content." }],
                },
                ...history,
            ],
        });
        const result = await chat.sendMessage(userMessage);
        return result.response.text();
    } catch (err) {
        console.warn("[aiAdminService] generateChat hit rate limits or error. Returning high-quality local fallback reply.", err.message);
        
        const msg = userMessage.toLowerCase();
        
        // Local Fallback for SEO Content Generation
        if (systemContext.includes("SEO content") || msg.includes("seo")) {
            const title = userMessage.match(/Property:\s*([^,]+)/)?.[1] || "Premium Property";
            const category = userMessage.match(/Category:\s*([^,]+)/)?.[1] || "Real Estate";
            const location = userMessage.match(/Location:\s*([^,]+)/)?.[1] || "India";
            const price = userMessage.match(/₹\s*(\d+)/)?.[1] || "Contact Agent";
            const bedrooms = userMessage.match(/(\d+)\s*BHK/)?.[1] || "";
            const area = userMessage.match(/(\d+)\s*sqft/)?.[1] || "";
            
            const formattedPrice = isNaN(price) ? price : `₹${Number(price).toLocaleString("en-IN")}`;
            const bhrStr = bedrooms ? `${bedrooms} BHK ` : "";
            
            return `✨ **SEO Content for ${title}** (Local Fallback Mode)

* **Title Tag**: Premium ${bhrStr}${category} for Sale in ${location} | ${title}
* **Meta Description**: Discover your dream home at ${title}, ${location}. A spacious ${area ? `${area} sqft ` : ""}${category} offering premium amenities, modern interiors, and a prime location. Contact us for details!
* **Keywords**: ${title.toLowerCase()}, ${category.toLowerCase()} ${location.toLowerCase()}, luxury property ${location.toLowerCase()}, buy ${category.toLowerCase()} in ${location.toLowerCase()}
* **URL Slug**: \`/properties/${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${location.toLowerCase().replace(/[^a-z0-9]+/g, "-")}\``;
        }

        // Local Fallback for Social Media Marketing Caption
        if (systemContext.includes("social media posts") || msg.includes("social") || msg.includes("instagram") || msg.includes("caption")) {
            const title = userMessage.match(/Property:\s*([^,]+)/)?.[1] || "Premium Property";
            const category = userMessage.match(/Category:\s*([^,]+)/)?.[1] || "Real Estate";
            const location = userMessage.match(/Location:\s*([^,]+)/)?.[1] || "India";
            const price = userMessage.match(/₹\s*(\d+)/)?.[1] || "Contact Agent";
            const bedrooms = userMessage.match(/(\d+)\s*BHK/)?.[1] || "";
            const area = userMessage.match(/(\d+)\s*sqft/)?.[1] || "";
            
            const formattedPrice = isNaN(price) ? price : `₹${Number(price).toLocaleString("en-IN")}`;
            const bhrStr = bedrooms ? `${bedrooms} BHK ` : "";

            return `📸 **Social Media Marketing Post for ${title}** (Local Fallback Mode)

🏡 **Luxurious ${bhrStr}${category} Available at ${title}, ${location}!** ✨

Looking for the perfect blend of modern comfort and elegant design? This stunning ${area ? `${area} sqft ` : ""}${category} is now available.

🌟 **Key Features:**
📍 Prime location in ${location}
🛋️ Spacious design with high-end fixtures
${area ? `📐 Size: ${area} sqft\n` : ""}${price ? `💰 Price: ${formattedPrice}\n` : ""}
📩 Send us a direct message (DM) or click the link in our bio for more details and to schedule a private tour! 

#RealEstateIndia #${location.replace(/\s+/g, "")}Properties #LuxuryLiving #DreamHome #PropertyForSale #${title.replace(/\s+/g, "")} #IndianRealEstate`;
        }

        if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
            return "Hello! I am your AI Admin Assistant. I'm currently running on a rate-limit safe local fallback. How can I help you manage listings, inquiries, or stats today?";
        }
        if (msg.includes("yes") || msg.includes("next") || msg.includes("done") || msg.includes("ok") || msg.includes("sure")) {
            return "Understood! Please tell me which specific action you would like to run (e.g., *'Delete property Palm Residency'*, *'Create a new property'*, or *'Show dashboard statistics'*).";
        }
        return "I received your command! I'm currently running in a rate-limit safe local fallback mode. Please specify the exact instruction (e.g., *'Delete property [Title/ID]'*, *'Show stats'*, or *'Show inquiries'*). What should I do next?";
    }
};

/**
 * Analyze an image using Gemini Vision.
 * Returns { description, quality, seoTitle, seoKeywords, metaDescription, brightness, blurDetected }
 */
const analyzeImageWithGemini = async (imagePath) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Read file as base64
        const imageData = fs.readFileSync(imagePath);
        const base64 = imageData.toString("base64");

        // Detect MIME type from extension
        const ext = imagePath.split(".").pop().toLowerCase();
        const mimeMap = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };
        const mimeType = mimeMap[ext] || "image/jpeg";

        const prompt = `You are a real estate property image analyst. Analyze this property image and respond with ONLY a valid JSON object (no markdown):
{
  "description": "A detailed, SEO-friendly property description based on the image (2-3 sentences)",
  "quality": "Excellent|Good|Average|Poor",
  "seoTitle": "An SEO-optimized property title based on what you see",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "metaDescription": "A compelling 150-character meta description for search engines",
  "brightness": "Bright|Normal|Dark",
  "blurDetected": false,
  "suggestions": "One tip to improve this photo for real estate marketing"
}`;

        const result = await model.generateContent([
            { inlineData: { data: base64, mimeType } },
            prompt,
        ]);

        const raw = result.response.text().trim();
        const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        return JSON.parse(cleaned);

    } catch (err) {
        console.error("[aiAdminService] Image analysis error:", err.message);
        return {
            description: "A beautiful property with modern architecture and premium amenities.",
            quality: "Good",
            seoTitle: "Premium Property Listing",
            seoKeywords: ["real estate", "property", "home", "buy", "investment"],
            metaDescription: "Explore this premium property listing available for sale.",
            brightness: "Normal",
            blurDetected: false,
            suggestions: "Use natural lighting for best results.",
        };
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// PROPERTY CREATION — Required fields & step collector
// ─────────────────────────────────────────────────────────────────────────────

const REQUIRED_FIELDS = ["title", "price", "location", "category", "bedrooms", "bathrooms", "area"];

/**
 * Returns the next required field that hasn't been collected yet.
 */
const getNextMissingField = (data) => {
    return REQUIRED_FIELDS.find(f => !data[f]);
};

/**
 * Ask the next question in the property creation flow.
 */
const getFieldQuestion = (field) => {
    const questions = {
        title: "What is the **Property Title**? (e.g. Palm Residency)",
        price: "What is the **Price**? (e.g. 2.5 Crore, 50 Lakh)",
        location: "What is the **Location / City**? (e.g. Surat, Ahmedabad)",
        category: "What is the **Category**?\n> Villa | Apartment | Flat | Plot | Bungalow | Commercial | Shop",
        bedrooms: "How many **Bedrooms**?",
        bathrooms: "How many **Bathrooms**?",
        area: "What is the **Area** in sqft? (e.g. 1200, 4500)",
    };
    return questions[field];
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SERVICE FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Process an admin message and return an AI response.
 *
 * @param {string} message        - Admin's text message
 * @param {string} sessionId      - Unique session ID for conversation memory
 * @param {string|null} imagePath - Path to uploaded cover image (Cloudinary URL or local)
 * @param {string|null} propertyMapPath - Path to uploaded property map
 * @returns {Promise<{reply, intent, data}>}
 */
const processAdminMessage = async (message, sessionId, imagePath = null, propertyMapPath = null) => {

    const history = conversationService.getHistory(sessionId);
    const pendingIntent = conversationService.getPendingIntent(sessionId);
    const pendingData = conversationService.getPendingProperty(sessionId);

    let reply = "";
    let intent = "GENERAL_CHAT";
    let data = null;

    try {

        // ── HANDLE IMAGE UPLOAD ───────────────────────────────────────────────
        if (imagePath) {
            // Store image in pending property
            conversationService.updatePendingProperty(sessionId, { image: imagePath });

            // Generate detailed real estate description using collected property details
            const details = conversationService.getPendingProperty(sessionId);
            let aiDescription = "";
            let aiSeoTitle = "";
            let aiSeoKeywords = [];
            let aiMetaDescription = "";

            try {
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
                const prompt = `You are a real estate copywriter. Generate professional description and SEO metadata for this property listing.
Property Details:
- Title: ${details.title || "Premium Property"}
- Category: ${details.category || "Residential"}
- Location: ${details.location || "India"}
- Price: ${details.priceRaw || details.price || "Contact Agent"}
- Bedrooms: ${details.bedrooms || "N/A"}
- Bathrooms: ${details.bathrooms || "N/A"}
- Area: ${details.area || "N/A"} sqft

Respond with ONLY a valid JSON object (no markdown code blocks, no extra characters):
{
  "description": "A detailed, SEO-friendly professional real estate description (2-3 sentences)",
  "seoTitle": "SEO optimized title",
  "seoKeywords": ["keyword1", "keyword2", "keyword3"],
  "metaDescription": "150-char meta description"
}`;
                const result = await model.generateContent(prompt);
                const raw = result.response.text().trim();
                const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
                const parsed = JSON.parse(cleaned);

                aiDescription = parsed.description;
                aiSeoTitle = parsed.seoTitle;
                aiSeoKeywords = parsed.seoKeywords;
                aiMetaDescription = parsed.metaDescription;

                conversationService.updatePendingProperty(sessionId, {
                    aiDescription,
                    aiSeoTitle,
                    aiSeoKeywords,
                    aiMetaDescription
                });
            } catch (err) {
                console.error("Gemini description generation failed:", err.message);
                aiDescription = `Luxury modern ${details.category || "property"} featuring premium architecture, spacious interiors, and elegant exterior design located in the prime area of ${details.location || "Surat"}.`;
                conversationService.updatePendingProperty(sessionId, { aiDescription });
            }

            // Add to history
            conversationService.addMessage(sessionId, "user", "[Uploaded Cover Image]");
            conversationService.addMessage(sessionId, "model", `✅ **Cover Image Uploaded Successfully!**`);

            // Skip Project Map upload: ask about units next
            if (pendingIntent === "CREATE_PROPERTY") {
                reply = `✅ **Cover Image Uploaded Successfully!**\n\n` +
                    `💡 **AI Generated Description (based on details):**\n> "${aiDescription || details.aiDescription}"\n\n` +
                    `🏗️ **Does this project contain units?** (e.g. A101, A102...)\n\n` +
                    `Reply with:\n- **Yes** → I'll help you create unit numbers\n- **No** → We'll skip units`;

                // Set pending intent to UNITS_FLOW
                conversationService.setPendingIntent(sessionId, "UNITS_FLOW");
            } else {
                reply = `✅ **Image Uploaded Successfully!**\n\n💡 **AI Generated Description:**\n> "${aiDescription || details.aiDescription}"`;
            }

            return { reply, intent: "ANALYZE_IMAGE", data: { imagePath } };
        }

        // ── REMOVED PROPERTY MAP UPLOAD ───────────────────────────────────────


        // ── DETECT INTENT ─────────────────────────────────────────────────────
        const detected = await detectIntent(message, history);
        intent = detected.intent;
        const entities = detected.entities;

        // ── MULTI-TURN: We are in the middle of a flow ────────────────────────
        if (pendingIntent === "CREATE_PROPERTY") {
            return await handleCreatePropertyFlow(message, sessionId, pendingData, history, entities);
        }

        if (pendingIntent === "UNITS_FLOW") {
            return await handleUnitsFlow(message, sessionId, pendingData, history);
        }

        // ── ROUTE BY INTENT ───────────────────────────────────────────────────

        switch (intent) {

            // ── CREATE PROPERTY ──────────────────────────────────────────────
            case "CREATE_PROPERTY": {
                conversationService.setPendingIntent(sessionId, "CREATE_PROPERTY");
                conversationService.updatePendingProperty(sessionId, entities);
                conversationService.addMessage(sessionId, "user", message);

                const missing = getNextMissingField(entities);
                if (missing) {
                    reply = `🏠 **Let's create a new property!**\n\nI'll collect all the details one by one.\n\n${getFieldQuestion(missing)}`;
                } else {
                    // All fields collected in one message — ask for image
                    reply = `✅ Got all the basic details!\n\n📸 Please **upload the Cover Image** for this property.\n\n*(Drag & drop or click the 📎 icon)*`;
                }

                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent, data: null };
            }

            // ── GET PROPERTIES ───────────────────────────────────────────────
            case "GET_PROPERTIES": {
                conversationService.addMessage(sessionId, "user", message);
                const query = {};
                if (entities.category) query.category = new RegExp(entities.category, "i");
                if (entities.status) query.status = new RegExp(entities.status, "i");
                if (entities.location) query.location = new RegExp(entities.location, "i");

                const properties = await Property.find(query).limit(10).sort({ createdAt: -1 });

                if (properties.length === 0) {
                    reply = `🔍 No properties found matching your criteria.`;
                } else {
                    const list = properties.map((p, i) =>
                        `**${i + 1}. ${p.title}**\n   📍 ${p.location} | 💰 ₹${p.price?.toLocaleString("en-IN")} | 🏷️ ${p.category} | 🔵 ${p.status}\n   🆔 \`${p._id}\``
                    ).join("\n\n");
                    reply = `📋 **Found ${properties.length} Properties:**\n\n${list}`;
                }

                data = { properties };
                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent, data };
            }

            // ── GET STATS ────────────────────────────────────────────────────
            case "GET_STATS": {
                conversationService.addMessage(sessionId, "user", message);

                const [allProperties, allInquiries, allUsers] = await Promise.all([
                    Property.find(),
                    Inquiry.find(),
                    User.find(),
                ]);

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const todayInquiries = allInquiries.filter(i => new Date(i.createdAt) >= today);
                const pendingInquiries = allInquiries.filter(i => i.status === "pending");
                const availableProps = allProperties.filter(p => p.status === "available");
                const bookedProps = allProperties.filter(p => p.status === "booked");

                const byCategory = allProperties.reduce((acc, p) => {
                    acc[p.category] = (acc[p.category] || 0) + 1;
                    return acc;
                }, {});

                const prices = allProperties.map(p => p.price).filter(Boolean);
                const avgPrice = prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;
                const maxPrice = prices.length ? Math.max(...prices) : 0;
                const mostExpensive = allProperties.find(p => p.price === maxPrice);

                const categoryBreakdown = Object.entries(byCategory)
                    .map(([cat, count]) => `  • ${cat}: ${count}`)
                    .join("\n");

                reply = `📊 **Dashboard Statistics**\n\n` +
                    `🏠 **Properties**\n` +
                    `  • Total: ${allProperties.length}\n` +
                    `  • Available: ${availableProps.length}\n` +
                    `  • Booked: ${bookedProps.length}\n\n` +
                    `📁 **By Category:**\n${categoryBreakdown || "  • No data"}\n\n` +
                    `💰 **Pricing**\n` +
                    `  • Average Price: ₹${avgPrice.toLocaleString("en-IN")}\n` +
                    `  • Most Expensive: ${mostExpensive?.title || "N/A"} (₹${maxPrice.toLocaleString("en-IN")})\n\n` +
                    `📬 **Inquiries**\n` +
                    `  • Total: ${allInquiries.length}\n` +
                    `  • Today: ${todayInquiries.length}\n` +
                    `  • Pending: ${pendingInquiries.length}\n\n` +
                    `👥 **Users**\n` +
                    `  • Total Registered: ${allUsers.length}`;

                data = { properties: allProperties.length, inquiries: allInquiries.length, users: allUsers.length, stats: { avgPrice, maxPrice, available: availableProps.length, booked: bookedProps.length, todayInquiries: todayInquiries.length } };
                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent, data };
            }

            // ── GET INQUIRIES ────────────────────────────────────────────────
            case "GET_INQUIRIES": {
                conversationService.addMessage(sessionId, "user", message);

                const lowerMsg = message.toLowerCase();
                let query = {};
                let label = "All";

                if (lowerMsg.includes("today")) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    query.createdAt = { $gte: today };
                    label = "Today's";
                } else if (lowerMsg.includes("pending")) {
                    query.status = "pending";
                    label = "Pending";
                } else if (lowerMsg.includes("completed") || lowerMsg.includes("closed")) {
                    query.status = "closed";
                    label = "Completed";
                }

                const inquiries = await Inquiry.find(query).sort({ createdAt: -1 }).limit(20);

                if (inquiries.length === 0) {
                    reply = `📭 No ${label.toLowerCase()} inquiries found.`;
                } else {
                    const list = inquiries.map((inq, i) =>
                        `**${i + 1}. ${inq.name}** — ${inq.email}\n   📞 ${inq.phone}\n   🏠 ${inq.property?.title || "N/A"}\n   🔵 ${inq.status} | 🕐 ${new Date(inq.createdAt).toLocaleDateString("en-IN")}\n   🆔 \`${inq._id}\``
                    ).join("\n\n");
                    reply = `📬 **${label} Inquiries (${inquiries.length}):**\n\n${list}`;
                }

                data = { inquiries };
                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent, data };
            }

            // ── UPDATE INQUIRY ───────────────────────────────────────────────
            case "UPDATE_INQUIRY": {
                conversationService.addMessage(sessionId, "user", message);

                if (!entities.inquiryId) {
                    reply = `Please provide the **Inquiry ID** to update.\n\nExample: "Mark inquiry 6847abc as completed"`;
                } else {
                    const newStatus = message.toLowerCase().includes("complet") ? "closed"
                        : message.toLowerCase().includes("contact") ? "contacted"
                        : "pending";
                    await Inquiry.findByIdAndUpdate(entities.inquiryId, { status: newStatus });
                    reply = `✅ Inquiry \`${entities.inquiryId}\` has been marked as **${newStatus}**.`;
                    data = { inquiryId: entities.inquiryId, newStatus };
                }

                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent, data };
            }

            // ── DELETE INQUIRY ───────────────────────────────────────────────
            case "DELETE_INQUIRY": {
                conversationService.addMessage(sessionId, "user", message);

                if (!entities.inquiryId) {
                    reply = `Please provide the **Inquiry ID** to delete.\n\nExample: "Delete inquiry 6847abc"`;
                } else {
                    await Inquiry.findByIdAndDelete(entities.inquiryId);
                    reply = `🗑️ Inquiry \`${entities.inquiryId}\` has been **deleted successfully**.`;
                    data = { inquiryId: entities.inquiryId };
                }

                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent, data };
            }

            // ── DELETE PROPERTY ──────────────────────────────────────────────
            case "DELETE_PROPERTY": {
                conversationService.addMessage(sessionId, "user", message);

                if (!entities.propertyId) {
                    // Search by title if no ID given
                    if (entities.title) {
                        const found = await Property.findOne({ title: new RegExp(entities.title, "i") });
                        if (found) {
                            await Property.findByIdAndDelete(found._id);
                            reply = `🗑️ Property **"${found.title}"** has been **deleted successfully**.`;
                            data = { deletedId: found._id };
                        } else {
                            reply = `❌ No property found with title "${entities.title}". Please provide the exact Property ID.`;
                        }
                    } else {
                        reply = `Please provide the **Property ID** or **Title** to delete.\n\nExample: "Delete property Palm Residency"`;
                    }
                } else {
                    const deleted = await Property.findByIdAndDelete(entities.propertyId);
                    if (deleted) {
                        reply = `🗑️ Property **"${deleted.title}"** (\`${entities.propertyId}\`) has been **deleted successfully**.`;
                        data = { deletedId: entities.propertyId };
                    } else {
                        reply = `❌ Property with ID \`${entities.propertyId}\` not found.`;
                    }
                }

                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent, data };
            }

            // ── UPDATE PROPERTY ──────────────────────────────────────────────
            case "UPDATE_PROPERTY": {
                conversationService.addMessage(sessionId, "user", message);

                if (!entities.propertyId && !entities.title) {
                    reply = `Please provide the **Property ID** or **Title** and the fields you want to update.\n\nExample: "Update price of Palm Residency to 3 crore"`;
                } else {
                    const query = entities.propertyId ? { _id: entities.propertyId } : { title: new RegExp(entities.title, "i") };
                    const updateData = {};
                    if (entities.price || entities.priceRaw) updateData.price = parsePrice(entities.priceRaw || entities.price);
                    if (entities.status) updateData.status = entities.status;
                    if (entities.description) updateData.description = entities.description;
                    if (entities.location) updateData.location = entities.location;

                    if (Object.keys(updateData).length === 0) {
                        reply = `I found the property but please specify what to update (price, status, description, location, etc.)`;
                    } else {
                        const updated = await Property.findOneAndUpdate(query, updateData, { new: true });
                        if (updated) {
                            reply = `✅ Property **"${updated.title}"** has been updated!\n\nUpdated fields:\n${Object.entries(updateData).map(([k, v]) => `  • **${k}:** ${v}`).join("\n")}`;
                            data = { property: updated };
                        } else {
                            reply = `❌ Property not found. Please check the title or ID.`;
                        }
                    }
                }

                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent, data };
            }

            // ── CHANGE STATUS ────────────────────────────────────────────────
            case "CHANGE_STATUS": {
                conversationService.addMessage(sessionId, "user", message);
                const statusMap = { available: "available", booked: "booked", sold: "sold" };
                const newStatus = Object.keys(statusMap).find(s => message.toLowerCase().includes(s));

                if (!newStatus) {
                    reply = `Please specify the new status: **available**, **booked**, or **sold**.`;
                } else if (!entities.propertyId && !entities.title) {
                    reply = `Please provide the **Property ID** or **Title** to change status.`;
                } else {
                    const query = entities.propertyId ? { _id: entities.propertyId } : { title: new RegExp(entities.title, "i") };
                    const updated = await Property.findOneAndUpdate(query, { status: newStatus }, { new: true });
                    reply = updated
                        ? `✅ Status of **"${updated.title}"** changed to **${newStatus}**.`
                        : `❌ Property not found.`;
                    data = { property: updated };
                }

                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent, data };
            }

            // ── GET USERS ────────────────────────────────────────────────────
            case "GET_USERS": {
                conversationService.addMessage(sessionId, "user", message);
                const users = await User.find().select("-password -googleId").limit(20).sort({ createdAt: -1 });

                if (users.length === 0) {
                    reply = `👥 No users found.`;
                } else {
                    const list = users.map((u, i) =>
                        `**${i + 1}. ${u.name}** — ${u.email}\n   🔑 Role: ${u.role} | 🆔 \`${u._id}\``
                    ).join("\n\n");
                    reply = `👥 **Registered Users (${users.length}):**\n\n${list}`;
                }

                data = { users };
                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent, data };
            }

            // ── DELETE USER ──────────────────────────────────────────────────
            case "DELETE_USER": {
                conversationService.addMessage(sessionId, "user", message);

                if (!entities.userId) {
                    reply = `Please provide the **User ID** to delete.\n\nExample: "Delete user 6847abc"`;
                } else {
                    const deleted = await User.findByIdAndDelete(entities.userId);
                    reply = deleted
                        ? `🗑️ User **"${deleted.name}"** has been deleted.`
                        : `❌ User not found.`;
                    data = { userId: entities.userId };
                }

                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent, data };
            }

            // ── UPDATE USER ──────────────────────────────────────────────────
            case "UPDATE_USER": {
                conversationService.addMessage(sessionId, "user", message);
                const newRole = message.toLowerCase().includes("admin") ? "admin" : "user";

                if (!entities.userId) {
                    reply = `Please provide the **User ID** to update.\n\nExample: "Promote user 6847abc to admin"`;
                } else {
                    const updated = await User.findByIdAndUpdate(entities.userId, { role: newRole }, { new: true });
                    reply = updated
                        ? `✅ User **"${updated.name}"** role updated to **${newRole}**.`
                        : `❌ User not found.`;
                    data = { user: updated };
                }

                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent, data };
            }

            // ── GENERATE SEO ─────────────────────────────────────────────────
            case "GENERATE_SEO":
            case "GENERATE_DESCRIPTION":
            case "GENERATE_SOCIAL": {
                conversationService.addMessage(sessionId, "user", message);

                let propertyContext = "";
                let prop = null;
                let isLatestFallback = false;

                if (entities.title || entities.propertyId) {
                    const query = entities.propertyId ? { _id: entities.propertyId } : { title: new RegExp(entities.title, "i") };
                    prop = await Property.findOne(query);
                }

                if (!prop) {
                    // Fallback to the latest property in the database so the button actually does something!
                    prop = await Property.findOne().sort({ createdAt: -1 });
                    if (prop) {
                        isLatestFallback = true;
                    }
                }

                if (prop) {
                    propertyContext = `Property: ${prop.title}, ${prop.category}, ${prop.location}, ₹${prop.price}, ${prop.bedrooms} BHK, ${prop.area} sqft. ${prop.description || ""}`;
                }

                const contentType = intent === "GENERATE_SEO" ? "SEO content"
                    : intent === "GENERATE_SOCIAL" ? "social media posts"
                    : "property description";

                const systemContext = `You are a Real Estate Marketing Expert. Generate professional ${contentType} for a real estate property in India. Be specific, engaging, and SEO-optimized. Use INR (₹) currency.`;

                const promptMessage = propertyContext 
                    ? `${message}\n\nProperty Details: ${propertyContext}` 
                    : message;

                reply = await generateChat(systemContext, history, promptMessage);

                // Add a small helpful prefix if we fell back to the latest property
                if (isLatestFallback && prop) {
                    reply = `💡 *(Generating content for your latest property: **${prop.title}**)*\n\n${reply}`;
                }

                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent, data: null };
            }

            // ── DUPLICATE PROPERTY ───────────────────────────────────────────
            case "DUPLICATE_PROPERTY": {
                conversationService.addMessage(sessionId, "user", message);

                if (!entities.propertyId && !entities.title) {
                    reply = `Please provide the **Property ID** or **Title** to duplicate.`;
                } else {
                    const query = entities.propertyId ? { _id: entities.propertyId } : { title: new RegExp(entities.title, "i") };
                    const original = await Property.findOne(query).lean();
                    if (original) {
                        delete original._id;
                        delete original.createdAt;
                        delete original.updatedAt;
                        original.title = `${original.title} (Copy)`;
                        const duplicate = await Property.create(original);
                        reply = `✅ Property **"${duplicate.title}"** has been duplicated!\n\n🆔 New ID: \`${duplicate._id}\``;
                        data = { property: duplicate };
                    } else {
                        reply = `❌ Property not found.`;
                    }
                }

                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent, data };
            }

            // ── GENERAL CHAT / FALLBACK ──────────────────────────────────────
            default: {
                conversationService.addMessage(sessionId, "user", message);

                const systemContext = `You are an AI Admin Assistant for a Real Estate platform in India. You help manage properties, users, inquiries, and generate marketing content. You are professional, concise, and helpful. Always respond in a friendly but efficient manner. If you're unsure of the exact command, suggest what the admin can ask.

Capabilities:
- Create / Update / Delete / Search properties
- View dashboard statistics
- Manage inquiries (view, update status, delete)
- Manage users (view, promote, delete)
- Generate SEO content, property descriptions, social media posts
- Analyze property images using AI
- Upload cover images and project maps directly in chat`;

                reply = await generateChat(systemContext, history, message);
                conversationService.addMessage(sessionId, "model", reply);
                return { reply, intent: "GENERAL_CHAT", data: null };
            }
        }

    } catch (err) {
        console.error("[aiAdminService] Error:", err.message);
        return {
            reply: `⚠️ Something went wrong: ${err.message}. Please try again.`,
            intent: "ERROR",
            data: null,
        };
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// MULTI-TURN FLOW HANDLERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Handle collecting property data step by step.
 */
const handleCreatePropertyFlow = async (message, sessionId, pendingData, history, entities) => {
    conversationService.addMessage(sessionId, "user", message);

    // Merge any entities extracted from this message
    const updatedData = { ...pendingData, ...entities };

    const previousMissing = getNextMissingField(pendingData);

    if (previousMissing) {
        // The current message is the answer to the expected question
        if (previousMissing === "price") {
            const rawPrice = message.trim();
            updatedData.price = parsePrice(rawPrice) || rawPrice;
            updatedData.priceRaw = rawPrice;
        } else if (["bedrooms", "bathrooms", "area"].includes(previousMissing)) {
            updatedData[previousMissing] = parseFloat(message.trim()) || message.trim();
        } else {
            updatedData[previousMissing] = message.trim();
        }
    }

    conversationService.updatePendingProperty(sessionId, updatedData);

    const nextMissing = getNextMissingField(updatedData);

    let reply;

    if (nextMissing) {
        // Still collecting data
        reply = `✅ Got it!\n\n${getFieldQuestion(nextMissing)}`;
    } else {
        // All fields collected — ask for cover image
        const current = conversationService.getPendingProperty(sessionId);
        if (!current.image) {
            reply = `✅ All details collected!\n\n📸 Please **upload the Cover Image** for this property.\n\n*(Drag & drop or click the 📎 icon below)*`;
        } else {
            // No map requested. Show units next.
            reply = `🏗️ **Does this project contain units?** (e.g. A101, A102...)\n\nReply with:\n- **Yes**\n- **No**`;
            conversationService.setPendingIntent(sessionId, "UNITS_FLOW");
        }
    }

    conversationService.addMessage(sessionId, "model", reply);
    return { reply, intent: "CREATE_PROPERTY", data: { pendingData: conversationService.getPendingProperty(sessionId) } };
};

/**
 * Handle the units creation flow.
 */
const handleUnitsFlow = async (message, sessionId, pendingData, history) => {
    conversationService.addMessage(sessionId, "user", message);

    const lowerMsg = message.toLowerCase().trim();
    const current = conversationService.getPendingProperty(sessionId);

    if (!current._unitsAsked) {
        // Admin answered yes/no to "does it have units?"
        conversationService.updatePendingProperty(sessionId, { _unitsAsked: true });

        if (lowerMsg === "no" || lowerMsg.includes("no")) {
            conversationService.setPendingIntent(sessionId, "CREATE_PROPERTY");
            const reply = `✅ No units will be created.\n\nHere's your **Property Summary** — please review before we create it! 👇`;
            conversationService.addMessage(sessionId, "model", reply);
            return await showPropertySummary(sessionId);
        } else {
            // Ask how many units
            const reply = `How many **total units** does this project have?\n\n*(e.g. 12, 24, 48)*`;
            conversationService.addMessage(sessionId, "model", reply);
            return { reply, intent: "UNITS_FLOW", data: null };
        }
    } else if (!current._unitCount) {
        // Admin gave the number of units
        const count = parseInt(message.trim());
        if (!count || count < 1 || count > 500) {
            const reply = `Please enter a valid number of units (1-500).`;
            conversationService.addMessage(sessionId, "model", reply);
            return { reply, intent: "UNITS_FLOW", data: null };
        }

        // Auto-generate unit numbers
        const units = [];
        const prefix = "A";
        for (let i = 1; i <= count; i++) {
            const num = String(i).padStart(3, "0");
            units.push({ unitNumber: `${prefix}${num}`, status: "available" });
        }

        conversationService.updatePendingProperty(sessionId, { units, _unitCount: count });
        conversationService.setPendingIntent(sessionId, "CREATE_PROPERTY");

        const allUnitsList = units.map(u => u.unitNumber).join("\n");
        const reply = `✅ **${count} units generated successfully!**\n\n**Generated Unit Numbers:**\n${allUnitsList}\n\nHere's your **Property Summary** — please review before we create it! 👇`;
        conversationService.addMessage(sessionId, "model", reply);
        return await showPropertySummary(sessionId);
    }

    return { reply: "Please answer yes or no about units.", intent: "UNITS_FLOW", data: null };
};

/**
 * Show the full property summary card before final creation.
 */
const showPropertySummary = async (sessionId) => {
    const data = conversationService.getPendingProperty(sessionId);
    const priceFormatted = typeof data.price === "number"
        ? `₹${data.price.toLocaleString("en-IN")}`
        : data.priceRaw || data.price;

    const reply = `📋 **Property Summary — Please Review:**\n\n` +
        `🏠 **Title:** ${data.title || "N/A"}\n` +
        `💰 **Price:** ${priceFormatted || "N/A"}\n` +
        `📍 **Location:** ${data.location || "N/A"}\n` +
        `🏷️ **Category:** ${data.category || "N/A"}\n` +
        `🛏️ **Bedrooms:** ${data.bedrooms || "N/A"}\n` +
        `🚿 **Bathrooms:** ${data.bathrooms || "N/A"}\n` +
        `📐 **Area:** ${data.area ? `${data.area} sqft` : "N/A"}\n` +
        `🖼️ **Cover Image:** ${data.image ? "✅ Uploaded" : "❌ Not uploaded"}\n` +
        `🏗️ **Units:** ${data.units?.length ? `${data.units.length} units` : "None"}\n\n` +
        `Click **✅ Create Property** to save, or **❌ Cancel** to start over.`;

    conversationService.addMessage(sessionId, "model", reply);

    return {
        reply,
        intent: "PROPERTY_SUMMARY",
        data: { pendingData: data, showSummary: true },
    };
};

// ─────────────────────────────────────────────────────────────────────────────
// FINAL PROPERTY CREATION (called from controller when admin clicks Create)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Save the pending property to the database using the existing Property model.
 * Called after admin confirms the summary.
 */
const confirmCreateProperty = async (sessionId) => {
    try {
        const data = conversationService.getPendingProperty(sessionId);

        // Sanitize numbers
        const title = data.title ? String(data.title).trim() : "";
        const category = data.category ? String(data.category).trim() : "";
        const location = data.location ? String(data.location).trim() : "";
        const bedrooms = data.bedrooms ? Number(data.bedrooms) : 0;
        const bathrooms = data.bathrooms ? Number(data.bathrooms) : 0;
        const area = data.area ? Number(data.area) : 0;
        const price = typeof data.price === "number" ? data.price : parsePrice(data.priceRaw || data.price);

        if (!title || !price || !location || !category || !bedrooms || !bathrooms || !area) {
            return {
                reply: `❌ **Missing or Invalid Fields.** Please verify your inputs:\n` +
                    `- **Title**: ${title || "Missing"}\n` +
                    `- **Price**: ${price ? `₹${price}` : "Missing/Invalid"}\n` +
                    `- **Location**: ${location || "Missing"}\n` +
                    `- **Category**: ${category || "Missing"}\n` +
                    `- **Bedrooms**: ${bedrooms || "Missing/Zero"}\n` +
                    `- **Bathrooms**: ${bathrooms || "Missing/Zero"}\n` +
                    `- **Area**: ${area ? `${area} sqft` : "Missing/Zero"}`,
                intent: "CREATE_PROPERTY_ERROR",
                data: null,
            };
        }

        const property = await Property.create({
            title,
            price,
            location,
            category,
            bedrooms,
            bathrooms,
            area,
            description: data.description || data.aiDescription || "",
            image: data.image || "",
            propertyMap: data.propertyMap || "",
            status: data.status || "available",
            agentWhatsapp: data.agentWhatsapp || "",
            units: data.units || [],
        });

        // Clear the session data
        conversationService.clearPendingProperty(sessionId);

        const reply = `🎉 **Property Created Successfully!**\n\n` +
            `✅ **"${property.title}"** has been added to your listings.\n\n` +
            `🆔 Property ID: \`${property._id}\`\n` +
            `💰 Price: ₹${price.toLocaleString("en-IN")}\n` +
            `📍 Location: ${property.location}\n\n` +
            `You can view it in the **Properties** section.`;

        conversationService.addMessage(sessionId, "model", reply);

        return { reply, intent: "PROPERTY_CREATED", data: { property } };

    } catch (error) {
        console.error("[confirmCreateProperty] Mongoose Save Failure:", error);
        return {
            reply: `❌ **Database Insertion Failed:** ${error.message}`,
            intent: "CREATE_PROPERTY_ERROR",
            data: null
        };
    }
};

module.exports = {
    processAdminMessage,
    confirmCreateProperty,
    handleUnitsFlow,
};
