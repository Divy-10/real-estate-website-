const responseService = (properties) => {

    // No properties found
    if (!properties || properties.length === 0) {
        return {
            success: false,
            message: "Sorry! I couldn't find any properties matching your requirements.",
            count: 0,
            properties: [],
        };
    }

    // Properties found
    return {
        success: true,
        message: `Great! I found ${properties.length} matching properties for you.`,
        count: properties.length,
        properties,
    };
};

module.exports = responseService;