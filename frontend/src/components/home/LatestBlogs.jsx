import { Link } from "react-router-dom";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import blogs from "../../data/blogs";

function LatestBlogs() {
    const ref = useScrollAnimation();
    const latestBlogs = blogs.slice(0, 3);

    return (
        <section className="section-padding section-bg" ref={ref}>
            <div className="container">
                <div className="d-flex align-items-end justify-content-between mb-5 flex-wrap gap-3">
                    <div>
                        <span className="section-label animate-on-scroll">Blog</span>
                        <h2 className="section-title animate-on-scroll">Latest Insights</h2>
                        <p className="section-subtitle animate-on-scroll">
                            Expert articles, market analysis, and tips for homebuyers and investors.
                        </p>
                    </div>
                    <Link
                        to="/blog"
                        className="btn-luxury-outline py-2 px-4 text-decoration-none animate-on-scroll"
                        style={{ fontSize: "14px" }}
                    >
                        View All <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                </div>

                <div className="row g-4">
                    {latestBlogs.map((blog, index) => (
                        <div key={blog.id} className="col-md-6 col-lg-4">
                            <Link to={`/blog/${blog.id}`} className={`text-decoration-none d-block animate-on-scroll animate-delay-${index + 1}`}>
                                <article
                                    style={{
                                        background: "var(--bg-primary)",
                                        borderRadius: "var(--radius-lg)",
                                        overflow: "hidden",
                                        border: "1px solid var(--border-light)",
                                        transition: "var(--transition-smooth)",
                                        height: "100%"
                                    }}
                                    className="blog-preview-card"
                                >
                                    {/* Image */}
                                    <div style={{
                                        height: "200px",
                                        overflow: "hidden",
                                        position: "relative"
                                    }}>
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
                                        <span style={{
                                            position: "absolute",
                                            top: "12px",
                                            left: "12px",
                                            background: "var(--accent-primary)",
                                            color: "#fff",
                                            padding: "4px 12px",
                                            borderRadius: "var(--radius-full)",
                                            fontSize: "11px",
                                            fontWeight: 600
                                        }}>
                                            {blog.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div style={{ padding: "24px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                                            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                                                <i className="bi bi-calendar3 me-1"></i>
                                                {new Date(blog.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                            </span>
                                            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                                                <i className="bi bi-clock me-1"></i>
                                                {blog.readTime}
                                            </span>
                                        </div>
                                        <h3 style={{
                                            fontSize: "17px",
                                            fontWeight: 700,
                                            color: "var(--text-dark)",
                                            lineHeight: 1.4,
                                            marginBottom: "8px",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden"
                                        }}>
                                            {blog.title}
                                        </h3>
                                        <p style={{
                                            fontSize: "13px",
                                            color: "var(--text-muted)",
                                            lineHeight: 1.6,
                                            marginBottom: 0,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden"
                                        }}>
                                            {blog.excerpt}
                                        </p>
                                    </div>
                                </article>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .blog-preview-card:hover {
                    transform: translateY(-6px);
                    box-shadow: var(--shadow-lg);
                }
                .blog-preview-card:hover img {
                    transform: scale(1.05);
                }
            `}</style>
        </section>
    );
}

export default LatestBlogs;
