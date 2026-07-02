import { useState } from "react";

const ChatInput = ({ onSend, isTyping }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim() || isTyping) return;

        onSend(text);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="chat-input-luxury">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={isTyping ? "AI is replying..." : "Search location, budget, bedrooms (e.g. 3 BHK in Mumbai under 2 Cr)..."}
                disabled={isTyping}
                className="chat-text-input"
            />

            <button type="submit" className="chat-send-btn" disabled={!text.trim() || isTyping}>
                <i className="bi bi-send-fill"></i>
            </button>
        </form>
    );
};

export default ChatInput;