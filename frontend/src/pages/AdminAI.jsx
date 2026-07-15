import { useState } from "react";
import AIChat from "../components/AIChat";
import { sendAssistantMessage } from "../services/aiService";

function AdminAI() {
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      text: "Hello Admin! I am your AI assistant. I can help you create properties, review statistics, check inquiries, or generate SEO details. What would you like to do?",
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const sessionId = useState(() => `session-${Date.now()}`)[0];

  const handleSend = async (text, file = null) => {
    // Add user message to history
    const userMessage = {
      type: "user",
      text,
      image: file
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Call mock or real assistant API
      const result = await sendAssistantMessage(text, file, sessionId);
      
      // Add assistant response to history
      const botMessage = {
        type: "assistant",
        text: result.reply,
        action: result.action,
        actionData: result.data
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("AI Assistant transmission failure:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          text: "Sorry, I had trouble contacting my central cognitive service. Please try again."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (command) => {
    handleSend(command);
  };

  return (
    <div className="container-fluid py-2">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="fw-bold mb-1" style={{ fontSize: "28px", color: "var(--text-dark)" }}>
            ✨ AI Admin Assistant
          </h1>
          <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
            Control your website, manage properties, and generate content using natural language commands.
          </p>
        </div>
        <span className="badge bg-success bg-opacity-10 text-success px-3 py-2" style={{ fontSize: "12px", fontWeight: 600 }}>
          AI Agent Online
        </span>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card border-0 p-4 shadow-sm" style={{ borderRadius: "var(--radius-lg)" }}>
            <AIChat
              messages={messages}
              isTyping={isTyping}
              onSend={handleSend}
              onActionClick={handleQuickAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAI;
