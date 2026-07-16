/**
 * PropertySummary.jsx
 *
 * Renders a structured property summary card inside a chat message bubble
 * before the admin confirms property creation.
 *
 * Props:
 *   data       {object}   - Pending property data collected during multi-turn flow
 *   onConfirm  {function} - Called when admin clicks "✅ Create Property"
 *   onCancel   {function} - Called when admin clicks "❌ Cancel"
 *   loading    {boolean}  - Disables buttons while API call is in progress
 */

function PropertySummary({ data = {}, onConfirm, onCancel, loading }) {
  const formatPrice = (price) => {
    if (!price) return "N/A";
    const num = typeof price === "number" ? price : parseFloat(price);
    if (isNaN(num)) return data.priceRaw || String(price);
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000)   return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  const fields = [
    { label: "Title",     value: data.title,               icon: "🏠", full: true },
    { label: "Price",     value: formatPrice(data.price),  icon: "💰" },
    { label: "Location",  value: data.location,            icon: "📍" },
    { label: "Category",  value: data.category,            icon: "🏷️" },
    { label: "Bedrooms",  value: data.bedrooms,            icon: "🛏️" },
    { label: "Bathrooms", value: data.bathrooms,           icon: "🚿" },
    { label: "Area",      value: data.area ? `${data.area} sqft` : "N/A", icon: "📐" },
    { label: "Status",    value: data.status || "available", icon: "🔵" },
  ];

  const hasImage = !!data.image;
  const unitCount = data.units?.length || 0;

  return (
    <div className="property-summary-card">

      {/* Header */}
      <div className="property-summary-header">
        <span>📋</span>
        <span>Property Summary — Review Before Creating</span>
      </div>

      {/* Fields grid */}
      <div className="property-summary-body">
        {fields.map((f) => (
          <div key={f.label} className={`summary-field ${f.full ? "full-width" : ""}`}>
            <label>{f.icon} {f.label}</label>
            <span>{f.value || "N/A"}</span>
          </div>
        ))}

        {/* Images/Units row */}
        <div className="summary-field full-width">
          <label>📸 Media & Units</label>
          <div className="summary-images">
            <div className={`summary-img-badge`} style={
              hasImage
                ? { background: "rgba(16,185,129,0.1)", borderColor: "rgba(16,185,129,0.25)", color: "#6ee7b7" }
                : { background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.2)", color: "#f87171" }
            }>
              {hasImage ? "✅" : "❌"} Cover Image
            </div>
            {unitCount > 0 && (
              <div className="summary-img-badge" style={{ background: "rgba(59,130,246,0.1)", borderColor: "rgba(59,130,246,0.25)", color: "#93c5fd" }}>
                🏗️ {unitCount} Units
              </div>
            )}
          </div>
        </div>

        {/* Units list if available */}
        {unitCount > 0 && (
          <div className="summary-field full-width">
            <label>🏗️ Generated Units List</label>
            <div style={{
              maxHeight: "100px",
              overflowY: "auto",
              background: "rgba(0,0,0,0.2)",
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "12.5px",
              color: "#94a3b8",
              fontFamily: "monospace",
              display: "flex",
              flexWrap: "wrap",
              gap: "6px"
            }}>
              {data.units.map((u) => (
                <span key={u.unitNumber} style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}>
                  {u.unitNumber}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* AI Description if available */}
        {data.aiDescription && (
          <div className="summary-field full-width">
            <label>💡 AI Generated Description</label>
            <span style={{ fontSize: "12.5px", color: "#94a3b8", fontStyle: "italic" }}>
              "{data.aiDescription}"
            </span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="summary-actions">
        <button
          className="msg-action-btn primary"
          onClick={onConfirm}
          disabled={loading}
          id="ai-confirm-create-btn"
        >
          {loading ? "Creating..." : "✅ Create Property"}
        </button>
        <button
          className="msg-action-btn secondary"
          onClick={onCancel}
          disabled={loading}
          id="ai-cancel-create-btn"
        >
          ❌ Cancel
        </button>
      </div>

    </div>
  );
}

export default PropertySummary;
