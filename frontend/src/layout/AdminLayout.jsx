import { useLocation } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout({ children }) {
    const location = useLocation();

    // The AI Assistant page needs full height with no padding/background
    // so its dark glassmorphism design can render edge-to-edge.
    const isAIPage = location.pathname === "/admin/ai-assistant";

    return (
        <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>

            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div
                className={isAIPage ? "" : "flex-grow-1 p-4 bg-light"}
                style={{
                    flexGrow: 1,
                    minHeight: "100vh",
                    overflow: isAIPage ? "hidden" : "auto",
                    display: isAIPage ? "flex" : "block",
                    flexDirection: isAIPage ? "column" : undefined,
                }}
            >
                {children}
            </div>

        </div>
    );
}

export default AdminLayout;