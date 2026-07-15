import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
    return (
        <section className="hero-wrapper" aria-label="Hero section">
            <div className="container-fluid px-4 px-md-5">
                <div className="row align-items-center">
                    {/* Left Column: Content */}
                    <div className="col-lg-6 hero-text-col py-5">
                        <div className="hero-badge">
                            <i className="bi bi-stars me-1"></i>
                            India's Premium Real Estate Platform
                        </div>
                        <h1 className="hero-title">
                            Find A Home<br />That Suits You
                        </h1>
                        <p className="hero-subtitle">
                            Discover premium properties across India with expert guidance, 
                            verified listings, and end-to-end support for your dream home journey.
                        </p>
                        <div className="hero-cta-wrapper d-flex flex-wrap gap-3">
                            <Link to="/properties" className="btn-accent py-3 px-5 text-decoration-none" style={{ fontSize: "15px" }}>
                                Explore Properties <i className="bi bi-arrow-right ms-1"></i>
                            </Link>
                            <Link to="/contact" className="btn-luxury-outline py-3 px-5 text-decoration-none" style={{ fontSize: "15px" }}>
                                Book Consultation
                            </Link>
                        </div>

                        {/* Trust indicators */}
                        <div className="hero-trust d-flex align-items-center gap-4 mt-4 flex-wrap">
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-patch-check-fill" style={{ color: "var(--accent-secondary)" }}></i>
                                <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 500 }}>RERA Verified</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-shield-fill-check" style={{ color: "var(--success)" }}></i>
                                <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 500 }}>100% Secure</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-star-fill" style={{ color: "#f59e0b" }}></i>
                                <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 500 }}>4.9/5 Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="col-lg-6 hero-img-col px-0 ps-lg-4">
                        <div className="hero-image-container">
                            <img
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                                alt="Modern luxury house with pool and contemporary architecture"
                                className="hero-img"
                                loading="eager"
                                fetchPriority="high"
                            />
                            {/* Floating stat card */}
                            <div className="hero-float-card">
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{
                                        width: "42px",
                                        height: "42px",
                                        borderRadius: "50%",
                                        background: "var(--accent-light)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <i className="bi bi-building" style={{ color: "var(--accent-primary)", fontSize: "18px" }}></i>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-dark)", lineHeight: 1 }}>
                                            1,200+
                                        </div>
                                        <div style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
                                            Properties Listed
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;