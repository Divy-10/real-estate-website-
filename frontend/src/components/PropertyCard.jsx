import { Link } from "react-router-dom";
import "./PropertyCard.css";

function PropertyCard({ property }) {
    // Format price elegantly with Rupee or default currency symbol
    const formattedPrice = typeof property.price === 'number'
        ? `₹${property.price.toLocaleString('en-IN')}`
        : property.price;

    return (
        <div className="card property-card-luxury border-0 h-100">
            <div className="property-img-wrapper">
                <img
                    src={
                        property.image
                            ? `http://localhost:5009${property.image}`
                            : "https://via.placeholder.com/300"
                    }
                    alt={property.title}
                    className="property-card-img"
                />
            </div>

            <div className="card-body d-flex flex-column p-4">
                <div className="property-location mb-2 d-flex align-items-center text-muted">
                    <i className="bi bi-geo-alt-fill me-2 text-dark" style={{ fontSize: "14px" }}></i>
                    <span className="location-text">{property.location}</span>
                </div>

                <h4 className="property-title-text mb-3">{property.title}</h4>
                <p>
                    <strong>Category:</strong> {property.category}
                </p>

                {/* Specs */}
                <div className="property-specs d-flex align-items-center gap-3 mb-4 text-muted">
                    <span className="spec-item d-flex align-items-center gap-1">
                        <i className="bi bi-door-closed"></i>
                        <span>{property.bedrooms} Bed</span>
                    </span>
                    <span className="spec-item d-flex align-items-center gap-1">
                        <i className="bi bi-droplet"></i>
                        <span>{property.bathrooms || 2} Bath</span>
                    </span>
                    <span className="spec-item d-flex align-items-center gap-1">
                        <i className="bi bi-arrows-fullscreen" style={{ fontSize: "12px" }}></i>
                        <span>{property.area || 1600} sqft</span>
                    </span>
                </div>

                {/* Footer section of card */}
                <div className="mt-auto d-flex align-items-center justify-content-between pt-3 border-top">
                    <Link
                        to={`/property/${property._id}`}
                        className="btn-book-now text-decoration-none"
                    >
                        Book Now
                    </Link>
                    <span className="property-price-text">{formattedPrice}</span>
                </div>
            </div>
        </div>
    );
}

export default PropertyCard;