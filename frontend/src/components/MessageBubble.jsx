import { getBackendUrl } from "../utils/config";

function MessageBubble({ message }) {
  const isBot = message.type === "bot" || message.type === "assistant";
  
  const formatText = (text) => {
    return text.split("\n").map((line, idx) => (
      <div key={idx} style={{ marginBottom: "4px" }}>
        {line}
      </div>
    ));
  };

  return (
    <div className={`d-flex ${isBot ? "justify-content-start" : "justify-content-end"} mb-3`}>
      <div
        className={`p-3 rounded-3 shadow-xs ${
          isBot
            ? "bg-white border text-dark"
            : "bg-primary text-white"
        }`}
        style={{
          maxWidth: "75%",
          minWidth: "120px",
          borderRadius: isBot ? "16px 16px 16px 4px" : "16px 16px 4px 16px"
        }}
      >
        {/* Attachment Image Preview (if present) */}
        {message.image && (
          <div className="mb-2 rounded overflow-hidden" style={{ maxHeight: "200px" }}>
            <img
              src={
                typeof message.image === "string"
                  ? getBackendUrl(message.image)
                  : URL.createObjectURL(message.image)
              }
              alt="Uploaded context"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Message Text */}
        <div style={{ fontSize: "14px", lineHeight: 1.6 }}>
          {formatText(message.text)}
        </div>

        {/* Dynamic Action Data Rendering (Optional) */}
        {message.actionData && message.actionData.stats && (
          <div className="row g-2 mt-2 pt-2 border-top" style={{ fontSize: "12px" }}>
            <div className="col-6"><strong>Properties:</strong> {message.actionData.stats.properties}</div>
            <div className="col-6"><strong>Inquiries:</strong> {message.actionData.stats.inquiries}</div>
            <div className="col-6"><strong>Active Users:</strong> {message.actionData.stats.users}</div>
            <div className="col-6"><strong>Available Units:</strong> {message.actionData.stats.units}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
