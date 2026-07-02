const express = require("express");
const router = express.Router();


const upload = require("../config/multer");

const {
    getProperties,
    getPropertyById,
    deleteProperty,
    createProperty,
    updateProperty
} = require("../controllers/propertyController");

router.get("/", getProperties);
router.get("/:id", getPropertyById);

router.delete("/:id", deleteProperty);

router.post(
    "/",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "propertyMap", maxCount: 1 }
    ]),
    createProperty
);

router.put("/:id", upload.single("image"), updateProperty);



module.exports = router;