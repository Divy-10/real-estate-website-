require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path")


const connectDB = require("./config/db");

const propertyRoutes = require("./routes/propertyRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const userAuthRoutes = require("./routes/userAuthRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const fs = require("fs");

// Create uploads directory programmatically on startup if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static("uploads"));

app.use("/api/properties", propertyRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);



app.get("/", (req, res) => {
    res.send("backend are now connected succesfully")
});

const PORT = process.env.PORT || 5009;

const server = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

server.on("error", (err) => {
    if (err && err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
    }
    console.error(err);
    process.exit(1);
});