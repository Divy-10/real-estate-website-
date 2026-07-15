import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingLoader from "./TypingLoader";

function ChatWindow({ messages, isTyping }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  return (
    <div
      className="chat-window flex-grow-1 p-3 bg-light overflow-y-auto"
      style={{
        height: "400px",
        minHeight: "350px",
        border: "1px solid var(--border-light)",
        borderBottom: "none",
        borderRadius: "12px 12px 0 0"
      }}
      role="log"
      aria-label="Chat history"
    >
      {messages.length === 0 ? (
        <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
          <i className="bi bi-robot display-5 mb-2 text-primary text-opacity-70"></i>
          <h5 className="fw-semibold">AI Admin Assistant</h5>
          <p className="small text-center max-w-700 px-3">
            Ask me to perform operations like creating properties, checking stats, or handling inquiries using natural language.
          </p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))
      )}

      {isTyping && (
        <div className="mb-3">
          <TypingLoader />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default ChatWindow;
