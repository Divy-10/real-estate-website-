import AdminSidebar from "../components/AdminSidebar";

function AdminLayout({ children }) {
    return (
        <div className="d-flex">

            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-grow-1 p-4 bg-light" style={{ minHeight: "100vh" }}>
                {children}
            </div>

        </div>
    );
}

export default AdminLayout;