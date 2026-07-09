const User = require("../models/User");
const jwt = require("jsonwebtoken");



// ================= ADD FAVORITE =================

exports.addFavorite = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        const propertyId = req.params.propertyId;


        if (!user.favorites.includes(propertyId)) {

            user.favorites.push(propertyId);

        }


        await user.save();


        res.status(200).json({

            message: "Added to favorites"

        });


    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};





// ================= REMOVE FAVORITE =================

exports.removeFavorite = async (req, res) => {

    try {


        const user = await User.findById(req.user.id);


        user.favorites = user.favorites.filter(

            (id) => id.toString() !== req.params.propertyId

        );


        await user.save();



        res.status(200).json({

            message: "Removed from favorites"

        });



    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};





// ================= GET FAVORITES =================

exports.getFavorites = async (req, res) => {

    try {


        const user = await User.findById(req.user.id)
            .populate("favorites");



        res.status(200).json(

            user.favorites

        );



    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};






// ================= GOOGLE LOGIN =================

exports.googleLogin = async (req, res) => {

    try {


        const {
            name,
            email,
            googleId,
            image

        } = req.body;



        // Check existing user

        let user = await User.findOne({
            email
        });



        // Create new user

        if (!user) {


            user = await User.create({

                name,

                email,

                googleId,

                image,

                favorites: []

            });


        }



        // Create JWT Token

        const token = jwt.sign(

            {
                id: user._id

            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );




        res.status(200).json({

            user,

            token

        });



    }
    catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};