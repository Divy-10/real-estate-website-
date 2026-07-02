import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
    const formattedPrice = typeof property.price === "number"
        ? `₹${property.price.toLocaleString("en-IN")}`
        : property.price;

    const imageUrl = property.image
        ? `http://localhost:5009${property.image}`
        : "https://via.placeholder.com/300";

    return (
        <div className="chat-property-card-luxury">
            <div className="chat-property-img-wrapper">
                <img
                    src={imageUrl}
                    alt={property.title}
                    className="chat-property-card-img"
                />
            </div>

            <div className="chat-property-card-body">
                <span className="chat-property-category">{property.category}</span>
                <h4 className="chat-property-title">{property.title}</h4>

                <div className="chat-property-location mb-2">
                    <i className="bi bi-geo-alt-fill me-1 text-gold"></i>
                    <span>{property.location}</span>
                </div>

                <div className="chat-property-specs">
                    <span className="spec-badge">
                        <i className="bi bi-door-closed"></i>
                        <span>{property.bedrooms} Bed</span>
                    </span>
                    <span className="spec-badge">
                        <i className="bi bi-droplet"></i>
                        <span>{property.bathrooms || 2} Bath</span>
                    </span>
                    <span className="spec-badge">
                        <i className="bi bi-arrows-fullscreen"></i>
                        <span>{property.area || 1600} sqft</span>
                    </span>
                </div>

                <div className="chat-property-footer mt-3">
                    <div className="chat-property-price">{formattedPrice}</div>
                    <Link to={`/property/${property._id}`} className="chat-property-btn">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;