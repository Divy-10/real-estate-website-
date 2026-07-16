require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const https = require("https");


const connectDB = require("./config/db");

const propertyRoutes = require("./routes/propertyRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const userAuthRoutes = require("./routes/userAuthRoutes");
const userRoutes = require("./routes/userRoutes");
const aiAdminRoutes = require("./routes/aiAdminRoutes"); // AI Admin Assistant

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
app.use("/api/admin", aiAdminRoutes); // AI Admin Assistant



app.get("/", (req, res) => {
    res.send("backend are now connected succesfully")
});

app.get("/health", (req, res) => {
    res.send("ok");
});

const PORT = process.env.PORT || 5009;

const server = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    
    // Self-ping every 14 minutes to keep the server awake (especially on free hosting like Render)
    const FOURTEEN_MINUTES = 14 * 60 * 1000;
    setInterval(() => {
        const backendUrl = process.env.BACKEND_URL || `http://localhost:${PORT}/health`;
        console.log(`[Self-Ping] Pinging backend at: ${backendUrl}`);
        
        const client = backendUrl.startsWith("https") ? https : http;
        client.get(backendUrl, (res) => {
            console.log(`[Self-Ping] Response Status: ${res.statusCode}`);
        }).on("error", (err) => {
            console.error(`[Self-Ping] Error:`, err.message);
        });
    }, FOURTEEN_MINUTES);
});

server.on("error", (err) => {
    if (err && err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
    }
    console.error(err);
    process.exit(1);
});