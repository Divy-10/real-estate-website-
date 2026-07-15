import useScrollAnimation from "../../hooks/useScrollAnimation";

const steps = [
    {
        number: "01",
        icon: "bi-search",
        title: "Search & Discover",
        desc: "Browse our curated listings and use AI-powered search to find properties that match your exact requirements."
    },
    {
        number: "02",
        icon: "bi-calendar-check",
        title: "Schedule a Visit",
        desc: "Book a personalized property tour with our expert agents who will guide you through every detail."
    },
    {
        number: "03",
        icon: "bi-chat-dots",
        title: "Negotiate & Finalize",
        desc: "Our experienced team negotiates the best deal and handles all legal documentation seamlessly."
    },
    {
        number: "04",
        icon: "bi-key",
        title: "Move In",
        desc: "Get your keys and start your new chapter. We provide post-purchase support to ensure a smooth transition."
    }
];

function ProcessSection() {
    const ref = useScrollAnimation();

    return (
        <section className="section-padding" ref={ref}>
            <div className="container">
                <div className="text-center mb-5">
                    <span className="section-label animate-on-scroll" style={{ justifyContent: "center" }}>How It Works</span>
                    <h2 className="section-title animate-on-scroll">Our Simple Process</h2>
                    <p className="section-subtitle mx-auto animate-on-scroll">
                        From search to settlement, we make property buying effortless in just four simple steps.
                    </p>
                </div>

                <div className="row g-4">
                    {steps.map((step, index) => (
                        <div key={step.number} className="col-md-6 col-lg-3">
                            <div className={`text-center animate-on-scroll animate-delay-${index + 1}`} style={{ padding: "20px" }}>
                                {/* Step number */}
                                <div style={{
                                    fontSize: "48px",
                                    fontWeight: 800,
                                    color: "var(--accent-light)",
                                    lineHeight: 1,
                                    marginBottom: "16px",
                                    letterSpacing: "-2px"
                                }}>
                                    {step.number}
                                </div>

                                {/* Icon */}
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
                                    <i className={`bi ${step.icon}`} style={{ fontSize: "22px", color: "var(--accent-primary)" }}></i>
                                </div>

                                <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}>
                                    {step.title}
                                </h3>
                                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 0 }}>
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProcessSection;
