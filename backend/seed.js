require("dotenv").config();
const mongoose = require("mongoose");
const Property = require("./models/property");
const connectDB = require("./config/db");

const seedProperties = [
    {
        title: "Banana Island, Lagos",
        price: 100000000,
        location: "Banana Island, Lagos",
        bedrooms: 4,
        bathrooms: 4,
        area: 1600,
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
        category: "Villa",
        description: "This spectacular modern villa is located in the most exclusive, secure and prestigious neighborhood of Banana Island. Features state-of-the-art designs, a private pool, and panoramic water views."
    },
    {
        title: "Parkview Estate, Lagos",
        price: 200000000,
        location: "Parkview Estate, Lagos",
        bedrooms: 5,
        bathrooms: 5,
        area: 2200,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
        category: "Villa",
        description: "A masterful architectural showcase in Parkview Estate. Offering soaring ceilings, high-end materials, automated systems, and luxurious living spaces designed for hosting."
    },
    {
        title: "Eko Atlantic, Lagos",
        price: 500000000,
        location: "Eko Atlantic, Lagos",
        bedrooms: 3,
        bathrooms: 3,
        area: 1800,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
        category: "Apartment",
        description: "Superb high-rise luxurious apartment overlooking the ocean in the prestigious city of Eko Atlantic. Fully furnished with elite designer furniture, high security and private elevator access."
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected for seeding...");
        
        await Property.deleteMany({});
        console.log("Cleared existing properties.");
        
        await Property.insertMany(seedProperties);
        console.log("Successfully seeded 3 luxury properties!");
        
        mongoose.connection.close();
        console.log("Seeding complete. DB connection closed.");
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
