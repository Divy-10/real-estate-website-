import { useState } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import faqData from "../../data/faq";

function FAQSection({ page = "home" }) {
    const ref = useScrollAnimation();
    const [openIndex, setOpenIndex] = useState(0);
    const items = faqData[page] || faqData.home;

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    // JSON-LD FAQPage schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <section className="section-padding" ref={ref}>
            <div className="container">
                <div className="row g-5 align-items-start">
                    <div className="col-lg-5">
                        <div className="animate-on-scroll">
                            <span className="section-label">FAQ</span>
                            <h2 className="section-title">Frequently Asked Questions</h2>
                            <p className="section-subtitle">
                                Can't find what you're looking for? Reach out to our team and we'll get back to you within 24 hours.
                            </p>
                            <div style={{ marginTop: "24px" }}>
                                <a href="/contact" className="btn-luxury-outline py-2 px-4 text-decoration-none" style={{ fontSize: "14px" }}>
                                    <i className="bi bi-chat-dots me-2"></i>
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="animate-on-scroll">
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className={`faq-item ${openIndex === index ? "active" : ""}`}
                                >
                                    <button
                                        className="faq-question"
                                        onClick={() => toggle(index)}
                                        aria-expanded={openIndex === index}
                                    >
                                        <span>{item.question}</span>
                                        <i className="bi bi-chevron-down"></i>
                                    </button>
                                    <div className="faq-answer">
                                        <p>{item.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </section>
    );
}

export default FAQSection;
