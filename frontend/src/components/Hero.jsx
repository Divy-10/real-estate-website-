import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
    return (
        <div className="hero-wrapper">
            <div className="container-fluid px-4 px-md-5">
                <div className="row align-items-center">
                    {/* Left Column: Content */}
                    <div className="col-lg-6 hero-text-col py-5">
                        <h1 className="hero-title">
                            Find A House<br />That Suits You
                        </h1>
                        <p className="hero-subtitle">
                            Want to find a home? We are ready to help you find one that suits your lifestyle and needs
                        </p>
                        <div className="hero-cta-wrapper mb-5">
                            <button className="btn-luxury-dark py-3 px-5">
                                <Link to="/properties">Get Started</Link>
                            </button>
                        </div>

                        {/* Stats Row */}
                        <div className="hero-stats-row d-flex flex-wrap gap-4 gap-md-5">
                            <div className="stat-item">
                                <h3 className="stat-number">1200<span className="plus-sign">+</span></h3>
                                <p className="stat-label">Listed Properties</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="stat-number">4500<span className="plus-sign">+</span></h3>
                                <p className="stat-label">Happy Customers</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="stat-number">100<span className="plus-sign">+</span></h3>
                                <p className="stat-label">Awards</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="col-lg-6 hero-img-col px-0 ps-lg-4">
                        <div className="hero-image-container">
                            <img
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                                alt="Modern Architectural House"
                                className="hero-img"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;