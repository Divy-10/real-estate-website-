import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SerachBar";
import PropertyCard from "../components/PropertyCard";
import ServicesPreview from "../components/home/ServicesPreview";
import WhyChooseUs from "../components/WhyChooseUs";
import IndustriesPreview from "../components/home/IndustriesPreview";
import ProcessSection from "../components/home/ProcessSection";
import StatsCounter from "../components/home/StatsCounter";
import Testimonials from "../components/home/Testimonials";
import FAQSection from "../components/home/FAQSection";
import LatestBlogs from "../components/home/LatestBlogs";
import CTASection from "../components/home/CTASection";
import Footer from "../components/Footer";
import useScrollAnimation from "../hooks/useScrollAnimation";

function Home() {
    const [properties, setProperties] = useState([]);
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");
    const propertiesRef = useScrollAnimation();

    const fetchProperties = async () => {
        try {
            const response = await API.get("/properties");
            setProperties(response.data);
        } catch (error) {
            console.error("Error fetching properties", error);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const filteredProperties = properties.filter((property) => {
        const matchesLocation =
            location === "" ||
            property.location
                ?.toLowerCase()
                .includes(location.toLowerCase()) ||
            property.title
                ?.toLowerCase()
                .includes(location.toLowerCase());

        const matchesBudget =
            budget === "" ||
            property.price <= Number(budget);

        return matchesLocation && matchesBudget;
    });

    // JSON-LD structured data for homepage
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://royalcrestproperties.com/#organization",
                "name": "Royal Crest Properties",
                "url": "https://royalcrestproperties.com",
                "logo": "https://royalcrestproperties.com/favicon.svg",
                "description": "Premium real estate services in India. Buy, sell, or rent properties with expert guidance.",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-99999-99999",
                    "contactType": "customer service",
                    "availableLanguage": ["English", "Hindi"]
                },
                "sameAs": [
                    "https://facebook.com/royalcrestproperties",
                    "https://instagram.com/royalcrestproperties",
                    "https://linkedin.com/company/royalcrestproperties"
                ]
            },
            {
                "@type": "WebSite",
                "@id": "https://royalcrestproperties.com/#website",
                "url": "https://royalcrestproperties.com",
                "name": "Royal Crest Properties",
                "publisher": { "@id": "https://royalcrestproperties.com/#organization" },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://royalcrestproperties.com/properties?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "RealEstateAgent",
                "name": "Royal Crest Properties",
                "image": "https://royalcrestproperties.com/favicon.svg",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "123 Business Avenue",
                    "addressLocality": "Mumbai",
                    "addressRegion": "Maharashtra",
                    "postalCode": "400001",
                    "addressCountry": "IN"
                },
                "telephone": "+91-99999-99999",
                "priceRange": "₹₹₹",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "4500"
                }
            }
        ]
    };

    return (
        <>
            <SEO
                title="Find Your Dream Home"
                description="Royal Crest Properties — India's premium real estate platform. Buy, sell, or rent verified residential and commercial properties with expert guidance and end-to-end support."
                jsonLd={jsonLd}
                ogImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
            />

            {/* Header + Hero */}
            <header>
                <Navbar />
                <Hero />
            </header>

            <main>
                {/* Search Section */}
                <SearchBar
                    location={location}
                    setLocation={setLocation}
                    budget={budget}
                    setBudget={setBudget}
                />

                {/* Featured Properties */}
                <section className="section-padding" ref={propertiesRef} aria-label="Featured properties">
                    <div className="container">
                        <div className="d-flex align-items-end justify-content-between mb-4 flex-wrap gap-3">
                            <div>
                                <span className="section-label animate-on-scroll">Popular</span>
                                <h2 className="section-title animate-on-scroll">Our Featured Properties</h2>
                            </div>
                            <Link
                                to="/properties"
                                className="btn-luxury-outline py-2 px-4 text-decoration-none animate-on-scroll"
                                style={{ fontSize: "14px" }}
                            >
                                Explore All <i className="bi bi-arrow-right ms-1"></i>
                            </Link>
                        </div>

                        <div className="row g-4">
                            {filteredProperties.slice(0, 6).map((property) => (
                                <div key={property._id} className="col-md-6 col-lg-4">
                                    <PropertyCard property={property} />
                                </div>
                            ))}

                            {filteredProperties.length === 0 && (
                                <div className="col-12 text-center py-5">
                                    <div style={{
                                        width: "64px",
                                        height: "64px",
                                        background: "var(--bg-secondary)",
                                        borderRadius: "50%",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "16px"
                                    }}>
                                        <i className="bi bi-search" style={{ fontSize: "24px", color: "var(--text-muted)" }}></i>
                                    </div>
                                    <h4 style={{ fontWeight: 700, marginBottom: "8px" }}>No Properties Found</h4>
                                    <p style={{ color: "var(--text-muted)" }}>
                                        Try adjusting your search criteria or explore all properties.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Company Introduction */}
                <section className="section-padding section-bg" aria-label="About our company">
                    <div className="container">
                        <div className="row g-5 align-items-center">
                            <div className="col-lg-6">
                                <div style={{
                                    borderRadius: "var(--radius-xl)",
                                    overflow: "hidden",
                                    height: "420px",
                                    boxShadow: "var(--shadow-xl)"
                                }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                                        alt="Royal Crest Properties office team discussing real estate plans"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <span className="section-label">About Us</span>
                                <h2 className="section-title">Architecting Lifestyles, Not Just Spaces</h2>
                                <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "20px" }}>
                                    Royal Crest Properties is a premium real estate advisory built on trust, transparency, and deep market expertise. 
                                    With over 15 years of experience, we've helped 4,500+ clients find their dream homes and investment properties.
                                </p>
                                <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "24px", fontSize: "15px" }}>
                                    Our curated approach combines technology-driven insights with personalized service, ensuring every client receives 
                                    the attention they deserve throughout their real estate journey.
                                </p>
                                <Link to="/about" className="btn-luxury-dark py-3 px-4 text-decoration-none">
                                    Learn More About Us <i className="bi bi-arrow-right ms-1"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <ServicesPreview />
                <WhyChooseUs />
                <IndustriesPreview />
                <ProcessSection />
                <StatsCounter />
                <Testimonials />
                <FAQSection page="home" />
                <LatestBlogs />
                <CTASection />
            </main>

            <Footer />
        </>
    );
}

export default Home;