/**
 * AIChat.jsx
 *
 * Top-level chat controller component.
 * Manages:
 *   • Message state (history array)
 *   • Session ID (generated once per page load)
 *   • Loading states (AI typing, confirm button)
 *   • Pending file queue (image / propertyMap staged before sending)
 *   • All user actions (send, attach, confirm, cancel, clear, quick actions)
 *
 * Renders:
 *   Header → QuickActions → ChatWindow → ChatInput
 */

import { useState, useCallback, useRef, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import QuickActions from "./QuickActions";
import {
  sendAdminMessage,
  confirmPropertyCreation,
  cancelPropertyCreation,
  clearSession,
} from "../../services/aiAdminService";

// Generate a stable session ID for this browser tab
const generateSessionId = () => `admin-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

function AIChat() {
  const [messages, setMessages]       = useState(() => {
    const saved = localStorage.getItem("admin_chat_messages");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Failed to parse admin chat messages", e);
      }
    }
    return [];
  });

  const [loading, setLoading]         = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [pendingImage, setPendingImage]     = useState(null); // staged File for cover
  const [pendingMap, setPendingMap]         = useState(null);

  const sessionIdRef = useRef(null);
  if (!sessionIdRef.current) {
    const savedId = localStorage.getItem("admin_chat_session_id");
    if (savedId) {
      sessionIdRef.current = savedId;
    } else {
      const newId = generateSessionId();
      localStorage.setItem("admin_chat_session_id", newId);
      sessionIdRef.current = newId;
    }
  }

  const sessionId = sessionIdRef.current;

  // Save messages to local storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("admin_chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  // ── Greet on first load if history is empty ──────────────────────
  useEffect(() => {
    if (messages.length === 0) {
      const welcome = {
        role: "model",
        text: `👋 Welcome to your **AI Admin Assistant**!\n\nI can help you manage your entire real estate dashboard using natural language.\n\n**What I can do:**\n- 🏠 Create / Update / Delete properties\n- 📊 Show dashboard statistics\n- 📬 Manage inquiries\n- 👥 Manage users\n- 💡 Generate SEO content & descriptions\n- 📸 Analyze property images with AI\n\nJust type a command or pick one from the **Quick Actions** above!`,
        timestamp: new Date(),
      };
      setMessages([welcome]);
    }
  }, []);

  // ── Add a message to the history ────────────────────────────────
  const addMessage = useCallback((role, text, extra = {}) => {
    setMessages((prev) => [
      ...prev,
      { role, text, timestamp: new Date(), ...extra },
    ]);
  }, []);

  // ── Core: send a message to backend ─────────────────────────────
  const handleSend = useCallback(async (text, options = {}) => {
    if (loading) return;

    const userText = text || (options.image ? "📎 [Image uploaded]" : "");

    // Add user message bubble
    if (userText) {
      addMessage("user", userText, {
        imageSrc: options._previewUrl || null,
      });
    }

    setLoading(true);

    try {
      const result = await sendAdminMessage(text, sessionId, {
        action: options.action,
        image: options.image || pendingImage,
      });

      // Clear pending files after successful upload
      if (pendingImage) setPendingImage(null);

      // Add AI reply
      addMessage("model", result.reply, {
        data: result.data,
        intent: result.intent,
      });

    } catch (err) {
      const errMsg = err?.response?.data?.reply || err?.response?.data?.message || err.message || "Something went wrong. Please try again.";
      addMessage("model", `⚠️ **Error:** ${errMsg}`);
    } finally {
      setLoading(false);
    }
  }, [loading, pendingImage, sessionId, addMessage]);

  // ── Quick action chip clicked ────────────────────────────────────
  const handleQuickAction = useCallback((command) => {
    handleSend(command);
  }, [handleSend]);

  // ── File attached from input bar (📎 button) ─────────────────────
  const handleAttach = useCallback((file) => {
    const previewUrl = URL.createObjectURL(file);
    setPendingImage(file);
    // Immediately send as cover image upload
    handleSend("", {
      image: file,
      _previewUrl: previewUrl,
    });
  }, [handleSend]);

  // ── Bubble action handler (confirm/cancel/use-description) ───────
  const handleAction = useCallback(async (actionType, payload) => {
    switch (actionType) {

      case "confirm_create": {
        setConfirmLoading(true);
        try {
          const result = await confirmPropertyCreation(sessionId);
          addMessage("model", result.reply, { data: result.data, intent: result.intent });
        } catch (err) {
          addMessage("model", `⚠️ Failed to create property: ${err.message}`);
        } finally {
          setConfirmLoading(false);
        }
        break;
      }

      case "cancel_create": {
        try {
          const result = await cancelPropertyCreation(sessionId);
          addMessage("model", result.reply);
        } catch {
          addMessage("model", "❌ Property creation cancelled.");
        }
        break;
      }

      case "use_ai_description": {
        addMessage("user", "✨ Use AI Description");
        handleSend(`Use this AI description: "${payload}"`);
        break;
      }

      case "skip_description": {
        addMessage("user", "I'll write my own description.");
        handleSend("Skip AI description, I'll write my own.");
        break;
      }

      default:
        break;
    }
  }, [sessionId, addMessage, handleSend]);

  // ── Clear chat ───────────────────────────────────────────────────
  const handleClearChat = useCallback(async () => {
    if (!window.confirm("Clear the entire chat history?")) return;
    try {
      await clearSession(sessionId);
    } catch { /* ignore */ }
    
    const newId = generateSessionId();
    localStorage.setItem("admin_chat_session_id", newId);
    sessionIdRef.current = newId;
    
    localStorage.removeItem("admin_chat_messages");
    setMessages([]);
    setPendingImage(null);
    setPendingMap(null);
    // Re-add welcome message
    setTimeout(() => {
      addMessage("model", "🔄 Chat cleared! How can I help you?");
    }, 100);
  }, [sessionId, addMessage]);

  return (
    <>
      {/* Header */}
      <div className="ai-chat-header">
        <div className="ai-header-left">
          <div className="ai-avatar">🤖</div>
          <div className="ai-header-info">
            <h2>AI Admin Assistant</h2>
            <div className="ai-status">
              <div className="ai-status-dot" />
              <span>Online · Powered by Gemini AI</span>
            </div>
          </div>
        </div>

        <div className="ai-header-actions">
          <button
            className="ai-header-btn"
            onClick={handleClearChat}
            id="ai-clear-chat-btn"
            title="Clear conversation"
          >
            🗑️ <span>Clear Chat</span>
          </button>
          <button
            className="ai-header-btn"
            onClick={() => handleSend("Show me dashboard statistics")}
            id="ai-stats-shortcut-btn"
            title="Show stats"
          >
            📊 <span>Stats</span>
          </button>
        </div>
      </div>

      {/* Quick action chips */}
      <QuickActions onSelect={handleQuickAction} />

      {/* Message window */}
      <ChatWindow
        messages={messages}
        loading={loading}
        onAction={handleAction}
        confirmLoading={confirmLoading}
      />

      {/* Input bar */}
      <ChatInput
        onSend={handleSend}
        onAttach={handleAttach}
        loading={loading}
        placeholder={
          pendingImage ? "Cover image staged — type 'send' or wait for next prompt..."
          : "Type a command... (e.g. 'Show all properties', 'Create a new villa')"
        }
      />
    </>
  );
}

export default AIChat;
