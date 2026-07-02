import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
    return (
        <>
            <Navbar />

            <div className="container py-5">

                <div className="text-center mb-5 max-w-700 mx-auto">
                    <h1 className="fw-bold mb-3" style={{ fontSize: "44px", letterSpacing: "-1.5px" }}>About Us</h1>
                    <p className="lead text-muted" style={{ fontSize: "19px", lineHeight: "1.6" }}>
                        Helping people find their dream properties with trust, transparency, and a signature standard of excellence.
                    </p>
                </div>

                <div className="row mb-5 align-items-center g-5">

                    <div className="col-md-6">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <div style={{ width: "20px", height: "2px", backgroundColor: "#000" }}></div>
                            <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>Who We Are</span>
                        </div>
                        <h2 className="fw-bold mb-4" style={{ fontSize: "32px", letterSpacing: "-0.5px" }}>Architecting Lifestyles, Not Just Spaces</h2>
                        <p className="text-muted" style={{ lineHeight: "1.7", fontSize: "15px" }}>
                            We are a premium real estate team dedicated to curation, expert guidance, and delivering elite properties. Our curated listings span the most prestigious postcodes and modern architectural marvels.
                        </p>
                        <p className="text-muted" style={{ lineHeight: "1.7", fontSize: "15px" }}>
                            Through deep expertise, state-of-the-art market evaluation, and a commitment to personalized service, we elevate the property finder process into an art form.
                        </p>
                    </div>

                    <div className="col-md-6">
                        <div className="rounded-4 overflow-hidden shadow-sm" style={{ height: "380px" }}>
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                                alt="About Us"
                                className="w-100 h-100"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </div>

                </div>

                <div className="row text-center g-4 mt-4">

                    <div className="col-md-4">
                        <div className="p-4 border rounded-3 h-100 shadow-sm bg-white">
                            <div className="mb-3 text-primary"><i className="bi bi-compass" style={{ fontSize: "28px", color: "var(--text-dark)" }}></i></div>
                            <h3 className="fw-bold mb-3" style={{ fontSize: "22px" }}>Our Mission</h3>
                            <p className="text-muted m-0" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                                To make property search simple, transparent, and refined. Delivering a frictionless client journey.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="p-4 border rounded-3 h-100 shadow-sm bg-white">
                            <div className="mb-3 text-primary"><i className="bi bi-eye" style={{ fontSize: "28px", color: "var(--text-dark)" }}></i></div>
                            <h3 className="fw-bold mb-3" style={{ fontSize: "22px" }}>Our Vision</h3>
                            <p className="text-muted m-0" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                                To become the definitive benchmark for luxury real estate consulting globally.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="p-4 border rounded-3 h-100 shadow-sm bg-white">
                            <div className="mb-3 text-primary"><i className="bi bi-shield-check" style={{ fontSize: "28px", color: "var(--text-dark)" }}></i></div>
                            <h3 className="fw-bold mb-3" style={{ fontSize: "22px" }}>Why Choose Us</h3>
                            <p className="text-muted m-0" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                                Fully verified high-tier estates, elite agents, and bespoke end-to-end guidance.
                            </p>
                        </div>
                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default About;