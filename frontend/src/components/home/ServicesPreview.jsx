import { Link } from "react-router-dom";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import services from "../../data/services";

function ServicesPreview() {
    const ref = useScrollAnimation();

    return (
        <section className="section-padding" ref={ref}>
            <div className="container">
                <div className="text-center mb-5">
                    <span className="section-label animate-on-scroll" style={{ justifyContent: "center" }}>Our Services</span>
                    <h2 className="section-title animate-on-scroll">What We Offer</h2>
                    <p className="section-subtitle mx-auto animate-on-scroll">
                        Comprehensive real estate solutions tailored to your needs — from buying your dream home to managing your investment portfolio.
                    </p>
                </div>

                <div className="row g-4">
                    {services.map((service, index) => (
                        <div key={service.id} className="col-md-6 col-lg-4">
                            <div className={`premium-card text-center h-100 animate-on-scroll animate-delay-${index + 1}`}>
                                <div className="service-icon-wrapper mb-3">
                                    <i className={`bi ${service.icon}`} style={{
                                        fontSize: "32px",
                                        color: "var(--accent-primary)",
                                        background: "var(--accent-light)",
                                        width: "64px",
                                        height: "64px",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "var(--radius-lg)"
                                    }}></i>
                                </div>
                                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>
                                    {service.title}
                                </h3>
                                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 0 }}>
                                    {service.shortDesc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-5 animate-on-scroll">
                    <Link to="/services" className="btn-luxury-outline py-3 px-5 text-decoration-none">
                        Explore All Services <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default ServicesPreview;
