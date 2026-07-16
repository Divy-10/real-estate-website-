/**
 * TypingLoader.jsx
 * Animated 3-dot typing indicator shown while AI is processing a response.
 */

function TypingLoader() {
  return (
    <div className="typing-loader">
      {/* AI Avatar */}
      <div className="msg-avatar ai-av">🤖</div>

      {/* Animated dots bubble */}
      <div className="typing-bubble">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
}

export default TypingLoader;
