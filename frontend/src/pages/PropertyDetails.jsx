import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedUnit, setSelectedUnit] = useState(null);


    const fetchProperty = async () => {
        try {
            const response = await API.get(`/properties/${id}`);
            setProperty(response.data);
        } catch (error) {
            console.error("Error fetching property details", error);
        }
    };
    useEffect(() => {
        fetchProperty();
    }, [id]);

    if (!property) {
        return (
            <>
                <Navbar />
                <div className="container py-5 text-center my-5">
                    <div className="spinner-border text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h4 className="mt-3">Loading Property Details...</h4>
                </div>
                <Footer />
            </>
        );
    }

    const formattedPrice = typeof property.price === 'number'
        ? `₹${property.price.toLocaleString('en-IN')}`
        : property.price;


    const handleWhatsApp = () => {

        if (!selectedUnit) {
            alert(" Please select a unit from the map first");
            return;
        }

        const message = `
            PROPERTY BOOKING REQUEST

            Unit: ${selectedUnit.unitNumber}
            Property: ${property.title}
            Location: ${property.location}
            Price: ${formattedPrice}
            Link: ${window.location.origin}/property/${property._id}

            Hello, I am interested in this unit. Please contact me.
    `;

        const url = `https://wa.me/918780301147?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    };
    return (
        <>
            <Navbar />

            <div className="container py-5">
                <div className="mb-4">
                    <Link to="/properties" className="text-dark fw-bold text-decoration-none d-flex align-items-center gap-2">
                        <i className="bi bi-arrow-left"></i> Back to Listings
                    </Link>
                </div>



                <div className="row g-5">
                    <div className="col-12 mb-4">

                        <div className="d-flex gap-3 border-bottom pb-3">

                            <button
                                className={`btn ${activeTab === "overview"
                                    ? "btn-dark"
                                    : "btn-outline-dark"
                                    }`}
                                onClick={() => setActiveTab("overview")}
                            >
                                <i className="bi bi-house-door me-2"></i>
                                Overview
                            </button>


                        </div>

                    </div>
                    {/* Left Column: Image */}
                    <div className="col-lg-7">

                        {activeTab === "overview" && (

                            <div
                                className="rounded-4 overflow-hidden shadow-sm"
                                style={{ height: "480px" }}
                            >
                                <img
                                    src={
                                        property.image
                                            ? `http://localhost:5009${property.image}`
                                            : "https://via.placeholder.com/600x450"
                                    }
                                    alt={property.title}
                                    className="w-100 h-100"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>

                        )}

                        {activeTab === "map" && (

                            <div className="rounded-4 overflow-hidden shadow-sm bg-white p-3">

                                <h4 className="mb-3"> Select Unit (Required)</h4>

                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    gap: "15px"
                                }}>
                                    {property.units?.map((unit, index) => (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                if (unit.status === "booked") return;
                                                setSelectedUnit(unit);
                                            }}
                                            style={{
                                                padding: "20px",
                                                borderRadius: "10px",
                                                border: "2px solid #333",
                                                cursor: unit.status === "booked" ? "not-allowed" : "pointer",
                                                background:
                                                    selectedUnit?.unitNumber === unit.unitNumber
                                                        ? "#4caf50"
                                                        : unit.status === "booked"
                                                            ? "#ccc"
                                                            : "#f5f5f5",
                                                textAlign: "center"
                                            }}
                                        >
                                            <h5>{unit.unitNumber}</h5>
                                            <p>₹{unit.price}</p>
                                            <small>{unit.status}</small>
                                        </div>
                                    ))}
                                </div>



                            </div>
                        )}
                    </div>

                    {/* Right Column: Info */}
                    <div className="col-lg-5">
                        <div className="d-flex align-items-center gap-2 mb-2 text-muted">
                            <i className="bi bi-geo-alt-fill text-dark"></i>
                            <span>{property.location}</span>
                        </div>

                        <h1 className="fw-bold mb-3" style={{ fontSize: "40px", letterSpacing: "-1px" }}>
                            {property.title}
                        </h1>

                        <h2 className="fw-extrabold text-primary mb-4" style={{ fontSize: "32px", color: "var(--text-dark)" }}>
                            {formattedPrice}
                        </h2>

                        <div className="p-4 rounded-3 bg-light mb-4">
                            <h5 className="fw-bold mb-3">Property Highlights</h5>
                            <div className="row text-center g-3">
                                <div className="col-4 border-end">
                                    <h4 className="fw-bold m-0">{property.bedrooms}</h4>
                                    <small className="text-muted">Bedrooms</small>
                                </div>
                                <div className="col-4 border-end">
                                    <h4 className="fw-bold m-0">{property.bathrooms || 2}</h4>
                                    <small className="text-muted">Bathrooms</small>
                                </div>
                                <div className="col-4">
                                    <h4 className="fw-bold m-0">{property.area || 1600}</h4>
                                    <small className="text-muted">Area (sq ft)</small>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="row text-center g-3">
                                <h5 className="fw-bold mb-2">Description</h5>
                                <p className="text-muted" style={{ lineHeight: "1.6" }}>
                                    {property.description || "This luxury home is equipped with premium finishings, architectural state-of-the-art construction, beautiful lighting systems, and sits in a very prime and highly secure location."}
                                </p>

                                <button
                                    className={`btn ${activeTab === "map"
                                        ? "btn-dark"
                                        : "btn-outline-dark"
                                        }`}
                                    onClick={() => setActiveTab("map")}
                                >
                                    <i className="bi bi-map me-2"></i>
                                    Property Map
                                </button>
                            </div>

                        </div>

                        {!selectedUnit && (
                            <div className="alert alert-warning mt-3">
                                ⚠ Please select a unit before contacting agent
                            </div>
                        )}




                        <button
                            onClick={handleWhatsApp}
                            className="btn btn-success"
                            disabled={!selectedUnit}
                        >
                            Contact Agent
                        </button>
                    </div>
                </div>
            </div >

            <Footer />
        </>
    );
}

export default PropertyDetails;