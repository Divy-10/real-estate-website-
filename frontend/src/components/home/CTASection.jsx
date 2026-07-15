import { Link } from "react-router-dom";
import useScrollAnimation from "../../hooks/useScrollAnimation";

function CTASection() {
    const ref = useScrollAnimation();

    return (
        <section
            ref={ref}
            style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
                padding: "clamp(60px, 8vw, 100px) 0",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* Decorative circles */}
            <div style={{
                position: "absolute",
                top: "-100px",
                left: "-100px",
                width: "400px",
                height: "400px",
                background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%)",
                borderRadius: "50%"
            }}></div>
            <div style={{
                position: "absolute",
                bottom: "-80px",
                right: "-80px",
                width: "300px",
                height: "300px",
                background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 60%)",
                borderRadius: "50%"
            }}></div>

            <div className="container text-center position-relative" style={{ zIndex: 1 }}>
                <div className="animate-on-scroll" style={{ maxWidth: "700px", margin: "0 auto" }}>
                    <span
                        style={{
                            display: "inline-block",
                            padding: "6px 16px",
                            borderRadius: "var(--radius-full)",
                            background: "rgba(59,130,246,0.15)",
                            color: "#60a5fa",
                            fontSize: "12px",
                            fontWeight: 600,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            marginBottom: "20px"
                        }}
                    >
                        Get Started Today
                    </span>

                    <h2 style={{
                        fontSize: "clamp(28px, 4vw, 44px)",
                        fontWeight: 800,
                        color: "#ffffff",
                        lineHeight: 1.2,
                        marginBottom: "20px",
                        letterSpacing: "-1px"
                    }}>
                        Ready to Find Your Dream Property?
                    </h2>

                    <p style={{
                        fontSize: "17px",
                        color: "#94a3b8",
                        lineHeight: 1.7,
                        marginBottom: "36px"
                    }}>
                        Let our expert team guide you through every step of your real estate journey. 
                        Schedule a free consultation today.
                    </p>

                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        <Link
                            to="/contact"
                            className="btn-accent py-3 px-5 text-decoration-none"
                            style={{ fontSize: "15px" }}
                        >
                            Contact Us <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                        <Link
                            to="/properties"
                            className="text-decoration-none"
                            style={{
                                padding: "14px 32px",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "var(--radius-sm)",
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: "15px",
                                transition: "var(--transition)",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px"
                            }}
                        >
                            Browse Properties
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTASection;
