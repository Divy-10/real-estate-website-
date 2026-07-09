const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {

        name: {

            type: String,

            required: true,

            trim: true,

        },


        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true,

            trim: true,

        },


        password: {

            type: String,

            default: "",

        },


        googleId: {

            type: String,

            default: "",

        },


        profileImage: {

            type: String,

            default:
                "https://cdn-icons-png.flaticon.com/512/149/149071.png",

        },


        role: {

            type: String,

            enum: ["user", "admin"],

            default: "user",

        },


        // Favorite Properties

        savedProperties: [

            {

                type: mongoose.Schema.Types.ObjectId,

                ref: "Property",

            }

        ],



        // User Property Inquiries

        inquiries: [

            {

                property: {

                    type: mongoose.Schema.Types.ObjectId,

                    ref: "Property",

                },


                status: {

                    type: String,

                    enum: [
                        "Pending",
                        "Approved",
                        "Rejected"
                    ],

                    default: "Pending",

                },


                createdAt: {

                    type: Date,

                    default: Date.now,

                },


            }

        ],

        favorites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Property"
            }
        ],



    },

    {

        timestamps: true,

    }

);



module.exports = mongoose.model(
    "User",
    userSchema
);