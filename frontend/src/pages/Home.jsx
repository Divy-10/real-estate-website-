import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SerachBar";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";

function Home() {
    const [properties, setProperties] = useState([]);
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");

    const fetchProperties = async () => {
        try {
            const response = await API.get("/properties");
            setProperties(response.data);
        } catch (error) {
            console.error("Error fetching properties", error);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const filteredProperties = properties.filter((property) => {
        const matchesLocation =
            location === "" ||
            property.location
                ?.toLowerCase()
                .includes(location.toLowerCase()) ||
            property.title
                ?.toLowerCase()
                .includes(location.toLowerCase());

        const matchesBudget =
            budget === "" ||
            property.price <= Number(budget);

        return matchesLocation && matchesBudget;
    });

    return (
        <>
            {/* Header + Hero */}
            <div style={{ backgroundColor: "#ebf5ff" }}>
                <Navbar />
                <Hero />
            </div>

            {/* Search Section */}
            <SearchBar
                location={location}
                setLocation={setLocation}
                budget={budget}
                setBudget={setBudget}
            />

            {/* Featured Properties */}
            <div className="container py-5 mt-4">

                <div className="d-flex align-items-end justify-content-between mb-4">

                    <div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <div
                                style={{
                                    width: "30px",
                                    height: "2px",
                                    backgroundColor: "#000"
                                }}
                            ></div>

                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    letterSpacing: "1px",
                                    textTransform: "uppercase"
                                }}
                            >
                                Popular
                            </span>
                        </div>

                        <h2
                            className="fw-bold m-0"
                            style={{
                                fontSize: "36px",
                                letterSpacing: "-1px"
                            }}
                        >
                            Our Popular Homes
                        </h2>
                    </div>

                    <Link
                        to="/properties"
                        className="text-dark fw-bold text-decoration-none d-flex align-items-center gap-2"
                        style={{ fontSize: "15px" }}
                    >
                        Explore All
                        <i className="bi bi-arrow-right"></i>
                    </Link>

                </div>

                <div className="row">

                    {filteredProperties.slice(0, 3).map((property) => (
                        <div
                            key={property._id}
                            className="col-md-4 mb-4"
                        >
                            <PropertyCard property={property} />
                        </div>
                    ))}

                    {filteredProperties.length === 0 && (
                        <div className="col-12 text-center py-5">
                            <h4>No Properties Found</h4>
                            <p className="text-muted">
                                Try another location or budget.
                            </p>
                        </div>
                    )}

                </div>

            </div>

            <WhyChooseUs />

            <Footer />
        </>
    );
}

export default Home;