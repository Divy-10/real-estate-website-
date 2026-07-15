function TypingLoader() {
  return (
    <div className="d-flex align-items-center gap-1 py-2 px-3 bg-secondary bg-opacity-10 rounded-3 text-muted" style={{ width: "fit-content" }}>
      <span className="small me-1">AI Assistant is thinking</span>
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <style>{`
        .typing-dots {
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }
        .typing-dots span {
          width: 5px;
          height: 5px;
          background-color: var(--text-muted);
          border-radius: 50%;
          animation: typingBlink 1.4s infinite both;
        }
        .typing-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typingBlink {
          0% { opacity: 0.2; transform: scale(0.8); }
          20% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.2; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}

export default TypingLoader;
