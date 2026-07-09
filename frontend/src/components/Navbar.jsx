import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-light py-3 px-4 px-md-5">
            <div className="container-fluid px-0 d-flex align-items-center justify-content-between position-relative">
                {/* Logo */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <span className="brand-icon me-2">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 18h16M4 14h16M4 10h16M12 4L4 10h16L12 4z"
                                stroke="#0d6efd"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                    <span className="brand-text">Royal Crest Properties</span>
                </Link>

                {/* Mobile Toggler Custom Button */}
                <button
                    className="navbar-toggler-custom d-lg-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    <i className={menuOpen ? "bi bi-x" : "bi bi-list"}></i>
                </button>

                {/* Collapsible Content */}
                <div className={`nav-collapse-container ${menuOpen ? "show" : ""}`}>
                    {/* Navigation Links */}
                    <div className="nav-links-wrapper">
                        <ul className="navbar-nav d-flex flex-row align-items-center gap-4">
                            <li className="nav-item">
                                <Link className="nav-link-custom active" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link-custom" to="/about">
                                    About Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link-custom" to="/properties">
                                    Properties
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link-custom" to="/contact">
                                    Agents
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link-custom" to="/chatbot">
                                    AI Chat
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link-custom d-flex align-items-center gap-1" to="/favorites">
                                    <i className="bi bi-heart-fill text-danger"></i> Favorites
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Right Side Actions */}
                    <div className="nav-action-wrapper d-flex align-items-center gap-3">
                        <Link to="/properties" className="btn-luxury-outline py-2 px-4 text-decoration-none">
                            Find A House
                        </Link>

                        {user ? (
                            <>
                                <Link to="/profile" className="welcome-text">
                                    Welcome, {user.name}
                                </Link>
                                <button className="btn btn-danger" onClick={logout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-dark">
                                    Login
                                </Link>
                                <Link to="/signup" className="btn btn-dark">
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}


export default Navbar;