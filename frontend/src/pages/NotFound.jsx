import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function NotFound() {
    return (
        <>
            <SEO
                title="Page Not Found"
                description="The page you're looking for doesn't exist. Browse our properties, services, or return to the homepage."
                noindex={true}
            />

            <div style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, var(--bg-sky) 0%, var(--bg-primary) 100%)",
                padding: "40px 20px",
                textAlign: "center"
            }}>
                <div style={{ maxWidth: "500px" }}>
                    {/* Animated house icon */}
                    <div style={{
                        marginBottom: "32px",
                        animation: "float 3s ease-in-out infinite"
                    }}>
                        <div style={{
                            width: "120px",
                            height: "120px",
                            background: "var(--accent-light)",
                            borderRadius: "50%",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "16px"
                        }}>
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3z" fill="var(--accent-primary)" opacity="0.2" />
                                <path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3z" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                <line x1="8" y1="12" x2="16" y2="12" stroke="var(--accent-primary)" strokeWidth="1.5" opacity="0.5" />
                            </svg>
                        </div>
                    </div>

                    <div style={{
                        fontSize: "clamp(80px, 15vw, 120px)",
                        fontWeight: 800,
                        color: "var(--accent-primary)",
                        lineHeight: 1,
                        letterSpacing: "-4px",
                        marginBottom: "8px",
                        opacity: 0.15
                    }}>
                        404
                    </div>

                    <h1 style={{
                        fontSize: "clamp(24px, 4vw, 32px)",
                        fontWeight: 800,
                        marginBottom: "12px",
                        letterSpacing: "-0.5px"
                    }}>
                        Page Not Found
                    </h1>

                    <p style={{
                        color: "var(--text-muted)",
                        fontSize: "16px",
                        lineHeight: 1.7,
                        marginBottom: "32px"
                    }}>
                        Oops! The page you're looking for seems to have moved or doesn't exist. 
                        Let's get you back on track.
                    </p>

                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        <Link to="/" className="btn-accent py-3 px-5 text-decoration-none">
                            <i className="bi bi-house me-2"></i>Go Home
                        </Link>
                        <Link to="/properties" className="btn-luxury-outline py-3 px-5 text-decoration-none">
                            Browse Properties
                        </Link>
                    </div>

                    {/* Quick links */}
                    <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border-light)" }}>
                        <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "16px" }}>
                            Popular pages:
                        </p>
                        <div className="d-flex flex-wrap justify-content-center gap-3">
                            {[
                                { label: "Services", path: "/services" },
                                { label: "About", path: "/about" },
                                { label: "Blog", path: "/blog" },
                                { label: "Contact", path: "/contact" }
                            ].map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    style={{
                                        fontSize: "13px",
                                        color: "var(--accent-secondary)",
                                        fontWeight: 600,
                                        padding: "6px 14px",
                                        borderRadius: "var(--radius-full)",
                                        background: "var(--accent-light)",
                                        textDecoration: "none",
                                        transition: "var(--transition)"
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound;
