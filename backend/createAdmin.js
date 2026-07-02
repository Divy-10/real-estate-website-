const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect("mongodb+srv://netninja:test1234@clustertut.qkibta7.mongodb.net/realestate?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

async function run() {
    const hash = await bcrypt.hash("admin123", 10);

    await Admin.create({
        email: "admin@gmail.com",
        password: hash
    });

    console.log("Admin created successfully");

    mongoose.connection.close();
}

run();