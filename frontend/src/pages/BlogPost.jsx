import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import blogs from "../data/blogs";

function BlogPost() {
    const { id } = useParams();
    const blog = blogs.find((b) => b.id === id);

    if (!blog) {
        return (
            <>
                <Navbar />
                <div className="container text-center py-5" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <h1>Article Not Found</h1>
                    <p style={{ color: "var(--text-muted)" }}>The article you're looking for doesn't exist.</p>
                    <Link to="/blog" className="btn-luxury-dark py-2 px-4 text-decoration-none mt-3">Back to Blog</Link>
                </div>
                <Footer />
            </>
        );
    }

    const relatedPosts = blogs.filter((b) => b.id !== blog.id && b.category === blog.category).slice(0, 3);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.excerpt,
        "image": blog.image,
        "author": {
            "@type": "Person",
            "name": blog.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Royal Crest Properties"
        },
        "datePublished": blog.date,
        "dateModified": blog.date
    };

    // Simple markdown-like rendering for content sections
    const renderContent = (content) => {
        return content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) {
                return <h2 key={i} style={{ fontSize: "22px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>{line.replace('## ', '')}</h2>;
            }
            if (line.startsWith('### ')) {
                return <h3 key={i} style={{ fontSize: "18px", fontWeight: 700, marginTop: "24px", marginBottom: "10px" }}>{line.replace('### ', '')}</h3>;
            }
            if (line.trim() === '') return <br key={i} />;
            return <p key={i} style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "12px", fontSize: "15px" }}>{line}</p>;
        });
    };

    return (
        <>
            <SEO
                title={blog.title}
                description={blog.excerpt}
                ogImage={blog.image}
                ogType="article"
                jsonLd={jsonLd}
            />
            <Navbar />
            <Breadcrumb items={[
                { label: "Home", path: "/" },
                { label: "Blog", path: "/blog" },
                { label: blog.title }
            ]} />

            <main>
                <article className="section-padding">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                {/* Article Header */}
                                <div style={{ marginBottom: "32px" }}>
                                    <div className="d-flex flex-wrap gap-3 mb-3">
                                        <span className="badge-accent">{blog.category}</span>
                                        <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                                            <i className="bi bi-calendar3 me-1"></i>
                                            {new Date(blog.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                                        </span>
                                        <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                                            <i className="bi bi-clock me-1"></i>
                                            {blog.readTime}
                                        </span>
                                    </div>
                                    <h1 style={{
                                        fontSize: "clamp(24px, 4vw, 36px)",
                                        fontWeight: 800,
                                        lineHeight: 1.3,
                                        letterSpacing: "-0.5px",
                                        marginBottom: "16px"
                                    }}>
                                        {blog.title}
                                    </h1>
                                    <div className="d-flex align-items-center gap-3">
                                        <div style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            background: "var(--accent-light)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "16px",
                                            fontWeight: 700,
                                            color: "var(--accent-primary)"
                                        }}>
                                            {blog.author.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "14px", fontWeight: 600 }}>{blog.author}</div>
                                            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Royal Crest Properties</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Featured Image */}
                                <div style={{
                                    borderRadius: "var(--radius-xl)",
                                    overflow: "hidden",
                                    marginBottom: "40px",
                                    height: "400px"
                                }}>
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>

                                {/* Content */}
                                <div style={{ maxWidth: "700px" }}>
                                    {renderContent(blog.content)}
                                </div>

                                {/* Tags */}
                                <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--border-light)" }}>
                                    <div className="d-flex flex-wrap gap-2">
                                        {blog.tags.map((tag) => (
                                            <span key={tag} style={{
                                                padding: "4px 12px",
                                                background: "var(--bg-secondary)",
                                                borderRadius: "var(--radius-full)",
                                                fontSize: "12px",
                                                color: "var(--text-muted)",
                                                fontWeight: 500
                                            }}>
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Share buttons */}
                                <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--border-light)" }}>
                                    <span style={{ fontSize: "14px", fontWeight: 600, marginRight: "12px" }}>Share:</span>
                                    <div className="d-inline-flex gap-2">
                                        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
                                           target="_blank" rel="noopener noreferrer"
                                           className="social-share-btn" aria-label="Share on Twitter"
                                           style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid var(--border-light)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", transition: "var(--transition)" }}>
                                            <i className="bi bi-twitter-x"></i>
                                        </a>
                                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`}
                                           target="_blank" rel="noopener noreferrer"
                                           aria-label="Share on LinkedIn"
                                           style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid var(--border-light)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", transition: "var(--transition)" }}>
                                            <i className="bi bi-linkedin"></i>
                                        </a>
                                        <a href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}`}
                                           target="_blank" rel="noopener noreferrer"
                                           aria-label="Share on WhatsApp"
                                           style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid var(--border-light)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", transition: "var(--transition)" }}>
                                            <i className="bi bi-whatsapp"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Related Posts */}
                        {relatedPosts.length > 0 && (
                            <div style={{ marginTop: "60px", paddingTop: "40px", borderTop: "1px solid var(--border-light)" }}>
                                <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "24px" }}>Related Articles</h3>
                                <div className="row g-4">
                                    {relatedPosts.map((post) => (
                                        <div key={post.id} className="col-md-4">
                                            <Link to={`/blog/${post.id}`} className="text-decoration-none">
                                                <div style={{
                                                    borderRadius: "var(--radius-lg)",
                                                    overflow: "hidden",
                                                    border: "1px solid var(--border-light)"
                                                }}>
                                                    <div style={{ height: "160px", overflow: "hidden" }}>
                                                        <img src={post.image} alt={post.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                    </div>
                                                    <div style={{ padding: "16px" }}>
                                                        <h4 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-dark)", lineHeight: 1.4 }}>{post.title}</h4>
                                                        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{post.readTime}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </main>

            <Footer />
        </>
    );
}

export default BlogPost;
