import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        alert("Logged out succesfully");
        navigate("/");
    };

    return (
        <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>

            <h3 className="mb-4">Admin Panel</h3>

            <ul className="nav flex-column">

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/admin">
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/admin/properties">
                        Properties
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/admin/add-property">
                        Add Property
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/admin/inquiries">
                        Inquiries
                    </Link>
                </li>

                {/* AI Assistant — new menu item */}
                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white d-flex align-items-center gap-2"
                        to="/admin/ai-assistant"
                        style={{
                            background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
                            borderRadius: "8px",
                            border: "1px solid rgba(59,130,246,0.25)",
                            padding: "8px 12px",
                            marginTop: "4px",
                        }}
                    >
                        <span>⭐</span>
                        <span>AI Assistant</span>
                    </Link>
                </li>

                <hr />

                <li className="nav-item">
                    <button
                        className="btn btn-danger w-100"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </li>

            </ul>

        </div>
    );
};

export default AdminSidebar;