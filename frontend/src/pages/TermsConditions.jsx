import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";

function TermsConditions() {
    const sections = [
        { id: "acceptance", title: "1. Acceptance of Terms", content: "By accessing and using the Royal Crest Properties website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services. These terms apply to all users, visitors, and anyone who accesses our platform." },
        { id: "services", title: "2. Services Description", content: "Royal Crest Properties provides real estate brokerage, property management, interior design consultation, and legal advisory services. While we strive to present accurate property information, we do not guarantee the accuracy, completeness, or reliability of any listings or descriptions. Property details, pricing, and availability are subject to change without notice." },
        { id: "user-accounts", title: "3. User Accounts", content: "When creating an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must notify us immediately of any unauthorized use. We reserve the right to suspend or terminate accounts that violate these terms." },
        { id: "property-listings", title: "4. Property Listings", content: "Property listings on our platform are provided for informational purposes. While we verify listings to the best of our ability, we do not guarantee their accuracy. Prices, measurements, and specifications may vary from actual properties. Users should independently verify all property details before making any decisions. Images may be representative and not reflect current conditions." },
        { id: "user-conduct", title: "5. User Conduct", content: "You agree not to: use our services for any illegal purposes, submit false or misleading information, interfere with the proper functioning of our website, attempt to gain unauthorized access to our systems, harass, threaten, or defame other users, reproduce, duplicate, or copy our content without permission, or use automated tools to scrape or collect data from our platform." },
        { id: "intellectual-property", title: "6. Intellectual Property", content: "All content on the Royal Crest Properties website, including text, graphics, logos, images, software, and design, is our intellectual property or that of our licensors. This content is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, modify, distribute, or create derivative works without our prior written consent." },
        { id: "payment-terms", title: "7. Payment Terms", content: "Service fees and commissions are outlined in individual agreements between Royal Crest Properties and clients. All fees are exclusive of applicable taxes unless stated otherwise. Payment terms are specified in the relevant service agreement. Failure to make timely payments may result in suspension of services and additional charges." },
        { id: "liability", title: "8. Limitation of Liability", content: "Royal Crest Properties shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim. We are not responsible for the actions, conduct, or negligence of third parties, including property developers, sellers, or buyers." },
        { id: "indemnification", title: "9. Indemnification", content: "You agree to indemnify and hold harmless Royal Crest Properties, its directors, officers, employees, and agents from any claims, losses, damages, liabilities, and expenses arising from your use of our services, violation of these terms, or infringement of any third-party rights." },
        { id: "dispute-resolution", title: "10. Dispute Resolution", content: "Any disputes arising from these terms or our services shall be resolved through negotiation first. If negotiation fails, disputes shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration in Mumbai, Maharashtra. The language of arbitration shall be English." },
        { id: "governing-law", title: "11. Governing Law", content: "These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any legal proceedings shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra." },
        { id: "modifications", title: "12. Modifications", content: "We reserve the right to modify these Terms and Conditions at any time. Changes become effective upon posting on our website. Your continued use of our services after changes constitutes acceptance. We encourage you to review these terms periodically." },
        { id: "contact-info", title: "13. Contact Information", content: "For questions about these Terms and Conditions, contact us at: Email: legal@royalcrest.com, Phone: +91 99999 99999, Address: 123 Business Avenue, Mumbai, Maharashtra 400001." }
    ];

    return (
        <>
            <SEO
                title="Terms & Conditions"
                description="Terms and conditions for using Royal Crest Properties' real estate services. Read our policies on property listings, user conduct, liability, and more."
            />
            <Navbar />
            <Breadcrumb items={[
                { label: "Home", path: "/" },
                { label: "Terms & Conditions" }
            ]} />

            <main>
                <section className="page-hero">
                    <div className="container">
                        <h1>Terms & Conditions</h1>
                        <p>Please read these terms carefully before using our services.</p>
                    </div>
                </section>

                <section className="section-padding">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div style={{ marginBottom: "32px", padding: "20px", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)" }}>
                                    <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "4px" }}>
                                        <strong>Effective Date:</strong> July 1, 2025
                                    </p>
                                    <p style={{ fontSize: "14px", color: "var(--text-body)", marginBottom: 0, lineHeight: 1.7 }}>
                                        These Terms & Conditions govern your use of the Royal Crest Properties website and all services offered through our platform.
                                    </p>
                                </div>

                                {/* TOC */}
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

export default TermsConditions;
