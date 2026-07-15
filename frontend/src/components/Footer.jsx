import { Link } from "react-router-dom";
import NewsletterForm from "./NewsletterForm";
import "./Footer.css";

function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about" },
        { label: "Properties", path: "/properties" },
        { label: "Blog", path: "/blog" },
        { label: "Gallery", path: "/gallery" },
        { label: "Contact", path: "/contact" },
    ];

    const serviceLinks = [
        { label: "Property Buying", path: "/services" },
        { label: "Property Selling", path: "/services" },
        { label: "Rental Services", path: "/services" },
        { label: "Property Management", path: "/services" },
        { label: "Interior Design", path: "/services" },
        { label: "Legal Advisory", path: "/services" },
    ];

    const socialLinks = [
        { icon: "bi-facebook", url: "#", label: "Facebook" },
        { icon: "bi-instagram", url: "#", label: "Instagram" },
        { icon: "bi-linkedin", url: "#", label: "LinkedIn" },
        { icon: "bi-youtube", url: "#", label: "YouTube" },
        { icon: "bi-twitter-x", url: "#", label: "Twitter" },
    ];

    return (
        <footer className="footer-premium" role="contentinfo">
            {/* Newsletter Section */}
            <div className="container">
                <div className="footer-newsletter-wrapper">
                    <NewsletterForm />
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container py-5">
                <div className="row g-4 g-lg-5">
                    {/* Brand Column */}
                    <div className="col-lg-4 col-md-6">
                        <Link to="/" className="footer-brand d-flex align-items-center mb-3">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3z" fill="rgba(59,130,246,0.3)" />
                                <path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3z" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                            <span className="ms-2 footer-brand-text">Royal Crest Properties</span>
                        </Link>
                        <p className="footer-desc">
                            Premium real estate services delivering trust, transparency, and a signature standard of excellence. Your dream home journey starts with us.
                        </p>
                        <div className="footer-social-links">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label={social.label}
                                    title={social.label}
                                >
                                    <i className={`bi ${social.icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6 col-6">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="col-lg-3 col-md-6 col-6">
                        <h4 className="footer-heading">Our Services</h4>
                        <ul className="footer-links">
                            {serviceLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-lg-3 col-md-6">
                        <h4 className="footer-heading">Contact Us</h4>
                        <ul className="footer-contact">
                            <li>
                                <i className="bi bi-geo-alt"></i>
                                <span>123 Business Avenue, Mumbai, Maharashtra 400001</span>
                            </li>
                            <li>
                                <i className="bi bi-telephone"></i>
                                <a href="tel:+919999999999">+91 99999 99999</a>
                            </li>
                            <li>
                                <i className="bi bi-envelope"></i>
                                <a href="mailto:info@royalcrest.com">info@royalcrest.com</a>
                            </li>
                            <li>
                                <i className="bi bi-clock"></i>
                                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                        <p className="mb-0 footer-copyright">
                            © {currentYear} Royal Crest Properties. All rights reserved.
                        </p>
                        <div className="footer-bottom-links">
                            <Link to="/privacy-policy">Privacy Policy</Link>
                            <span className="footer-dot">•</span>
                            <Link to="/terms-conditions">Terms & Conditions</Link>
                            <span className="footer-dot">•</span>
                            <Link to="/careers">Careers</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;