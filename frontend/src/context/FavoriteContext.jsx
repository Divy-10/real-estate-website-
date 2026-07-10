import { createContext, useContext, useEffect, useState } from "react";
import {
    addFavorite,
    removeFavorite,
    getFavorites
} from "../services/userService";
import { useAuth } from "./AuthContext";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (user) {
            loadFavorites();
        } else {
            setFavorites([]);
        }
    }, [user]);

    const loadFavorites = async () => {

        try {

            const data = await getFavorites();

            setFavorites(data);

        } catch (error) {

            console.log(error);

        }

    };



    const isFavorite = (id) => {

        return favorites.some(
            property => property._id === id
        );

    };



    const toggleFavorite = async (property) => {

        try {

            if (isFavorite(property._id)) {

                await removeFavorite(property._id);

                setFavorites(prev =>
                    prev.filter(
                        item => item._id !== property._id
                    )
                );

            }
            else {

                await addFavorite(property._id);

                setFavorites(prev => [...prev, property]);

            }

        }
        catch (error) {

            console.log(error);
            alert("Please login to save properties to your favorites!");

        }

    };



    return (

        <FavoriteContext.Provider

            value={{

                favorites,

                favoriteCount: favorites.length,

                isFavorite,

                toggleFavorite,

                loadFavorites

            }}

        >

            {children}

        </FavoriteContext.Provider>

    );

};



export const useFavorite = () => useContext(FavoriteContext);   