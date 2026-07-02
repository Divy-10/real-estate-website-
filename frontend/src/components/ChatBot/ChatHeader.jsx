const ChatHeader = () => {
    return (
        <div className="chat-header-luxury">
            <div className="d-flex align-items-center gap-3">
                <div className="chat-header-icon">
                    <i className="bi bi-cpu text-gold"></i>
                </div>
                <div>
                    <h3 className="m-0 chat-header-title">Royal Crest AI</h3>
                    <div className="d-flex align-items-center gap-1.5 status-wrapper">
                        <span className="status-dot"></span>
                        <span className="status-text">Curator bot is online</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;