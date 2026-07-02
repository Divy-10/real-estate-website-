const Inquiry = require("../models/Inquiry");
const Property = require("../models/property");


const createInquiry = async (req, res) => {
    try {
        const { property } = req.body;

        const existingProperty = await Property.findById(property.property_id);

        if (!existingProperty) {
            return res.status(404).json({
                message: "Property not found",
            });
        }


        const alreadyBooked = await Inquiry.findOne({
            "property.property_id": property.property_id,
            status: { $ne: "closed" }
        });

        if (alreadyBooked) {
            return res.status(400).json({
                message: "This property is already in inquiry process",
            });
        }


        const inquiry = await Inquiry.create(req.body);

        await Property.findByIdAndUpdate(property.property_id, {
            status: "booked"
        });

        res.status(201).json(inquiry);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


const getInquiries = async (req, res) => {
    try {
        const inquires = await Inquiry.find()
            .populate("property.property_id")
            .sort({ createdAt: -1 });

        res.json(inquires);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createInquiry,
    getInquiries,
};