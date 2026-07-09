import { useEffect, useState } from "react";
import { getFavorites } from "../services/userService";
import PropertyCard from "../components/PropertyCard";

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const data = await getFavorites();
            setFavorites(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">❤️ My Favorite Properties</h2>

            <div className="row">
                {favorites.length > 0 ? (
                    favorites.map((property) => (
                        <div className="col-md-4 mb-4" key={property._id}>
                            <PropertyCard property={property} />
                        </div>
                    ))
                ) : (
                    <p>No favorite properties found.</p>
                )}
            </div>
        </div>
    );
}

export default Favorites;