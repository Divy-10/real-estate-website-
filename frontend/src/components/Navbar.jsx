import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light py-3 px-4 px-md-5">
            <div className="container-fluid px-0 d-flex align-items-center justify-content-between">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <span className="brand-icon me-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 18h16M4 14h16M4 10h16M12 4L4 10h16L12 4z" stroke="#0d6efd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <span className="brand-text">Royal Crest Properties</span>
                </Link>

                <div className="nav-links-wrapper">
                    <ul className="navbar-nav d-flex flex-row align-items-center gap-4">
                        <li className="nav-item">
                            <Link className="nav-link-custom active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link-custom" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link-custom" to="/properties">Properties</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link-custom" to="/contact">Agents</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link-custom" to="/chatbot">AI Chat</Link>
                        </li>
                    </ul>
                </div>

                <div className="nav-action-wrapper">
                    <Link to="/properties" className="btn-luxury-outline py-2 px-4 text-decoration-none">
                        Find A House
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;