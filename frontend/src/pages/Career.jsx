import { useState } from "react";
import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import useScrollAnimation from "../hooks/useScrollAnimation";
import careers from "../data/careers";

function Career() {
    const ref = useScrollAnimation();
    const [expandedId, setExpandedId] = useState(null);
    const [showForm, setShowForm] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
        setShowForm(null);
    };

    const handleApply = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            setFormSubmitted(false);
            setShowForm(null);
        }, 3000);
    };

    const jsonLd = careers.map((job) => ({
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description,
        "employmentType": job.type === "Full-time" ? "FULL_TIME" : "PART_TIME",
        "hiringOrganization": {
            "@type": "Organization",
            "name": "Royal Crest Properties"
        },
        "jobLocation": {
            "@type": "Place",
            "address": { "@type": "PostalAddress", "addressLocality": job.location }
        },
        "datePosted": "2025-07-01"
    }));

    return (
        <>
            <SEO
                title="Careers"
                description="Join the Royal Crest Properties team. Explore exciting career opportunities in real estate sales, marketing, design, and management."
                jsonLd={jsonLd}
            />
            <Navbar />
            <Breadcrumb items={[
                { label: "Home", path: "/" },
                { label: "Careers" }
            ]} />

            <main>
                <section className="page-hero">
                    <div className="container">
                        <h1>Join Our Team</h1>
                        <p>Build your career with India's premium real estate brand. We're always looking for passionate professionals.</p>
                    </div>
                </section>

                {/* Culture Section */}
                <section className="section-padding section-bg" ref={ref}>
                    <div className="container">
                        <div className="row g-4 text-center mb-5">
                            {[
                                { icon: "bi-rocket-takeoff", title: "Growth", desc: "Fast-track your career with mentorship and learning." },
                                { icon: "bi-people", title: "Culture", desc: "Collaborative, inclusive, and fun work environment." },
                                { icon: "bi-heart", title: "Benefits", desc: "Competitive salary, insurance, and flexible hours." },
                                { icon: "bi-trophy", title: "Recognition", desc: "Performance bonuses, trips, and awards." }
                            ].map((item, i) => (
                                <div key={item.title} className="col-6 col-lg-3">
                                    <div className={`animate-on-scroll animate-delay-${i + 1}`}>
                                        <div style={{
                                            width: "56px",
                                            height: "56px",
                                            background: "var(--accent-light)",
                                            borderRadius: "50%",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: "12px"
                                        }}>
                                            <i className={`bi ${item.icon}`} style={{ fontSize: "24px", color: "var(--accent-primary)" }}></i>
                                        </div>
                                        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px" }}>{item.title}</h3>
                                        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: 0 }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Job Listings */}
                <section className="section-padding">
                    <div className="container">
                        <div className="text-center mb-5">
                            <span className="section-label" style={{ justifyContent: "center" }}>Open Positions</span>
                            <h2 className="section-title">Current Openings</h2>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-9">
                                {careers.map((job) => (
                                    <div key={job.id} style={{
                                        border: "1px solid var(--border-light)",
                                        borderRadius: "var(--radius-lg)",
                                        marginBottom: "16px",
                                        overflow: "hidden",
                                        transition: "var(--transition)"
                                    }}>
                                        <div
                                            onClick={() => toggleExpand(job.id)}
                                            style={{
                                                padding: "24px",
                                                cursor: "pointer",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                gap: "12px"
                                            }}
                                        >
                                            <div>
                                                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>{job.title}</h3>
                                                <div className="d-flex flex-wrap gap-2">
                                                    <span className="badge-accent"><i className="bi bi-briefcase me-1"></i>{job.department}</span>
                                                    <span className="badge-accent"><i className="bi bi-geo-alt me-1"></i>{job.location}</span>
                                                    <span className="badge-accent"><i className="bi bi-clock me-1"></i>{job.type}</span>
                                                </div>
                                            </div>
                                            <i className={`bi bi-chevron-${expandedId === job.id ? "up" : "down"}`} style={{ fontSize: "20px" }}></i>
                                        </div>

                                        {expandedId === job.id && (
                                            <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--border-light)", paddingTop: "20px" }}>
                                                <p style={{ color: "var(--text-body)", lineHeight: 1.7, marginBottom: "16px" }}>{job.description}</p>
                                                <div style={{ marginBottom: "16px" }}>
                                                    <strong style={{ fontSize: "14px" }}>Experience:</strong>
                                                    <span style={{ fontSize: "14px", color: "var(--text-muted)", marginLeft: "8px" }}>{job.experience}</span>
                                                </div>
                                                <div style={{ marginBottom: "16px" }}>
                                                    <strong style={{ fontSize: "14px" }}>Salary:</strong>
                                                    <span style={{ fontSize: "14px", color: "var(--text-muted)", marginLeft: "8px" }}>{job.salary}</span>
                                                </div>

                                                <div className="row g-4 mb-4">
                                                    <div className="col-md-6">
                                                        <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "10px" }}>Requirements</h4>
                                                        <ul style={{ paddingLeft: "0", listStyle: "none" }}>
                                                            {job.requirements.map((r, i) => (
                                                                <li key={i} style={{ fontSize: "13px", color: "var(--text-body)", marginBottom: "6px", display: "flex", gap: "8px" }}>
                                                                    <i className="bi bi-check-circle" style={{ color: "var(--accent-secondary)", marginTop: "2px" }}></i>
                                                                    {r}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "10px" }}>Benefits</h4>
                                                        <ul style={{ paddingLeft: "0", listStyle: "none" }}>
                                                            {job.benefits.map((b, i) => (
                                                                <li key={i} style={{ fontSize: "13px", color: "var(--text-body)", marginBottom: "6px", display: "flex", gap: "8px" }}>
                                                                    <i className="bi bi-star" style={{ color: "var(--warning)", marginTop: "2px" }}></i>
                                                                    {b}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {showForm === job.id ? (
                                                    formSubmitted ? (
                                                        <div style={{ padding: "20px", background: "var(--accent-light)", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                                                            <i className="bi bi-check-circle-fill" style={{ fontSize: "24px", color: "var(--success)" }}></i>
                                                            <p style={{ fontWeight: 600, marginTop: "8px", marginBottom: 0 }}>Application submitted successfully!</p>
                                                        </div>
                                                    ) : (
                                                        <form onSubmit={handleApply} style={{ background: "var(--bg-secondary)", padding: "24px", borderRadius: "var(--radius-md)" }}>
                                                            <div className="row g-3">
                                                                <div className="col-md-6">
                                                                    <input type="text" className="form-control" placeholder="Full Name" required />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <input type="email" className="form-control" placeholder="Email Address" required />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <input type="tel" className="form-control" placeholder="Phone Number" required />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <input type="text" className="form-control" placeholder="LinkedIn Profile URL" />
                                                                </div>
                                                                <div className="col-12">
                                                                    <textarea className="form-control" rows="3" placeholder="Why are you a good fit for this role?" required></textarea>
                                                                </div>
                                                                <div className="col-12">
                                                                    <button type="submit" className="btn-luxury-dark py-2 px-4">Submit Application</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    )
                                                ) : (
                                                    <button className="btn-accent py-2 px-4" onClick={() => setShowForm(job.id)}>
                                                        Apply Now <i className="bi bi-arrow-right ms-1"></i>
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Career;
