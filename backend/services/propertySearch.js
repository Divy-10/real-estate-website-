const Property = require("../models/property");

const propertySearch = async (filters) => {
    try {

        const query = {};

        // Location
        if (filters.location && filters.location.trim() !== "") {
            query.location = {
                $regex: filters.location.trim(),
                $options: "i",
            };
        }

        // Category
        if (filters.category && filters.category.trim() !== "") {
            query.category = {
                $regex: filters.category.trim(),
                $options: "i",
            };
        }

        // Bedrooms
        if (filters.bedrooms !== null && filters.bedrooms !== undefined) {
            query.bedrooms = Number(filters.bedrooms);
        }

        // Bathrooms
        if (filters.bathrooms !== null && filters.bathrooms !== undefined) {
            query.bathrooms = Number(filters.bathrooms);
        }

        // Price
        if (filters.minPrice || filters.maxPrice) {

            query.price = {};

            if (filters.minPrice) {
                query.price.$gte = Number(filters.minPrice);
            }

            if (filters.maxPrice) {
                query.price.$lte = Number(filters.maxPrice);
            }
        }

        // Area
        if (filters.area) {
            query.area = {
                $gte: Number(filters.area),
            };
        }



        console.log("================================");
        console.log("AI Filters:", filters);
        console.log("Mongo Query:", JSON.stringify(query, null, 2));



        let properties = await Property.find(query);

        console.log("Exact Match:", properties.length);



        if (properties.length === 0 && query.bedrooms) {

            const relaxedQuery = { ...query };

            delete relaxedQuery.bedrooms;

            console.log("Relaxed Query:", JSON.stringify(relaxedQuery, null, 2));

            properties = await Property.find(relaxedQuery);

            console.log("Without Bedrooms:", properties.length);
            console.log(properties);
        }



        if (properties.length === 0 && query.category) {

            const relaxedQuery = { ...query };

            delete relaxedQuery.category;

            properties = await Property.find(relaxedQuery);

            console.log("Without Category:", properties.length);
        }

        console.log("Final Result:", properties.length);
        console.log("================================");

        return properties;

    } catch (error) {

        console.error("Property Search Error:", error);

        throw new Error(error.message);

    }
};

module.exports = propertySearch;