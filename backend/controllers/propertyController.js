const Property = require("../models/property");

// GET ALL
const getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET BY ID
const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.json(property);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// CREATE
const createProperty = async (req, res) => {
    try {
        const imagePath = req.files?.image
            ? req.files.image[0].path
            : "";

        const units = req.body.units
            ? JSON.parse(req.body.units)
            : [];

        const property = await Property.create({
            ...req.body,
            units,
            image: imagePath,
        });

        res.status(201).json(property);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
const updateProperty = async (req, res) => {
    try {
        const imagePath = req.file
            ? req.file.path
            : req.body.image;

        const units = req.body.units
            ? JSON.parse(req.body.units)
            : [];

        const property = await Property.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                units,
                image: imagePath,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.json(property);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.json({ message: "Property deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
};