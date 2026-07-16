/**
 * aiAdminRoutes.js
 *
 * Routes for the Admin AI Assistant.
 *
 * Endpoint:
 *   POST /api/admin/assistant
 *
 * Middleware:
 *   - protect    : Existing JWT auth middleware (reused, NOT duplicated)
 *   - upload.fields : Existing Multer/Cloudinary config (reused, NOT duplicated)
 *
 * This file intentionally has ONLY ONE route to keep things clean and simple.
 * Future endpoints (voice, document upload, etc.) can be added here.
 */

const express = require("express");
const router = express.Router();

// Reuse existing middleware — no changes to these files
const protect = require("../middleware/auth");
const upload = require("../config/multer");

// New controller
const { adminAssistant } = require("../controllers/aiAdminController");

// POST /api/admin/assistant
// Accepts: multipart/form-data (message + sessionId + optional image + optional propertyMap)
router.post(
    "/assistant",
    protect,
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "propertyMap", maxCount: 1 },
    ]),
    adminAssistant
);

module.exports = router;
