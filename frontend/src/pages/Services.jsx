import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import FAQSection from "../components/home/FAQSection";
import CTASection from "../components/home/CTASection";
import useScrollAnimation from "../hooks/useScrollAnimation";
import services from "../data/services";

function Services() {
    const ref = useScrollAnimation();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "provider": {
            "@type": "Organization",
            "name": "Royal Crest Properties"
        },
        "serviceType": "Real Estate Services",
        "areaServed": "India",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Real Estate Services",
            "itemListElement": services.map((s) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": s.title,
                    "description": s.shortDesc
                }
            }))
        }
    };

    return (
        <>
            <SEO
                title="Our Services"
                description="Comprehensive real estate services including property buying, selling, rental management, interior design, and legal advisory. Expert guidance at every step."
                jsonLd={jsonLd}
            />
            <Navbar />
            <Breadcrumb items={[
                { label: "Home", path: "/" },
                { label: "Services" }
            ]} />

            <main>
                {/* Hero */}
                <section className="page-hero">
                    <div className="container">
                        <h1>Our Services</h1>
                        <p>
                            End-to-end real estate solutions — from finding your dream home to managing your investment portfolio.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="section-padding" ref={ref}>
                    <div className="container">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="row g-5 align-items-center mb-5 pb-4 animate-on-scroll"
                                style={{
                                    flexDirection: index % 2 !== 0 ? "row-reverse" : "row",
                                    borderBottom: index < services.length - 1 ? "1px solid var(--border-light)" : "none"
                                }}
                            >
                                <div className="col-lg-6">
                                    <div style={{
                                        borderRadius: "var(--radius-xl)",
                                        overflow: "hidden",
                                        height: "360px",
                                        boxShadow: "var(--shadow-md)"
                                    }}>
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            loading="lazy"
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div style={{
                                        width: "52px",
                                        height: "52px",
                                        background: "var(--accent-light)",
                                        borderRadius: "var(--radius-lg)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "16px"
                                    }}>
                                        <i className={`bi ${service.icon}`} style={{ fontSize: "24px", color: "var(--accent-primary)" }}></i>
                                    </div>
                                    <h2 style={{ fontSize: "var(--fs-h3)", fontWeight: 800, marginBottom: "12px" }}>
                                        {service.title}
                                    </h2>
                                    <p style={{ color: "var(--text-body)", lineHeight: 1.7, marginBottom: "20px" }}>
                                        {service.description}
                                    </p>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        {service.features.map((feature, i) => (
                                            <li key={i} style={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: "10px",
                                                marginBottom: "8px",
                                                fontSize: "14px",
                                                color: "var(--text-body)"
                                            }}>
                                                <i className="bi bi-check-circle-fill" style={{ color: "var(--success)", marginTop: "2px", flexShrink: 0 }}></i>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <FAQSection page="services" />
                <CTASection />
            </main>

            <Footer />
        </>
    );
}

export default Services;
