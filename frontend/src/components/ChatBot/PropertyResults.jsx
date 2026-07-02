import PropertyCard from "./PropertyCard";

const PropertyResults = ({ properties }) => {
    return (
        <div className="property-grid">
            {properties.map((p, index) => (
                <PropertyCard key={index} property={p} />
            ))}
        </div>
    );
};

export default PropertyResults;