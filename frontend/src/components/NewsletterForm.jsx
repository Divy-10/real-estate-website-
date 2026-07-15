import { useState } from "react";

function NewsletterForm({ variant = "default" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // For now, just show success. Ready for backend integration.
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  if (variant === "inline") {
    return (
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="newsletter-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email for newsletter"
        />
        <button type="submit" className="newsletter-btn">
          {submitted ? "Subscribed! ✓" : "Subscribe"}
        </button>
      </form>
    );
  }

  return (
    <div className="newsletter-section">
      <div className="position-relative" style={{ zIndex: 1 }}>
        <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 8, fontSize: "1.5rem" }}>
          Stay Updated
        </h3>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 24, fontSize: "0.95rem" }}>
          Get the latest property listings and market insights delivered to your inbox.
        </p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="newsletter-input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email for newsletter"
          />
          <button type="submit" className="newsletter-btn">
            {submitted ? "Subscribed! ✓" : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsletterForm;
