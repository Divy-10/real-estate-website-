import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";


function Properties() {

    const [properties, setProperties] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    const fetchProperties = async () => {
        try {
            const response = await API.get("/properties");
            console.log(response.data);
            setProperties(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredProperties = properties.filter(
        (property) => {

            const matchesType =
                selectedType === "" ||
                property.type?.toLowerCase() ===
                selectedType.toLowerCase();

            return matchesType;
        }
    );

    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <>
            <Navbar />

            <div className="container py-5">
                <h1 className="fw-bold mb-5" style={{ fontSize: "36px", letterSpacing: "-1px" }}>
                    Explore All Properties
                </h1>

                <div className="row">
                    {properties.map((property) => (
                        <div
                            key={property._id}
                            className="col-md-4 mb-4"
                        >
                            <PropertyCard property={property} />
                        </div>
                    ))}
                    {properties.length === 0 && (
                        <div className="col-12 text-center py-5">
                            <p className="text-muted">No properties found. Run backend seeds to populate the listings.</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Properties;