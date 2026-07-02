import "./Footer.css";

function Footer() {
    return (
        <footer className="footer-luxury py-5 px-4 px-md-5">
            <div className="container-fluid px-0">
                <div className="row align-items-start py-4">
                    {/* Founder Col */}
                    <div className="col-md-4 mb-4 mb-md-0">
                        <h4 className="founder-name">Divy Patel</h4>
                        <p className="founder-title">Founder, Royal Crest Properties</p>
                    </div>

                    {/* Testimonial Quote Col */}
                    <div className="col-md-8 d-flex align-items-start gap-3">
                        <span className="quote-icon"><i className="bi bi-quote"></i></span>
                        <p className="testimonial-text-luxury">
                            Our business is built off of close relationships and we are glad that we are able to share our positive real estate experiences with ur clients.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <hr className="footer-divider my-5" />

                {/* Partner/Sponsor Logos Row */}
                <div className="row justify-content-between align-items-center sponsor-logos-row gap-4 py-2">
                    <div className="col text-center">
                        <span className="sponsor-logo"><i className="bi bi-grid-3x3-gap-fill me-2"></i>EQUINIX</span>
                    </div>
                    <div className="col text-center">
                        <span className="sponsor-logo"><i className="bi bi-stack me-2"></i>DIGITAL REALTY</span>
                    </div>
                    <div className="col text-center">
                        <span className="sponsor-logo"><i className="bi bi-grid-3x3-gap-fill me-2"></i>EQUINIX</span>
                    </div>
                    <div className="col text-center">
                        <span className="sponsor-logo"><i className="bi bi-stack me-2"></i>DIGITAL REALTY</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;