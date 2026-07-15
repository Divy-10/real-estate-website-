import { useState } from "react";
import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import useScrollAnimation from "../hooks/useScrollAnimation";

const galleryImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", alt: "Modern luxury villa exterior with landscaped garden", category: "Exterior" },
    { id: 2, src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80", alt: "Contemporary living room with designer furniture", category: "Interior" },
    { id: 3, src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", alt: "Premium residential property with pool", category: "Residential" },
    { id: 4, src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", alt: "Modern commercial high-rise building", category: "Commercial" },
    { id: 5, src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80", alt: "Luxury mansion with architectural design", category: "Exterior" },
    { id: 6, src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", alt: "Spacious modern kitchen with marble countertops", category: "Interior" },
    { id: 7, src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80", alt: "Residential apartment complex aerial view", category: "Residential" },
    { id: 8, src: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80", alt: "Premium office space with panoramic windows", category: "Commercial" },
    { id: 9, src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", alt: "Modern bedroom with minimalist design", category: "Interior" },
    { id: 10, src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80", alt: "Contemporary house exterior at twilight", category: "Exterior" },
    { id: 11, src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", alt: "Cozy rental apartment with warm lighting", category: "Residential" },
    { id: 12, src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&q=80", alt: "Luxury bathroom with freestanding bathtub", category: "Interior" }
];

const categories = ["All", "Residential", "Commercial", "Interior", "Exterior"];

function Gallery() {
    const ref = useScrollAnimation();
    const [activeCategory, setActiveCategory] = useState("All");
    const [lightbox, setLightbox] = useState(null);

    const filtered = activeCategory === "All"
        ? galleryImages
        : galleryImages.filter((img) => img.category === activeCategory);

    return (
        <>
            <SEO
                title="Gallery"
                description="Explore our stunning portfolio of residential, commercial, and luxury properties. View interiors, exteriors, and architectural designs from Royal Crest Properties."
            />
            <Navbar />
            <Breadcrumb items={[
                { label: "Home", path: "/" },
                { label: "Gallery" }
            ]} />

            <main>
                <section className="page-hero">
                    <div className="container">
                        <h1>Our Gallery</h1>
                        <p>Browse our stunning portfolio of premium properties, interiors, and architectural designs.</p>
                    </div>
                </section>

                <section className="section-padding" ref={ref}>
                    <div className="container">
                        {/* Filters */}
                        <div className="d-flex flex-wrap gap-2 justify-content-center mb-5 animate-on-scroll">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    style={{
                                        padding: "10px 24px",
                                        borderRadius: "var(--radius-full)",
                                        border: "1px solid var(--border-light)",
                                        background: activeCategory === cat ? "var(--accent-primary)" : "transparent",
                                        color: activeCategory === cat ? "#fff" : "var(--text-body)",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        transition: "var(--transition)",
                                        fontFamily: "var(--font-main)"
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Gallery Grid */}
                        <div className="row g-3">
                            {filtered.map((image, index) => (
                                <div key={image.id} className={`col-6 col-md-4 col-lg-3 animate-on-scroll animate-delay-${(index % 4) + 1}`}>
                                    <div
                                        onClick={() => setLightbox(image)}
                                        style={{
                                            borderRadius: "var(--radius-md)",
                                            overflow: "hidden",
                                            cursor: "pointer",
                                            position: "relative",
                                            height: index % 3 === 0 ? "300px" : "220px",
                                            transition: "var(--transition-smooth)"
                                        }}
                                        className="gallery-item"
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`View ${image.alt}`}
                                        onKeyDown={(e) => e.key === 'Enter' && setLightbox(image)}
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            loading="lazy"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                transition: "transform 0.5s ease"
                                            }}
                                        />
                                        <div style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "linear-gradient(transparent 60%, rgba(0,0,0,0.5))",
                                            display: "flex",
                                            alignItems: "flex-end",
                                            padding: "16px",
                                            opacity: 0,
                                            transition: "opacity 0.3s ease"
                                        }} className="gallery-overlay">
                                            <span style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>
                                                {image.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Lightbox */}
            {lightbox && (
                <div
                    onClick={() => setLightbox(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.9)",
                        zIndex: 2000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                        cursor: "pointer",
                        animation: "fadeIn 0.2s ease"
                    }}
                    role="dialog"
                    aria-label="Image lightbox"
                >
                    <button
                        onClick={() => setLightbox(null)}
                        style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: "transparent",
                            border: "none",
                            color: "#fff",
                            fontSize: "32px",
                            cursor: "pointer"
                        }}
                        aria-label="Close lightbox"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                    <img
                        src={lightbox.src.replace('w=600', 'w=1200')}
                        alt={lightbox.alt}
                        style={{
                            maxWidth: "90vw",
                            maxHeight: "85vh",
                            objectFit: "contain",
                            borderRadius: "var(--radius-md)"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            <Footer />

            <style>{`
                .gallery-item:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-lg);
                }
                .gallery-item:hover img {
                    transform: scale(1.08);
                }
                .gallery-item:hover .gallery-overlay {
                    opacity: 1 !important;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </>
    );
}

export default Gallery;
