import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import CTASection from "../components/home/CTASection";
import useScrollAnimation from "../hooks/useScrollAnimation";

const team = [
    { name: "Divy Patel", role: "Founder & CEO", desc: "15+ years in real estate advisory and investment." },
    { name: "Priya Sharma", role: "Head of Sales", desc: "Expert in luxury residential transactions." },
    { name: "Amit Reddy", role: "Legal Director", desc: "Specializes in real estate law and RERA compliance." },
    { name: "Sneha Gupta", role: "Design Head", desc: "Award-winning interior design professional." }
];

const values = [
    { icon: "bi-shield-check", title: "Trust", desc: "We build lasting relationships through transparency and integrity in every transaction." },
    { icon: "bi-bullseye", title: "Excellence", desc: "We deliver premium service quality that exceeds expectations at every touchpoint." },
    { icon: "bi-lightbulb", title: "Innovation", desc: "We leverage technology and data to provide smarter real estate solutions." },
    { icon: "bi-people", title: "Client First", desc: "Your goals are our priority. We tailor every interaction to your unique needs." }
];

function About() {
    const ref = useScrollAnimation();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Royal Crest Properties",
        "description": "Premium real estate advisory delivering trust, transparency, and excellence.",
        "foundingDate": "2010",
        "numberOfEmployees": { "@type": "QuantitativeValue", "value": "50+" },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Business Avenue",
            "addressLocality": "Mumbai",
            "addressRegion": "Maharashtra",
            "postalCode": "400001",
            "addressCountry": "IN"
        }
    };

    return (
        <>
            <SEO
                title="About Us"
                description="Learn about Royal Crest Properties — India's premium real estate advisory with 15+ years of experience, 4500+ happy clients, and a commitment to trust and transparency."
                jsonLd={jsonLd}
            />
            <Navbar />
            <Breadcrumb items={[
                { label: "Home", path: "/" },
                { label: "About Us" }
            ]} />

            <main ref={ref}>
                {/* Hero */}
                <section className="page-hero">
                    <div className="container">
                        <h1>About Us</h1>
                        <p>Helping people find their dream properties with trust, transparency, and a signature standard of excellence.</p>
                    </div>
                </section>

                {/* Story Section */}
                <section className="section-padding">
                    <div className="container">
                        <div className="row g-5 align-items-center">
                            <div className="col-lg-6 animate-on-scroll fade-left">
                                <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", height: "420px", boxShadow: "var(--shadow-xl)" }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                                        alt="Royal Crest Properties team at work"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 animate-on-scroll fade-right">
                                <span className="section-label">Who We Are</span>
                                <h2 className="section-title">Architecting Lifestyles, Not Just Spaces</h2>
                                <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "16px" }}>
                                    Founded in 2010, Royal Crest Properties has grown from a boutique real estate firm to one of India's most trusted property advisory brands. 
                                    Our curated approach combines deep market knowledge with personalized service.
                                </p>
                                <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "24px", fontSize: "15px" }}>
                                    Through expert guidance, state-of-the-art market evaluation, and a commitment to excellence, 
                                    we've helped over 4,500 families find their perfect homes across Mumbai, Bangalore, Delhi NCR, and beyond.
                                </p>
                                <div className="section-divider"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="section-padding section-bg">
                    <div className="container">
                        <div className="text-center mb-5">
                            <span className="section-label animate-on-scroll" style={{ justifyContent: "center" }}>Our Values</span>
                            <h2 className="section-title animate-on-scroll">What Drives Us</h2>
                        </div>
                        <div className="row g-4">
                            {values.map((val, i) => (
                                <div key={val.title} className="col-md-6 col-lg-3">
                                    <div className={`premium-card text-center h-100 animate-on-scroll animate-delay-${i + 1}`}>
                                        <div style={{
                                            width: "56px",
                                            height: "56px",
                                            background: "var(--accent-light)",
                                            borderRadius: "50%",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: "16px"
                                        }}>
                                            <i className={`bi ${val.icon}`} style={{ fontSize: "24px", color: "var(--accent-primary)" }}></i>
                                        </div>
                                        <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}>{val.title}</h3>
                                        <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 0 }}>{val.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="section-padding">
                    <div className="container">
                        <div className="text-center mb-5">
                            <span className="section-label animate-on-scroll" style={{ justifyContent: "center" }}>Our Team</span>
                            <h2 className="section-title animate-on-scroll">Meet the Experts</h2>
                            <p className="section-subtitle mx-auto animate-on-scroll">
                                A dedicated team of real estate professionals committed to making your property dreams a reality.
                            </p>
                        </div>
                        <div className="row g-4 justify-content-center">
                            {team.map((member, i) => (
                                <div key={member.name} className="col-md-6 col-lg-3">
                                    <div className={`text-center animate-on-scroll animate-delay-${i + 1}`}>
                                        <div style={{
                                            width: "80px",
                                            height: "80px",
                                            borderRadius: "50%",
                                            background: "var(--accent-light)",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: "16px",
                                            fontSize: "28px",
                                            fontWeight: 800,
                                            color: "var(--accent-primary)"
                                        }}>
                                            {member.name.charAt(0)}
                                        </div>
                                        <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "4px" }}>{member.name}</h3>
                                        <p style={{ fontSize: "13px", color: "var(--accent-secondary)", fontWeight: 600, marginBottom: "6px" }}>{member.role}</p>
                                        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: 0 }}>{member.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mission/Vision */}
                <section className="section-padding section-bg">
                    <div className="container">
                        <div className="row g-4 text-center">
                            {[
                                { icon: "bi-compass", title: "Our Mission", desc: "To make property search simple, transparent, and refined — delivering a frictionless client journey from search to settlement." },
                                { icon: "bi-eye", title: "Our Vision", desc: "To become the definitive benchmark for premium real estate consulting in India, setting new standards of trust and excellence." },
                                { icon: "bi-heart", title: "Our Promise", desc: "Every client receives personalized attention, verified properties, and expert guidance — no exceptions, no compromises." }
                            ].map((item, i) => (
                                <div key={item.title} className="col-md-4">
                                    <div className={`premium-card h-100 animate-on-scroll animate-delay-${i + 1}`}>
                                        <i className={`bi ${item.icon}`} style={{ fontSize: "28px", color: "var(--accent-primary)", marginBottom: "16px", display: "block" }}></i>
                                        <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "10px" }}>{item.title}</h3>
                                        <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 0 }}>{item.desc}</p>
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

export default About;