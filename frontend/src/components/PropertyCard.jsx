import { Link } from "react-router-dom";
import { useFavorite } from "../context/FavoriteContext";
import { getBackendUrl } from "../utils/config";
import "./PropertyCard.css";

function PropertyCard({ property }) {

    const {
        isFavorite,
        toggleFavorite
    } = useFavorite();

    const formattedPrice =
        typeof property.price === "number"
            ? `₹${property.price.toLocaleString("en-IN")}`
            : property.price;

    return (
        <div className="card property-card-luxury border-0 h-100">

            <div className="property-img-wrapper">

                <img
                    src={
                        property.image
                            ? getBackendUrl(property.image)
                            : "https://via.placeholder.com/400x300"
                    }
                    alt={property.title}
                    className="property-card-img"
                />

                {/* Favorite Heart */}

                <button
                    className={`favorite-btn ${isFavorite(property._id) ? "is-favorite" : ""}`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(property);
                    }}
                    aria-label="Add to favorites"
                >
                    <i className={isFavorite(property._id) ? "bi bi-heart-fill text-danger" : "bi bi-heart"}></i>
                </button>

            </div>

            <div className="card-body d-flex flex-column">

                <small className="text-muted">

                    📍 {property.location}

                </small>

                <h5 className="fw-bold mt-2">

                    {property.title}

                </h5>

                <p className="mb-2">

                    <strong>Category:</strong>

                    {" "}

                    {property.category}

                </p>

                <div className="d-flex justify-content-between mt-auto align-items-center">

                    <Link
                        to={`/property/${property._id}`}
                        className="btn btn-dark"
                    >

                        View Details

                    </Link>

                    <h5 className="text-primary mb-0">

                        {formattedPrice}

                    </h5>

                </div>

            </div>

        </div>
    );
}

export default PropertyCard;