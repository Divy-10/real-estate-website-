const filterExtractor = require("../utils/filterExtractor");

const aiService = async (message) => {
    const filters = await filterExtractor(message);
    return filters;
};

module.exports = aiService;