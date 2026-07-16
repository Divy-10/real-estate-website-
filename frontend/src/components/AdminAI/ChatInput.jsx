/**
 * ChatInput.jsx
 *
 * The bottom input bar of the AI chat.
 * Features:
 *   • Auto-expanding textarea (grows up to 150px)
 *   • Enter to send (Shift+Enter for newline)
 *   • 📎 file attachment button (triggers image upload flow)
 *   • ➤ Send button with gradient
 *   • Disabled state during AI loading
 *
 * Props:
 *   onSend      {function(text, file)}  - Send handler
 *   onAttach    {function}              - Opens file picker for image upload
 *   loading     {boolean}              - Disables input during AI processing
 *   placeholder {string}               - Input placeholder text
 */

import { useState, useRef, useEffect } from "react";

function ChatInput({ onSend, onAttach, loading, placeholder }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const fileRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
  }, [text]);

  const handleSend = () => {
    if ((!text.trim() && !loading) || loading) return;
    onSend(text.trim());
    setText("");
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onAttach) {
      onAttach(file);
      e.target.value = ""; // reset so same file can be re-selected
    }
  };

  return (
    <div className="chat-input-area">

      {/* Hidden file input for image attachment */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
        id="ai-chat-file-input"
      />

      <div className="chat-input-wrapper">

        {/* Expandable textarea */}
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Type a command or ask anything..."}
          disabled={loading}
          rows={1}
          id="ai-chat-textarea"
          aria-label="Chat message input"
        />

        <div className="chat-input-actions">
          {/* Attachment button */}
          <button
            className="input-icon-btn"
            onClick={() => fileRef.current?.click()}
            disabled={loading}
            title="Upload image (cover photo or project map)"
            id="ai-attach-btn"
            type="button"
          >
            📎
          </button>

          {/* Send button */}
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={!text.trim() || loading}
            title="Send message (Enter)"
            id="ai-send-btn"
            type="button"
          >
            {loading ? (
              <div className="ai-loading-spinner" />
            ) : (
              /* Send arrow icon */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="chat-input-hint">
        Press <kbd style={{ background: "rgba(255,255,255,0.06)", padding: "1px 5px", borderRadius: "4px", fontSize: "10px", border: "1px solid rgba(255,255,255,0.1)" }}>Enter</kbd> to send &nbsp;·&nbsp;
        <kbd style={{ background: "rgba(255,255,255,0.06)", padding: "1px 5px", borderRadius: "4px", fontSize: "10px", border: "1px solid rgba(255,255,255,0.1)" }}>Shift+Enter</kbd> for new line &nbsp;·&nbsp;
        📎 to upload image
      </div>
    </div>
  );
}

export default ChatInput;
