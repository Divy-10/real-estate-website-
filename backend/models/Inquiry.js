const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },
        property: {
            property_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Property",
                required: true,
            },
            title: String,
        },

        status: {
            type: String,
            default: "pending", // pending, contacted, closed
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Inquiry', inquirySchema);