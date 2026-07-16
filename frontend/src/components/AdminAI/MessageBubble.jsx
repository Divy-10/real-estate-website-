/**
 * MessageBubble.jsx
 *
 * Renders a single chat message — supports:
 *   • Plain text (with inline markdown rendering)
 *   • Image previews (uploaded files)
 *   • Property summary card (showSummary flag)
 *   • Action buttons (confirm/cancel property creation)
 *
 * Props:
 *   message  {object} - { role, text, imageSrc, data, timestamp }
 *   onAction {function} - Callback for action buttons: onAction(actionType)
 *   loading  {boolean}  - For disabling confirm buttons during API calls
 */

import PropertySummary from "./PropertySummary";

/** Simple markdown → JSX renderer for bold, italic, inline code, blockquote */
const renderMarkdown = (text) => {
  if (!text) return null;

  const lines = text.split("\n");
  const elements = [];
  let key = 0;

  for (const line of lines) {
    if (!line.trim()) {
      elements.push(<br key={key++} />);
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={key++}>{parseLine(line.slice(2))}</blockquote>
      );
      continue;
    }

    // List items
    if (line.startsWith("- ") || line.startsWith("• ")) {
      elements.push(
        <div key={key++} style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
          <span style={{ color: "#3b82f6", flexShrink: 0, marginTop: "2px" }}>•</span>
          <span>{parseLine(line.slice(2))}</span>
        </div>
      );
      continue;
    }

    // Numbered list
    const numMatch = line.match(/^(\d+)\.\s(.+)/);
    if (numMatch) {
      elements.push(
        <div key={key++} style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
          <span style={{ color: "#64748b", flexShrink: 0, minWidth: "18px" }}>{numMatch[1]}.</span>
          <span>{parseLine(numMatch[2])}</span>
        </div>
      );
      continue;
    }

    // Heading
    if (line.startsWith("### ")) {
      elements.push(<h3 key={key++}>{parseLine(line.slice(4))}</h3>);
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h3 key={key++} style={{ fontSize: "15px" }}>{parseLine(line.slice(3))}</h3>
      );
      continue;
    }

    // Normal paragraph
    elements.push(<p key={key++}>{parseLine(line)}</p>);
  }

  return elements;
};

/** Inline parser: **bold**, *italic*, `code` */
const parseLine = (text) => {
  if (!text) return text;

  const parts = [];
  // Pattern: **bold** | *italic* | `code`
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let lastIdx = 0;
  let match;
  let k = 0;

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }

    if (match[2]) {
      parts.push(<strong key={k++}>{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={k++}>{match[3]}</em>);
    } else if (match[4]) {
      parts.push(<code key={k++}>{match[4]}</code>);
    }

    lastIdx = regex.lastIndex;
  }

  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }

  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : parts;
};

function MessageBubble({ message, onAction, loading }) {
  const { role, text, imageSrc, data, timestamp } = message;
  const isAI = role === "model" || role === "ai";

  const timeStr = timestamp
    ? new Date(timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div className={`message-row ${isAI ? "ai" : "user"}`}>

      {/* Avatar */}
      <div className={`msg-avatar ${isAI ? "ai-av" : "user-av"}`}>
        {isAI ? "🤖" : "👤"}
      </div>

      {/* Content */}
      <div className="msg-content">

        {/* Main text bubble */}
        {text && (
          <div className={`msg-bubble ${isAI ? "ai" : "user"}`}>
            {isAI ? renderMarkdown(text) : text}
          </div>
        )}

        {/* Image preview (e.g. after upload) */}
        {imageSrc && (
          <div className="msg-image-preview">
            <img src={imageSrc} alt="Uploaded property" />
          </div>
        )}

        {/* Property summary card */}
        {data?.showSummary && data?.pendingData && (
          <PropertySummary
            data={data.pendingData}
            loading={loading}
            onConfirm={() => onAction("confirm_create")}
            onCancel={() => onAction("cancel_create")}
          />
        )}

        {/* AI image analysis — "Use AI Description" action */}
        {data?.analysis && (
          <div className="msg-actions">
            <button
              id="ai-use-description-btn"
              className="msg-action-btn primary"
              onClick={() => onAction("use_ai_description", data.analysis.description)}
            >
              ✨ Use AI Description
            </button>
            <button
              id="ai-skip-description-btn"
              className="msg-action-btn secondary"
              onClick={() => onAction("skip_description")}
            >
              Keep My Own
            </button>
          </div>
        )}

        {/* Timestamp */}
        {timeStr && <div className="msg-time">{timeStr}</div>}
      </div>
    </div>
  );
}

export default MessageBubble;
