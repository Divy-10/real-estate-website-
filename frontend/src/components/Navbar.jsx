import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";


function Navbar() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/services", label: "Services" },
        { path: "/properties", label: "Properties" },
        { path: "/industries", label: "Industries" },
        { path: "/blog", label: "Blog" },
        { path: "/gallery", label: "Gallery" },
        { path: "/chatbot", label: "AI Chat" },
        { path: "/favorites", label: "Favorites", icon: "bi-heart-fill text-danger" },
        { path: "/contact", label: "Contact" },
    ];

    return (
        <nav className={`navbar navbar-expand-lg py-3 px-4 px-md-5 ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Main navigation">
            <div className="container-fluid px-0 d-flex align-items-center justify-content-between position-relative">
                {/* Logo */}
                <Link className="navbar-brand d-flex align-items-center" to="/" aria-label="Royal Crest Properties - Home">
                    <span className="brand-icon me-2">
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3z"
                                fill="var(--accent-primary)"
                                opacity="0.15"
                            />
                            <path
                                d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3z"
                                stroke="var(--accent-primary)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                            />
                        </svg>
                    </span>
                    <span className="brand-text">Royal Crest</span>
                </Link>

                {/* Right side mobile: theme + hamburger */}
                <div className="d-flex align-items-center gap-2 d-lg-none">
                    <ThemeToggle />
                    <button
                        className="navbar-toggler-custom"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation"
                        aria-expanded={menuOpen}
                    >
                        <i className={menuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
                    </button>
                </div>

                {/* Collapsible Content */}
                <div className={`nav-collapse-container ${menuOpen ? "show" : ""}`}>
                    {/* Navigation Links */}
                    <div className="nav-links-wrapper">
                        <ul className="navbar-nav d-flex flex-row align-items-center gap-1">
                            {navLinks.map((link) => (
                                <li className="nav-item" key={link.path}>
                                    <Link
                                        className={`nav-link-custom ${isActive(link.path) ? "active" : ""}`}
                                        to={link.path}
                                        style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                                    >
                                        {link.icon && <i className={`bi ${link.icon}`}></i>}
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Side Actions */}
                    <div className="nav-action-wrapper d-flex align-items-center gap-3">
                        <div className="d-none d-lg-flex">
                            <ThemeToggle />
                        </div>

                        {user ? (
                            <>
                                <Link to="/profile" className="nav-link-custom welcome-text">
                                    <i className="bi bi-person-circle me-1"></i>
                                    {user.name}
                                </Link>
                                <button className="btn-luxury-outline py-2 px-3" onClick={logout} style={{ fontSize: "13px" }}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn-luxury-outline py-2 px-3 text-decoration-none" style={{ fontSize: "13px" }}>
                                    Login
                                </Link>
                                <Link to="/signup" className="btn-luxury-dark py-2 px-3 text-decoration-none" style={{ fontSize: "13px" }}>
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