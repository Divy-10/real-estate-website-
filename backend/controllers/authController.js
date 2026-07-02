const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET || "secretkey",
            { expiresIn: "1d" }
        );

        res.json({
            token,
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginAdmin };