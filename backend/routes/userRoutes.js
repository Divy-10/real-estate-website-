const express = require("express");

const router = express.Router();


const {
    addFavorite,
    removeFavorite,
    getFavorites,
    googleLogin

} = require("../controllers/userController");


const auth = require("../middleware/auth");



// GOOGLE LOGIN

router.post(
    "/google-login",
    googleLogin
);



// ADD FAVORITE

router.post(
    "/favorite/:propertyId",
    auth,
    addFavorite
);


// REMOVE FAVORITE

router.delete(
    "/favorite/:propertyId",
    auth,
    removeFavorite
);


// GET FAVORITES

router.get(
    "/favorites",
    auth,
    getFavorites
);


module.exports = router;