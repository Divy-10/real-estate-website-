import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);

            alert("Login successful");
            navigate("/admin");
        } catch (error) {
            console.log(error)
            alert("Invalid credentials");
        }
    };

    return (
        <div className="admin-login-wrapper">
            <div className="admin-login-box">
                <h2>Admin Login</h2>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control mb-3"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control mb-3"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn w-100">
                        Login
                    </button>

                    <div className="hint">
                        Secure Admin Access Only
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;