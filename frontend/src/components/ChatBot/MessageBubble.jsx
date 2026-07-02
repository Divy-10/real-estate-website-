const MessageBubble = ({ message, isPending }) => {
    const isUser = message.type === "user";

    return (
        <div className={`message-bubble-container ${isUser ? "user-container" : "bot-container"}`}>
            {!isUser && (
                <div className="bot-avatar">
                    <i className="bi bi-robot"></i>
                </div>
            )}
            
            <div className={`message-bubble ${isUser ? "user-bubble" : "bot-bubble"}`}>
                {isPending ? (
                    <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                ) : (
                    message.text
                )}
            </div>
            
            {isUser && (
                <div className="user-avatar">
                    <i className="bi bi-person-fill"></i>
                </div>
            )}
        </div>
    );
};

export default MessageBubble;