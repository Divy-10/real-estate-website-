import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EMICalculator from "../components/EMICalculator";
import { getBackendUrl } from "../utils/config";
import { useAuth } from "../context/AuthContext";

function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [showEMI, setShowEMI] = useState(false);

    // Contact agent states
    const { user } = useAuth();
    const [showContactModal, setShowContactModal] = useState(false);
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactMessage, setContactMessage] = useState("");
    const [submittingInquiry, setSubmittingInquiry] = useState(false);

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

    // Pre-fill contact details from logged-in user
    useEffect(() => {
        if (user) {
            setContactName(user.name || "");
            setContactEmail(user.email || "");
            if (user.phone) setContactPhone(user.phone || "");
        }
    }, [user, showContactModal]);

    // Auto-generate contact message when unit/property changes
    useEffect(() => {
        if (property && selectedUnit) {
            setContactMessage(`Hello, I am interested in unit ${selectedUnit.unitNumber} of property "${property.title}". Please contact me.`);
        }
    }, [property, selectedUnit]);

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

    const displayPrice = selectedUnit && typeof selectedUnit.price === 'number'
        ? selectedUnit.price
        : property.price;

    const formattedPrice = typeof displayPrice === 'number'
        ? `₹${displayPrice.toLocaleString('en-IN')}`
        : displayPrice;


    const handleWhatsApp = () => {
        if (!selectedUnit) {
            alert(" Please select a unit from the map first");
            return;
        }
        setShowContactModal(true);
    };

    const handleInquirySubmit = async (e) => {
        e.preventDefault();
        if (!contactName.trim() || !contactEmail.trim() || !contactPhone.trim() || !contactMessage.trim()) {
            alert("Please fill all fields");
            return;
        }

        setSubmittingInquiry(true);
        try {
            // Save to database
            await API.post("/inquiries", {
                name: contactName,
                email: contactEmail,
                phone: contactPhone,
                message: contactMessage,
                property: {
                    property_id: property._id,
                    title: property.title
                }
            });

            // Trigger WhatsApp redirect as before
            const message = `
PROPERTY BOOKING REQUEST

Unit: ${selectedUnit.unitNumber}
Property: ${property.title}
Location: ${property.location}
Price: ${formattedPrice}
Link: ${window.location.origin}/property/${property._id}

Hello, I am interested in this unit. My Name is ${contactName}, Phone: ${contactPhone}. Please contact me.
            `;
            const url = `https://wa.me/918780301147?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");

            setShowContactModal(false);
            alert("Inquiry submitted successfully!");
        } catch (error) {
            console.error("Error submitting inquiry", error);
            alert(error.response?.data?.message || "Failed to submit inquiry");
        } finally {
            setSubmittingInquiry(false);
        }
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
                                style={{ height: "clamp(280px, 50vw, 480px)" }}
                            >
                                <img
                                    src={
                                        property.image
                                            ? getBackendUrl(property.image)
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
                                    {property.units?.map((unit, index) => {
                                        const isSelected = selectedUnit?.unitNumber === unit.unitNumber;
                                        const isBooked = unit.status === "booked";
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    if (isBooked) return;
                                                    setSelectedUnit(unit);
                                                }}
                                                className={`unit-card ${isSelected ? "selected" : isBooked ? "booked" : "available"}`}
                                            >
                                                <h5>{unit.unitNumber}</h5>
                                                <p className="mb-1">₹{unit.price}</p>
                                                <small>{unit.status}</small>
                                            </div>
                                        );
                                    })}
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

                            <h5 className="fw-bold mb-2">
                                Description
                            </h5>

                            <p
                                className="text-muted"
                                style={{ lineHeight: "1.7" }}
                            >
                                {property.description ||
                                    "This luxury home is equipped with premium finishings, architectural state-of-the-art construction and located in a prime area."}
                            </p>

                        </div>


                        <div className="mb-4">

                            <button
                                className="btn btn-dark w-100"
                                onClick={() => setShowEMI(true)}
                            >
                                <i className="bi bi-calculator me-2"></i>
                                Calculate EMI
                            </button>

                        </div>

                        <div className="mb-4">

                            <button
                                className={`btn w-100 ${activeTab === "map"
                                    ? "btn-dark"
                                    : "btn-outline-dark"
                                    }`}
                                onClick={() => setActiveTab("map")}
                            >
                                <i className="bi bi-map me-2"></i>

                                View Property Map
                            </button>

                        </div>

                        {!selectedUnit && (
                            <div className="alert alert-warning mt-3">
                                ⚠ Please select a unit before contacting agent
                            </div>
                        )}




                        {user ? (
                            <button
                                onClick={handleWhatsApp}
                                className="btn btn-success w-100"
                                disabled={!selectedUnit}
                            >
                                Contact Agent
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="btn btn-outline-dark w-100 text-center text-decoration-none"
                            >
                                Login to Contact Agent
                            </Link>
                        )}
                    </div>
                </div>
            </div >


            {/* ================= EMI Calculator Modal ================= */}

            {showEMI && (

                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        background: "rgba(0,0,0,.6)"
                    }}
                >

                    <div className="modal-dialog modal-lg modal-dialog-centered">

                        <div
                            className="modal-content border-0"
                            style={{
                                borderRadius: "20px",
                                overflow: "hidden"
                            }}
                        >

                            <div className="modal-header">

                                <h4 className="modal-title fw-bold">

                                    Mortgage Calculator

                                </h4>

                                <button
                                    className="btn-close"
                                    onClick={() => setShowEMI(false)}
                                ></button>

                            </div>

                            <div className="modal-body">

                                <EMICalculator
                                    propertyTitle={property.title}
                                    propertyPrice={displayPrice}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            )}

            {/* ================= Contact Agent Modal ================= */}
            {showContactModal && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        background: "rgba(0,0,0,.6)",
                        zIndex: 1050
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-3 rounded-4">
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">Contact Agent</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowContactModal(false)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleInquirySubmit}>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={contactName}
                                            onChange={(e) => setContactName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={contactEmail}
                                            onChange={(e) => setContactEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            value={contactPhone}
                                            onChange={(e) => setContactPhone(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">Message</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={contactMessage}
                                            onChange={(e) => setContactMessage(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-dark w-100 py-2 rounded-3 fw-bold"
                                        disabled={submittingInquiry}
                                    >
                                        {submittingInquiry ? "Submitting..." : "Submit Inquiry & Chat on WhatsApp"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default PropertyDetails;