import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";

function PrivacyPolicy() {
    const sections = [
        { id: "info-collect", title: "1. Information We Collect", content: "We collect information you provide directly when using our services, including: your name, email address, phone number, and property preferences when you fill out contact forms or sign up for an account. We also collect property search data, location preferences, and communication history to improve your experience. Additionally, we automatically collect technical data such as browser type, IP address, device information, and browsing patterns through cookies and similar technologies." },
        { id: "info-use", title: "2. How We Use Your Information", content: "We use your personal information to: provide and improve our real estate services, respond to your inquiries and send property recommendations, process transactions and send related information, send marketing communications (with your consent), analyze usage patterns to improve our website and services, comply with legal obligations, and protect against fraudulent or unauthorized activity." },
        { id: "info-share", title: "3. Information Sharing", content: "We do not sell your personal information. We may share your data with: trusted real estate agents and property developers to facilitate transactions, service providers who assist with website operations, payment processing, and email delivery, legal authorities when required by law, and business partners with your explicit consent. All third parties are contractually obligated to protect your data." },
        { id: "cookies", title: "4. Cookies and Tracking", content: "We use cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, analyze site traffic, and deliver relevant content. You can manage cookie preferences through your browser settings. Essential cookies required for site functionality cannot be disabled. Analytics and marketing cookies are optional and can be declined." },
        { id: "data-security", title: "5. Data Security", content: "We implement industry-standard security measures to protect your personal information, including SSL encryption for data transmission, secure server infrastructure, access controls and authentication protocols, regular security audits, and employee training on data protection. While we strive to protect your data, no method of transmission over the Internet is 100% secure." },
        { id: "your-rights", title: "6. Your Rights", content: "You have the right to: access your personal data, correct inaccurate information, request deletion of your data, opt out of marketing communications, restrict processing of your data, and lodge a complaint with a data protection authority. To exercise these rights, contact us at privacy@royalcrest.com." },
        { id: "data-retention", title: "7. Data Retention", content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Account information is retained while your account is active. Transaction records are kept for 7 years for legal compliance. Marketing consent records are maintained until you opt out." },
        { id: "third-party", title: "8. Third-Party Links", content: "Our website may contain links to third-party websites, including property portals, social media platforms, and partner services. We are not responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any linked websites you visit." },
        { id: "children", title: "9. Children's Privacy", content: "Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we discover that we have collected information from a minor, we will take steps to delete it promptly." },
        { id: "changes", title: "10. Changes to This Policy", content: "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Significant changes will be communicated through a notice on our website. Your continued use of our services after changes constitutes acceptance of the updated policy." },
        { id: "contact", title: "11. Contact Us", content: "If you have questions about this Privacy Policy or our data practices, please contact us at: Email: privacy@royalcrest.com, Phone: +91 99999 99999, Address: 123 Business Avenue, Mumbai, Maharashtra 400001." }
    ];

    return (
        <>
            <SEO
                title="Privacy Policy"
                description="Royal Crest Properties privacy policy. Learn how we collect, use, and protect your personal information when you use our real estate services."
                noindex={false}
            />
            <Navbar />
            <Breadcrumb items={[
                { label: "Home", path: "/" },
                { label: "Privacy Policy" }
            ]} />

            <main>
                <section className="page-hero">
                    <div className="container">
                        <h1>Privacy Policy</h1>
                        <p>How we collect, use, and protect your personal information.</p>
                    </div>
                </section>

                <section className="section-padding">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div style={{ marginBottom: "32px", padding: "20px", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)" }}>
                                    <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "4px" }}>
                                        <strong>Last Updated:</strong> July 1, 2025
                                    </p>
                                    <p style={{ fontSize: "14px", color: "var(--text-body)", marginBottom: 0, lineHeight: 1.7 }}>
                                        At Royal Crest Properties, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                                    </p>
                                </div>

                                {/* Table of Contents */}
                                <nav style={{ marginBottom: "40px", padding: "24px", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)" }}>
                                    <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>Table of Contents</h2>
                                    <ol style={{ paddingLeft: "20px", marginBottom: 0 }}>
                                        {sections.map((s) => (
                                            <li key={s.id} style={{ marginBottom: "6px" }}>
                                                <a href={`#${s.id}`} style={{ fontSize: "14px", color: "var(--accent-secondary)" }}>{s.title}</a>
                                            </li>
                                        ))}
                                    </ol>
                                </nav>

                                {/* Sections */}
                                {sections.map((section) => (
                                    <div key={section.id} id={section.id} style={{ marginBottom: "32px" }}>
                                        <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>{section.title}</h2>
                                        <p style={{ color: "var(--text-body)", lineHeight: 1.8, fontSize: "15px" }}>{section.content}</p>
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

export default PrivacyPolicy;
