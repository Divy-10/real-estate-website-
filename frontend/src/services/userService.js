import API from "./api";

export const addFavorite = async (id) => {

    const res = await API.post(
        `/users/favorite/${id}`
    );

    return res.data;

};



export const removeFavorite = async (id) => {

    const res = await API.delete(
        `/users/favorite/${id}`
    );

    return res.data;

};



export const getFavorites = async () => {

    const res = await API.get(
        "/users/favorites"
    );

    return res.data;

};