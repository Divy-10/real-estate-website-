const actions = [
  { label: "➕ Create Property", command: "Create Property" },
  { label: "✏️ Update Property", command: "Update Property" },
  { label: "❌ Delete Property", command: "Delete Property" },
  { label: "🔍 Search Property", command: "Search Property" },
  { label: "📩 Show Inquiries", command: "Show Inquiries" },
  { label: "📊 Dashboard Statistics", command: "Dashboard Statistics" },
  { label: "⚡ Generate SEO", command: "Generate SEO" },
  { label: "📝 Generate Description", command: "Generate Description" }
];

function QuickActions({ onActionClick, disabled }) {
  return (
    <div className="quick-actions-container mb-3">
      <div className="d-flex flex-wrap gap-2 justify-content-center">
        {actions.map((act) => (
          <button
            key={act.command}
            type="button"
            className="btn btn-sm btn-light border py-1.5 px-3 quick-action-btn"
            onClick={() => onActionClick(act.command)}
            disabled={disabled}
            style={{
              fontSize: "13px",
              fontWeight: 500,
              borderRadius: "var(--radius-full)",
              transition: "var(--transition)",
              color: "var(--text-body)"
            }}
          >
            {act.label}
          </button>
        ))}
      </div>
      <style>{`
        .quick-action-btn:hover {
          background-color: var(--accent-light) !important;
          color: var(--accent-primary) !important;
          border-color: var(--accent-secondary) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}

export default QuickActions;
