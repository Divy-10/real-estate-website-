import { useState, useEffect } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import testimonials from "../../data/testimonials";

function Testimonials() {
    const ref = useScrollAnimation();
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <i
                key={i}
                className={`bi ${i < rating ? "bi-star-fill" : "bi-star"}`}
                style={{ color: i < rating ? "#f59e0b" : "#cbd5e1", fontSize: "14px" }}
            ></i>
        ));
    };

    return (
        <section className="section-padding section-bg" ref={ref}>
            <div className="container">
                <div className="text-center mb-5">
                    <span className="section-label animate-on-scroll" style={{ justifyContent: "center" }}>Testimonials</span>
                    <h2 className="section-title animate-on-scroll">What Our Clients Say</h2>
                    <p className="section-subtitle mx-auto animate-on-scroll">
                        Real stories from real clients who found their dream properties with Royal Crest.
                    </p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {/* Main testimonial card */}
                        <div
                            className="animate-on-scroll"
                            style={{
                                background: "var(--bg-primary)",
                                borderRadius: "var(--radius-xl)",
                                padding: "clamp(32px, 4vw, 48px)",
                                boxShadow: "var(--shadow-lg)",
                                border: "1px solid var(--border-light)",
                                textAlign: "center",
                                position: "relative",
                                minHeight: "250px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            {/* Quote icon */}
                            <div style={{
                                position: "absolute",
                                top: "24px",
                                left: "32px",
                                fontSize: "48px",
                                color: "var(--accent-light)",
                                lineHeight: 1,
                                fontFamily: "Georgia, serif"
                            }}>
                                "
                            </div>

                            <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
                                {renderStars(testimonials[active].rating)}
                            </div>

                            <p style={{
                                fontSize: "clamp(16px, 2vw, 20px)",
                                color: "var(--text-body)",
                                lineHeight: 1.7,
                                fontWeight: 400,
                                maxWidth: "700px",
                                marginBottom: "24px",
                                fontStyle: "italic"
                            }}>
                                "{testimonials[active].quote}"
                            </p>

                            <div>
                                <div style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    background: "var(--accent-light)",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "10px",
                                    fontSize: "20px",
                                    fontWeight: 700,
                                    color: "var(--accent-primary)"
                                }}>
                                    {testimonials[active].name.charAt(0)}
                                </div>
                                <h4 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "2px" }}>
                                    {testimonials[active].name}
                                </h4>
                                <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: 0 }}>
                                    {testimonials[active].role} · {testimonials[active].location}
                                </p>
                            </div>
                        </div>

                        {/* Dots navigation */}
                        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActive(index)}
                                    aria-label={`View testimonial ${index + 1}`}
                                    style={{
                                        width: active === index ? "24px" : "8px",
                                        height: "8px",
                                        borderRadius: "4px",
                                        background: active === index ? "var(--accent-primary)" : "var(--border-medium)",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        padding: 0
                                    }}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
