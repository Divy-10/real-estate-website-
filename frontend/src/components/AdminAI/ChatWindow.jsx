/**
 * ChatWindow.jsx
 *
 * The scrollable message history area.
 * Features:
 *   • Auto-scrolls to bottom on new messages
 *   • "Scroll to bottom" button appears when user scrolls up
 *   • Empty state with onboarding hints when no messages
 *   • Renders TypingLoader when AI is processing
 *   • Renders each message with MessageBubble
 *
 * Props:
 *   messages    {Array}    - Array of message objects
 *   loading     {boolean}  - Show typing loader
 *   onAction    {function} - Bubble action handler passed down to MessageBubble
 *   confirmLoading {boolean} - For property creation confirm button
 */

import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import TypingLoader from "./TypingLoader";

const EMPTY_HINTS = [
  { icon: "📊", text: "\"Show dashboard statistics\"" },
  { icon: "🏠", text: "\"Create a new villa in Surat\"" },
  { icon: "📬", text: "\"Show today's inquiries\"" },
  { icon: "🗑️", text: "\"Delete property Palm Residency\"" },
  { icon: "💡", text: "\"Generate SEO for my property\"" },
];

function ChatWindow({ messages, loading, onAction, confirmLoading }) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Show scroll-to-bottom button when user scrolls up
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollBtn(distanceFromBottom > 200);
  };

  return (
    <div
      className="chat-window"
      ref={containerRef}
      onScroll={handleScroll}
      id="ai-chat-window"
    >
      {/* Empty state */}
      {messages.length === 0 && !loading && (
        <div className="chat-empty-state">
          <div className="chat-empty-icon">🤖</div>
          <h3>AI Admin Assistant</h3>
          <p>I can manage your entire admin panel using natural language. Try saying:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px", width: "100%", maxWidth: "380px" }}>
            {EMPTY_HINTS.map((hint) => (
              <div key={hint.text} style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "10px",
                textAlign: "left",
              }}>
                <span style={{ fontSize: "18px" }}>{hint.icon}</span>
                <span style={{ fontSize: "13px", color: "#64748b", fontStyle: "italic" }}>
                  {hint.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.map((msg, idx) => (
        <MessageBubble
          key={idx}
          message={msg}
          onAction={onAction}
          loading={confirmLoading}
        />
      ))}

      {/* Typing loader */}
      {loading && <TypingLoader />}

      {/* Scroll anchor */}
      <div ref={bottomRef} />

      {/* Scroll to bottom button */}
      {showScrollBtn && (
        <button
          className="scroll-bottom-btn"
          onClick={scrollToBottom}
          title="Scroll to bottom"
          aria-label="Scroll to bottom"
        >
          ↓
        </button>
      )}
    </div>
  );
}

export default ChatWindow;
