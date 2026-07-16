/**
 * conversationService.js
 *
 * In-memory conversation store for the Admin AI Assistant.
 * Keyed by sessionId (generated on the frontend per admin session).
 *
 * Structure per session:
 * {
 *   history: [ { role: "user"|"model", parts: [{ text }] } ],
 *   pendingProperty: { ...collected fields during creation flow },
 *   pendingIntent: "CREATE_PROPERTY" | null   (tracks multi-turn flow state)
 * }
 *
 * NOTE: Memory resets on server restart. For persistence, swap the Map
 * for a MongoDB collection in the future without touching other files.
 */

const sessions = new Map();

const MAX_HISTORY = 30; // keep last 30 turns per session to avoid token overflows

/**
 * Get or create a session object.
 */
const getSession = (sessionId) => {
    if (!sessions.has(sessionId)) {
        sessions.set(sessionId, {
            history: [],
            pendingProperty: {},
            pendingIntent: null,
        });
    }
    return sessions.get(sessionId);
};

/**
 * Return the full conversation history for a session.
 */
const getHistory = (sessionId) => {
    return getSession(sessionId).history;
};

/**
 * Add a message to the conversation history.
 * @param {string} sessionId
 * @param {"user"|"model"} role
 * @param {string} text
 */
const addMessage = (sessionId, role, text) => {
    const session = getSession(sessionId);
    session.history.push({ role, parts: [{ text }] });

    // Trim to last MAX_HISTORY messages to avoid bloat
    if (session.history.length > MAX_HISTORY) {
        session.history = session.history.slice(-MAX_HISTORY);
    }
};

/**
 * Get pending property data (used during multi-turn property creation).
 */
const getPendingProperty = (sessionId) => {
    return getSession(sessionId).pendingProperty;
};

/**
 * Update pending property data with new fields.
 */
const updatePendingProperty = (sessionId, fields) => {
    const session = getSession(sessionId);
    session.pendingProperty = { ...session.pendingProperty, ...fields };
};

/**
 * Clear all pending property data.
 */
const clearPendingProperty = (sessionId) => {
    const session = getSession(sessionId);
    session.pendingProperty = {};
    session.pendingIntent = null;
};

/**
 * Get the current pending intent (e.g. "CREATE_PROPERTY" while collecting data).
 */
const getPendingIntent = (sessionId) => {
    return getSession(sessionId).pendingIntent;
};

/**
 * Set the pending intent.
 */
const setPendingIntent = (sessionId, intent) => {
    getSession(sessionId).pendingIntent = intent;
};

/**
 * Destroy an entire session (e.g. admin logs out or resets chat).
 */
const clearSession = (sessionId) => {
    sessions.delete(sessionId);
};

/**
 * Return total number of active sessions (for diagnostics).
 */
const getSessionCount = () => sessions.size;

module.exports = {
    getHistory,
    addMessage,
    getPendingProperty,
    updatePendingProperty,
    clearPendingProperty,
    getPendingIntent,
    setPendingIntent,
    clearSession,
    getSessionCount,
};
