import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import CTASection from "../components/home/CTASection";
import useScrollAnimation from "../hooks/useScrollAnimation";
import industries from "../data/industries";

function Industries() {
    const ref = useScrollAnimation();

    return (
        <>
            <SEO
                title="Industries We Serve"
                description="Specialized real estate solutions across residential, commercial, industrial, luxury, land, and rental segments. Find properties in your niche with Royal Crest."
            />
            <Navbar />
            <Breadcrumb items={[
                { label: "Home", path: "/" },
                { label: "Industries" }
            ]} />

            <main>
                <section className="page-hero">
                    <div className="container">
                        <h1>Industries We Serve</h1>
                        <p>
                            Specialized real estate solutions across diverse property segments to meet every need and investment goal.
                        </p>
                    </div>
                </section>

                <section className="section-padding" ref={ref}>
                    <div className="container">
                        <div className="row g-4">
                            {industries.map((industry, index) => (
                                <div key={industry.id} className="col-md-6">
                                    <div className={`animate-on-scroll animate-delay-${(index % 4) + 1}`} style={{
                                        background: "var(--bg-primary)",
                                        border: "1px solid var(--border-light)",
                                        borderRadius: "var(--radius-xl)",
                                        overflow: "hidden",
                                        transition: "var(--transition-smooth)",
                                        height: "100%"
                                    }}>
                                        <div style={{ height: "240px", overflow: "hidden" }}>
                                            <img
                                                src={industry.image}
                                                alt={`${industry.title} real estate properties`}
                                                loading="lazy"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    transition: "transform 0.5s ease"
                                                }}
                                            />
                                        </div>
                                        <div style={{ padding: "28px" }}>
                                            <div className="d-flex align-items-center gap-3 mb-3">
                                                <div style={{
                                                    width: "44px",
                                                    height: "44px",
                                                    background: "var(--accent-light)",
                                                    borderRadius: "var(--radius-md)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    <i className={`bi ${industry.icon}`} style={{ fontSize: "20px", color: "var(--accent-primary)" }}></i>
                                                </div>
                                                <div>
                                                    <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "2px" }}>
                                                        {industry.title}
                                                    </h2>
                                                    <span className="badge-accent">{industry.stats}</span>
                                                </div>
                                            </div>
                                            <p style={{
                                                color: "var(--text-body)",
                                                fontSize: "14px",
                                                lineHeight: 1.7,
                                                marginBottom: 0
                                            }}>
                                                {industry.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <CTASection />
            </main>

            <Footer />
        </>
    );
}

export default Industries;
