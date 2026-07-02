const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        area: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: "",
        },
        category: {
            type: String,
            required: true,
        },
        propertyMap: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            default: "available",
        },
        agentWhatsapp: {
            type: String,
            default: "",
        },
        units: [
            {
                unitNumber: String,
                status: {
                    type: String,
                    default: "available"
                },
                price: Number
            }
        ]

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Property", propertySchema);