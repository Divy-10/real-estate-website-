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