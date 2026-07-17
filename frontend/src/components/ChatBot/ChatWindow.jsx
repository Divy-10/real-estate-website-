import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import PropertyResults from "./PropertyResults";

const ChatWindow = ({ messages, isTyping }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages, isTyping]);

    return (
        <div className="chat-window" ref={containerRef}>
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
        </div>
    );
};

export default ChatWindow;