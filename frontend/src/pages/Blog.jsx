import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import useScrollAnimation from "../hooks/useScrollAnimation";
import blogs from "../data/blogs";

const categories = ["All", ...new Set(blogs.map((b) => b.category))];

function Blog() {
    const ref = useScrollAnimation();
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = blogs.filter((blog) => {
        const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
        const matchesSearch = searchQuery === "" ||
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <SEO
                title="Blog"
                description="Real estate insights, market analysis, buying guides, and expert tips. Stay informed with the Royal Crest Properties blog."
            />
            <Navbar />
            <Breadcrumb items={[
                { label: "Home", path: "/" },
                { label: "Blog" }
            ]} />

            <main>
                <section className="page-hero">
                    <div className="container">
                        <h1>Our Blog</h1>
                        <p>Expert insights, market trends, and practical guides for homebuyers and investors.</p>
                    </div>
                </section>

                <section className="section-padding" ref={ref}>
                    <div className="container">
                        {/* Search + Filter */}
                        <div className="d-flex flex-wrap gap-3 align-items-center justify-content-between mb-5 animate-on-scroll">
                            <div className="d-flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        style={{
                                            padding: "8px 18px",
                                            borderRadius: "var(--radius-full)",
                                            border: "1px solid var(--border-light)",
                                            background: activeCategory === cat ? "var(--accent-primary)" : "transparent",
                                            color: activeCategory === cat ? "#fff" : "var(--text-body)",
                                            fontSize: "13px",
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
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid var(--border-light)",
                                borderRadius: "var(--radius-sm)",
                                padding: "8px 16px",
                                gap: "8px",
                                minWidth: "250px"
                            }}>
                                <i className="bi bi-search" style={{ color: "var(--text-muted)" }}></i>
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        fontSize: "14px",
                                        color: "var(--text-dark)",
                                        fontFamily: "var(--font-main)",
                                        width: "100%"
                                    }}
                                    aria-label="Search blog articles"
                                />
                            </div>
                        </div>

                        {/* Blog Grid */}
                        <div className="row g-4">
                            {filtered.map((blog, index) => (
                                <div key={blog.id} className="col-md-6 col-lg-4">
                                    <Link to={`/blog/${blog.id}`} className={`text-decoration-none d-block h-100 animate-on-scroll animate-delay-${(index % 3) + 1}`}>
                                        <article style={{
                                            background: "var(--bg-primary)",
                                            borderRadius: "var(--radius-lg)",
                                            overflow: "hidden",
                                            border: "1px solid var(--border-light)",
                                            transition: "var(--transition-smooth)",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column"
                                        }} className="blog-card-hover">
                                            <div style={{ height: "200px", overflow: "hidden" }}>
                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    loading="lazy"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                        transition: "transform 0.5s ease"
                                                    }}
                                                />
                                            </div>
                                            <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                                                <div className="d-flex align-items-center gap-3 mb-3">
                                                    <span className="badge-accent">{blog.category}</span>
                                                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{blog.readTime}</span>
                                                </div>
                                                <h3 style={{
                                                    fontSize: "17px",
                                                    fontWeight: 700,
                                                    color: "var(--text-dark)",
                                                    lineHeight: 1.4,
                                                    marginBottom: "10px"
                                                }}>
                                                    {blog.title}
                                                </h3>
                                                <p style={{
                                                    fontSize: "13px",
                                                    color: "var(--text-muted)",
                                                    lineHeight: 1.6,
                                                    flex: 1
                                                }}>
                                                    {blog.excerpt}
                                                </p>
                                                <div className="d-flex align-items-center justify-content-between mt-3 pt-3" style={{ borderTop: "1px solid var(--border-light)" }}>
                                                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-dark)" }}>
                                                        {blog.author}
                                                    </span>
                                                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                                                        {new Date(blog.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                </div>
                            ))}

                            {filtered.length === 0 && (
                                <div className="col-12 text-center py-5">
                                    <i className="bi bi-journal-text" style={{ fontSize: "48px", color: "var(--text-light)" }}></i>
                                    <h4 style={{ marginTop: "16px", fontWeight: 700 }}>No articles found</h4>
                                    <p style={{ color: "var(--text-muted)" }}>Try a different search term or category.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style>{`
                .blog-card-hover:hover {
                    transform: translateY(-6px);
                    box-shadow: var(--shadow-lg);
                }
                .blog-card-hover:hover img {
                    transform: scale(1.05);
                }
            `}</style>
        </>
    );
}

export default Blog;
