const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// USER SIGNUP

const signup = async (req, res) => {

    try {


        const {
            name,
            email,
            password
        } = req.body;



        const existingUser = await User.findOne({
            email
        });



        if (existingUser) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }



        const hashedPassword = await bcrypt.hash(
            password,
            10
        );



        const user = await User.create({

            name,

            email,

            password: hashedPassword

        });



        const token = jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET || "secretkey",

            {
                expiresIn: "7d"
            }

        );



        res.status(201).json({

            token,

            user

        });



    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};





// USER LOGIN

const login = async (req, res) => {


    try {


        const {
            email,
            password
        } = req.body;



        const user = await User.findOne({
            email
        });



        if (!user) {

            return res.status(400).json({
                message: "Invalid email or password"
            });

        }



        const isMatch = await bcrypt.compare(
            password,
            user.password
        );



        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid email or password"
            });

        }




        const token = jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET || "secretkey",

            {
                expiresIn: "7d"
            }

        );



        res.json({

            token,

            user

        });



    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};





// GOOGLE LOGIN

const googleLogin = async (req, res) => {


    try {


        const {
            name,
            email,
            googleId,
            profileImage
        } = req.body;




        let user = await User.findOne({
            email
        });



        if (!user) {


            user = await User.create({

                name,

                email,

                googleId,

                profileImage,

                password: ""

            });


        }




        const token = jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET || "secretkey",

            {
                expiresIn: "7d"
            }

        );




        res.json({

            token,

            user

        });



    }
    catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};




module.exports = {

    signup,

    login,

    googleLogin

};