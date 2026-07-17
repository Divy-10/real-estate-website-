import "./chatbot.css";
import ChatHeader from "./ChatHeader";
import { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import { sendMessage } from "../../services/chatApi";
import Navbar from "../Navbar";
import SEO from "../SEO";

const SUGGESTED_PROMPTS = [
    "Properties in Surat under ₹ 1 Cr",
    "Show me luxury villas in Mumbai",
    "5 BHK luxury farm-house in Ahemdabad",
    "Villas in Surat with 7 bedrooms",
];

const ChatBot = () => {
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("client_chat_messages");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse client chat messages", e);
            }
        }
        return [
            {
                type: "bot",
                text: "Hello! Welcome to Royal Crest Properties AI assistant. How can I help you find your dream home today?",
            }
        ];
    });
    const [isTyping, setIsTyping] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Save messages to LocalStorage
    useEffect(() => {
        localStorage.setItem("client_chat_messages", JSON.stringify(messages));
    }, [messages]);

    const handleSend = async (text) => {
        const userMsg = { type: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setIsTyping(true);

        try {
            const response = await sendMessage(text);
            const botMsg = {
                type: "bot",
                text: response.message,
                properties: response.properties,
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error("Error connecting to chat service:", error);
            const errorMsg = {
                type: "bot",
                text: "I'm sorry, I am having trouble connecting to my property database right now. Please try again in a moment.",
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleClearChat = () => {
        if (!window.confirm("Clear the entire chat history?")) return;
        localStorage.removeItem("client_chat_messages");
        setMessages([
            {
                type: "bot",
                text: "Hello! Welcome to Royal Crest Properties AI assistant. How can I help you find your dream home today?",
            }
        ]);
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ConversationAgent",
        "name": "Royal Crest Curator",
        "description": "AI assistant helping users find their dream properties."
    };

    return (
        <div className="chatbot-page-wrapper">
            <SEO
                title="AI Property Curator"
                description="Describe your dream home, budget, and location, and let our Royal Crest AI Curator instantly find your perfect match."
                keywords="AI real estate assistant, property finder chatbot, smart home curator"
                publisher="Royal Crest Properties"
                jsonLd={jsonLd}
            />
            <Navbar />
            
            <div className="chatbot-app-container">
                {/* Sidebar */}
                <aside className={`chatbot-sidebar ${isSidebarOpen ? "active" : "collapsed"}`}>
                    <div className="sidebar-header">
                        <div className="sidebar-brand">
                            <i className="bi bi-stars text-gold"></i>
                            <span>Suggestions</span>
                        </div>
                        <button className="sidebar-close-btn d-lg-none" onClick={() => setIsSidebarOpen(false)}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className="sidebar-content">
                        <p className="sidebar-desc text-muted">Click any prompt to instantly query the AI assistant:</p>
                        <div className="suggestion-chips-container">
                            {SUGGESTED_PROMPTS.map((prompt, idx) => (
                                <button 
                                    key={idx} 
                                    className="suggestion-chip-btn"
                                    onClick={() => handleSend(prompt)}
                                    disabled={isTyping}
                                >
                                    <i className="bi bi-chat-left-text me-2"></i>
                                    {prompt}
                                </button>
                            ))}
                        </div>
                        
                        <div className="sidebar-divider" />
                        
                        <h5 className="sidebar-title">Tips</h5>
                        <ul className="sidebar-tips-list text-muted">
                            <li>Specify location (e.g. Bandra, Mumbai).</li>
                            <li>Define budget constraints (e.g. under 1.5 Cr).</li>
                            <li>Detail the size (e.g. 2 BHK, 3 Bed).</li>
                        </ul>
                    </div>
                </aside>

                {/* Main Chat Area */}
                <main className="chatbot-main-content">
                    <div className="chatbot-header-bar">
                        <button className="sidebar-toggle-btn me-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <i className="bi bi-layout-sidebar-inset"></i>
                        </button>
                        <ChatHeader />
                        
                        <button 
                            className="chatbot-clear-btn ms-auto"
                            onClick={handleClearChat}
                            title="Clear conversation"
                        >
                            <i className="bi bi-trash3 me-1"></i>
                            <span>Clear Chat</span>
                        </button>
                    </div>

                    <div className="chatbot-chat-area">
                        {messages.length === 1 && (
                            <div className="chat-welcome-screen">
                                <div className="welcome-logo">
                                    <i className="bi bi-robot text-gold"></i>
                                </div>
                                <h2>Royal Crest Curator</h2>
                                <p>Describe your ideal home, budget, and location. Let's find your dream match.</p>
                                
                                <div className="welcome-prompts d-lg-none">
                                    {SUGGESTED_PROMPTS.map((prompt, idx) => (
                                        <button 
                                            key={idx} 
                                            className="suggestion-chip-btn text-center justify-content-center"
                                            onClick={() => handleSend(prompt)}
                                            disabled={isTyping}
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <ChatWindow messages={messages} isTyping={isTyping} />
                    </div>

                    <div className="chatbot-input-container">
                        <ChatInput onSend={handleSend} isTyping={isTyping} />
                        <div className="chat-footer-disclaimer">
                            Royal Crest AI Curator can make mistakes. Consider verifying important details.
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ChatBot;