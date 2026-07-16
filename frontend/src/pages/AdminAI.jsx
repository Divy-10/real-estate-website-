/**
 * AdminAI.jsx
 *
 * The Admin AI Assistant page.
 * Wrapped in AdminLayout + ProtectedRoute in App.jsx.
 *
 * This page simply renders the full-screen AIChat component
 * with the dark background design system loaded.
 */

import AIChat from "../components/AdminAI/AIChat";
import "../components/AdminAI/AdminAI.css";

function AdminAI() {
  return (
    <div
      className="ai-assistant-page"
      id="admin-ai-page"
    >
      <AIChat />
    </div>
  );
}

export default AdminAI;
