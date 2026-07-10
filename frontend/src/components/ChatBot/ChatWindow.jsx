import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import PropertyResults from "./PropertyResults";

const ChatWindow = ({ messages, isTyping }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    return (
        <div className="chat-window">
            {messages.map((msg, index) => (
                <div key={index} className="message-wrapper">
                    <MessageBubble message={msg} />

                    {msg.properties && msg.properties.length > 0 && (
                        <PropertyResults properties={msg.properties} />
                    )}
                </div>
            ))}
            
            {isTyping && (
                <div>
                    <MessageBubble message={{ type: "bot", text: "" }} isPending={true} />
                </div>
            )}
            
            <div ref={bottomRef} />
        </div>
    );
};

export default ChatWindow;