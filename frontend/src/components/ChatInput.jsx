import { useState } from "react";
import UploadArea from "./UploadArea";

function ChatInput({ onSend, isTyping }) {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !selectedFile) return;

    onSend(text, selectedFile);
    setText("");
    setSelectedFile(null);
  };

  return (
    <div className="chat-input-wrapper border-top p-3 bg-white" style={{ borderRadius: "0 0 12px 12px" }}>
      {/* Upload attachment area */}
      <UploadArea selectedFile={selectedFile} setSelectedFile={setSelectedFile} />

      <form onSubmit={handleSubmit} className="d-flex gap-2">
        <input
          type="text"
          className="form-control py-2.5 px-3"
          placeholder="Ask me to 'Create a property' or 'Show dashboard statistics'..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isTyping}
          style={{
            fontSize: "14px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-light)"
          }}
          aria-label="Message to AI Admin Assistant"
        />
        <button
          type="submit"
          className="btn btn-primary d-flex align-items-center justify-content-center px-4"
          disabled={isTyping || (!text.trim() && !selectedFile)}
          style={{ borderRadius: "var(--radius-sm)" }}
          aria-label="Send message"
        >
          <i className="bi bi-send-fill"></i>
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
