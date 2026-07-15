import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import QuickActions from "./QuickActions";

function AIChat({ messages, isTyping, onSend, onActionClick }) {
  return (
    <div className="d-flex flex-column h-100">
      {/* Suggestions/Quick Actions Bar */}
      <QuickActions onActionClick={onActionClick} disabled={isTyping} />

      {/* Main chat box container */}
      <div className="chat-container border rounded-3 shadow-sm d-flex flex-column bg-white">
        <ChatWindow messages={messages} isTyping={isTyping} />
        <ChatInput onSend={onSend} isTyping={isTyping} />
      </div>
    </div>
  );
}

export default AIChat;
