/**
 * QuickActions.jsx
 *
 * A horizontal scrollable row of suggested command chips displayed
 * at the top of the chat window. Clicking a chip sends it as a message.
 *
 * Props:
 *   onSelect {function} - Called with the chip text when clicked
 */

const QUICK_ACTIONS = [
  { icon: "📊", label: "Dashboard Stats",     command: "Show me dashboard statistics" },
  { icon: "🏠", label: "Create Property",     command: "Create a new property" },
  { icon: "📋", label: "All Properties",      command: "Show all properties" },
  { icon: "📬", label: "Today's Inquiries",   command: "Show today's inquiries" },
  { icon: "⏳", label: "Pending Inquiries",   command: "Show pending inquiries" },
  { icon: "👥", label: "All Users",           command: "Show all users" },
  { icon: "💡", label: "Generate SEO",        command: "Generate SEO content for a property" },
  { icon: "📱", label: "Social Media Post",   command: "Generate Instagram caption for a property" },
  { icon: "🏷️", label: "Available Properties",command: "Show available properties" },
  { icon: "🗑️", label: "Delete Property",     command: "Delete a property" },
];

function QuickActions({ onSelect }) {
  return (
    <div className="quick-actions-bar">
      <div className="quick-actions-label">Quick Actions</div>
      <div className="quick-actions-list">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            className="quick-action-chip"
            onClick={() => onSelect(action.command)}
            id={`quick-action-${action.label.toLowerCase().replace(/\s+/g, "-")}`}
            title={action.command}
          >
            <span className="chip-icon">{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
