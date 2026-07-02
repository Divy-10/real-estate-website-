import "./chatbot.css";
import ChatHeader from "./ChatHeader";
import { useState, useRef, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import { sendMessage } from "../../services/chatApi";
import Navbar from "../Navbar";
import Footer from "../Footer";

const SUGGESTED_PROMPTS = [
    "Properties in Surat under ₹ 1 Cr",
    "Show me luxury villas in Mumbai",
    "5 BHK luxury farm-house in Ahemdabad",
    "Villas in Surat with 7 bedrooms",
];

const ChatBot = () => {
    const [messages, setMessages] = useState([
        {
            type: "bot",
            text: "Hello! Welcome to Royal Crest Properties AI assistant. How can I help you find your dream home today?",
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

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

    return (
        <div className="chatbot-page-wrapper">
            <Navbar />
            
            <div className="chatbot-hero-section">
                <div className="container">
                    <div className="chatbot-hero-content text-center py-4">
                        <span className="premium-badge">AI Assistant</span>
                        <h1 className="chatbot-main-title">Royal Crest Curator</h1>
                        <p className="chatbot-subtitle text-muted">
                            Describe your ideal home, budget, and location, and let our artificial intelligence curate the best match.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container pb-5">
                <div className="row g-4 justify-content-center">
                    {/* Sidebar with Suggestions */}
                    <div className="col-lg-3 d-none d-lg-block">
                        <div className="sidebar-card-luxury">
                            <h5 className="sidebar-title">Suggestions</h5>
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
                            
                            <hr className="my-4" />
                            
                            <h5 className="sidebar-title">Tips</h5>
                            <ul className="sidebar-tips-list text-muted">
                                <li>Specify location (e.g. Bandra, Mumbai).</li>
                                <li>Define budget constraints (e.g. under 1.5 Cr).</li>
                                <li>Detail the size (e.g. 2 BHK, 3 Bed).</li>
                            </ul>
                        </div>
                    </div>

                    {/* Chatbot Interface */}
                    <div className="col-lg-8 col-md-12">
                        <div className="chat-container">
                            <ChatHeader />
                            <ChatWindow messages={messages} isTyping={isTyping} />
                            <ChatInput onSend={handleSend} isTyping={isTyping} />
                        </div>
                        {/* Mobile suggestion view */}
                        <div className="d-block d-lg-none mt-3 px-2">
                            <div className="d-flex flex-wrap gap-2 justify-content-center">
                                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                                    <button 
                                        key={idx} 
                                        className="suggestion-chip-btn mobile-chip"
                                        onClick={() => handleSend(prompt)}
                                        disabled={isTyping}
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ChatBot;