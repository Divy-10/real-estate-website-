/**
 * aiAdminController.js
 *
 * Single controller for the Admin AI Assistant endpoint.
 * Accepts: POST /api/admin/assistant
 *
 * Body (multipart/form-data):
 *   - message       {string}  The admin's text message
 *   - sessionId     {string}  Unique session ID for conversation memory
 *   - action        {string}  Optional: "confirm_create" to finalize property creation
 *
 * Files (optional, via existing Multer config):
 *   - image         {file}    Property cover image
 *   - propertyMap   {file}    Property map / floor plan image
 *
 * Response:
 * {
 *   reply:  string,   // AI response text (supports Markdown)
 *   intent: string,   // Detected intent
 *   data:   object    // Optional data payload (properties, stats, etc.)
 * }
 *
 * NOTE: This controller does NOT touch any existing controller.
 *       It calls aiAdminService directly, which handles all logic.
 */

const { processAdminMessage, confirmCreateProperty } = require("../services/aiAdminService");
const conversationService = require("../services/conversationService");

/**
 * Main AI Assistant handler.
 */
const adminAssistant = async (req, res) => {
    try {
        const { message, sessionId, action } = req.body;

        // Validate session ID
        if (!sessionId) {
            return res.status(400).json({
                reply: "Session ID is required.",
                intent: "ERROR",
                data: null,
            });
        }

        // ── SPECIAL ACTION: Confirm Property Creation ────────────────────────
        // Called when admin clicks "✅ Create Property" on the summary card
        if (action === "confirm_create") {
            const result = await confirmCreateProperty(sessionId);
            return res.json(result);
        }

        // ── SPECIAL ACTION: Cancel Property Creation ─────────────────────────
        if (action === "cancel_create") {
            conversationService.clearPendingProperty(sessionId);
            return res.json({
                reply: "❌ Property creation cancelled. How else can I help you?",
                intent: "CANCEL",
                data: null,
            });
        }

        // ── SPECIAL ACTION: Handle Units Flow ────────────────────────────────
        if (action === "units_yes") {
            conversationService.setPendingIntent(sessionId, "UNITS_FLOW");
            return res.json({
                reply: "How many **total units** does this project have?\n\n*(e.g. 12, 24, 48)*",
                intent: "UNITS_FLOW",
                data: null,
            });
        }

        if (action === "units_no") {
            conversationService.setPendingIntent(sessionId, "CREATE_PROPERTY");
            const { showPropertySummary } = require("../services/aiAdminService");
            // Trigger summary display
            const result = await processAdminMessage("show summary", sessionId);
            return res.json(result);
        }

        // ── SPECIAL ACTION: Clear Session ────────────────────────────────────
        if (action === "clear_session") {
            conversationService.clearSession(sessionId);
            return res.json({
                reply: "🔄 Chat history cleared. Starting fresh!",
                intent: "CLEAR",
                data: null,
            });
        }

        // ── NORMAL MESSAGE FLOW ──────────────────────────────────────────────
        if (!message || message.trim() === "") {
            // If there's no message but there are files, the image handler in the service will deal with it
            if (!req.files?.image && !req.files?.propertyMap) {
                return res.status(400).json({
                    reply: "Please type a message.",
                    intent: "ERROR",
                    data: null,
                });
            }
        }

        // Extract uploaded file paths (Cloudinary returns .path as the URL)
        const imagePath = req.files?.image?.[0]?.path || null;
        const propertyMapPath = req.files?.propertyMap?.[0]?.path || null;

        // Process through the main AI service
        const result = await processAdminMessage(
            message || "",
            sessionId,
            imagePath,
            propertyMapPath
        );

        return res.json(result);

    } catch (error) {
        console.error("[aiAdminController] Unhandled error:", error);
        return res.status(500).json({
            reply: `⚠️ Server error: ${error.message}. Please try again.`,
            intent: "ERROR",
            data: null,
        });
    }
};

module.exports = { adminAssistant };
