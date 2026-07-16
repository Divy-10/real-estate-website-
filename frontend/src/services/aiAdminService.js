/**
 * aiAdminService.js (Frontend)
 *
 * Axios helper for the Admin AI Assistant API.
 * Sends FormData so image files can be attached alongside text.
 *
 * All requests automatically attach the admin JWT from localStorage
 * (inherited from the existing API interceptor pattern).
 */

import API from "./api";

/**
 * Send a text message to the AI assistant.
 *
 * @param {string} message   - Admin's message text
 * @param {string} sessionId - Unique session identifier
 * @param {object} [options] - Optional: { action, image, propertyMap }
 * @returns {Promise<{reply, intent, data}>}
 */
export const sendAdminMessage = async (message, sessionId, options = {}) => {
  const formData = new FormData();

  if (message)   formData.append("message", message);
  if (sessionId) formData.append("sessionId", sessionId);
  if (options.action) formData.append("action", options.action);

  // Optional file attachments (File objects from input/drag-drop)
  if (options.image)       formData.append("image", options.image);
  if (options.propertyMap) formData.append("propertyMap", options.propertyMap);

  const response = await API.post("/admin/assistant", formData, {
    headers: {
      // Let browser set Content-Type with boundary for multipart
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * Confirm property creation after admin reviews the summary card.
 *
 * @param {string} sessionId
 * @returns {Promise<{reply, intent, data}>}
 */
export const confirmPropertyCreation = async (sessionId) => {
  return sendAdminMessage("", sessionId, { action: "confirm_create" });
};

/**
 * Cancel the pending property creation flow.
 *
 * @param {string} sessionId
 * @returns {Promise<{reply, intent, data}>}
 */
export const cancelPropertyCreation = async (sessionId) => {
  return sendAdminMessage("", sessionId, { action: "cancel_create" });
};

/**
 * Clear the current session (reset conversation history).
 *
 * @param {string} sessionId
 * @returns {Promise<{reply, intent, data}>}
 */
export const clearSession = async (sessionId) => {
  return sendAdminMessage("", sessionId, { action: "clear_session" });
};
