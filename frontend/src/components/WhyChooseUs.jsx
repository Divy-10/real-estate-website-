import useScrollAnimation from "../hooks/useScrollAnimation";

const features = [
    {
        icon: "bi-shield-check",
        title: "100% Verified",
        desc: "Every property is thoroughly verified for legal compliance, title clearance, and quality standards."
    },
    {
        icon: "bi-graph-up-arrow",
        title: "Best Market Value",
        desc: "Data-driven pricing ensures you always get the best deal, whether buying or selling."
    },
    {
        icon: "bi-people",
        title: "Expert Agents",
        desc: "Our RERA-certified agents bring years of local market expertise and personalized service."
    },
    {
        icon: "bi-headset",
        title: "24/7 Support",
        desc: "Round-the-clock assistance via phone, WhatsApp, and email for all your queries."
    },
    {
        icon: "bi-file-earmark-check",
        title: "Legal Assurance",
        desc: "Complete legal support including documentation, title verification, and registration."
    },
    {
        icon: "bi-lightning-charge",
        title: "Fast Processing",
        desc: "Streamlined processes ensure quick turnaround from shortlisting to possession."
    }
];

function WhyChooseUs() {
    const ref = useScrollAnimation();

    return (
        <section className="section-padding" ref={ref}>
            <div className="container">
                <div className="row g-5 align-items-center">
                    {/* Left content */}
                    <div className="col-lg-5">
                        <div className="animate-on-scroll">
                            <span className="section-label">Why Choose Us</span>
                            <h2 className="section-title">
                                India's Most Trusted Real Estate Partner
                            </h2>
                            <p className="section-subtitle">
                                We combine technology, expertise, and genuine care to deliver an unmatched property experience. Here's why thousands choose Royal Crest.
                            </p>
                            <div className="section-divider"></div>
                        </div>
                    </div>

                    {/* Right grid */}
                    <div className="col-lg-7">
                        <div className="row g-3">
                            {features.map((feature, index) => (
                                <div key={feature.title} className="col-sm-6">
                                    <div className={`d-flex align-items-start gap-3 animate-on-scroll animate-delay-${index + 1}`} style={{ padding: "20px" }}>
                                        <div style={{
                                            width: "44px",
                                            height: "44px",
                                            background: "var(--accent-light)",
                                            borderRadius: "var(--radius-md)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0
                                        }}>
                                            <i className={`bi ${feature.icon}`} style={{ fontSize: "20px", color: "var(--accent-primary)" }}></i>
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
                                                {feature.title}
                                            </h4>
                                            <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 0 }}>
                                                {feature.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;