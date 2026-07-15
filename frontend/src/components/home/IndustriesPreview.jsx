import { Link } from "react-router-dom";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import industries from "../../data/industries";

function IndustriesPreview() {
    const ref = useScrollAnimation();

    return (
        <section className="section-padding section-bg" ref={ref}>
            <div className="container">
                <div className="text-center mb-5">
                    <span className="section-label animate-on-scroll" style={{ justifyContent: "center" }}>Industries</span>
                    <h2 className="section-title animate-on-scroll">Industries We Serve</h2>
                    <p className="section-subtitle mx-auto animate-on-scroll">
                        Specialized real estate solutions across diverse property segments to meet every need.
                    </p>
                </div>

                <div className="row g-4">
                    {industries.map((industry, index) => (
                        <div key={industry.id} className="col-md-6 col-lg-4">
                            <Link to="/industries" className={`text-decoration-none d-block animate-on-scroll animate-delay-${index + 1}`}>
                                <div className="premium-card h-100 d-flex align-items-start gap-3" style={{ padding: "24px" }}>
                                    <div style={{
                                        width: "50px",
                                        height: "50px",
                                        background: "var(--accent-light)",
                                        borderRadius: "var(--radius-md)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        <i className={`bi ${industry.icon}`} style={{ fontSize: "22px", color: "var(--accent-primary)" }}></i>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px", color: "var(--text-dark)" }}>
                                            {industry.title}
                                        </h3>
                                        <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "8px" }}>
                                            {industry.shortDesc}
                                        </p>
                                        <span className="badge-accent">{industry.stats}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default IndustriesPreview;
