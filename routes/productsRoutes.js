const express = require("express");
const fs = require("fs");
const multer = require("multer");
const router = express.Router();
const Products = require("../models/products");

const { createProducts, show_products_list, get_edit_product, post_edit_product, show_products, toggle_product_status, get_product_details } = require("../controllers/productsController");
const { requireAdminAuth, requireAuth } = require("../middleware/auth");

// Set up Multer storage for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = "uploads/";
        fs.mkdirSync(uploadDir, { recursive: true }); // Ensure the directory exists
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Route for rendering product creation form
router.get("/createProducts", (req, res) => {
    res.render("createProducts");
});
router.get("/products", requireAuth, show_products);

router.post("/createProducts", upload.single("image"), createProducts);
router.get("/products_list", requireAdminAuth, show_products_list);
router.get("/editProducts/:id",requireAdminAuth, get_edit_product);
router.post("/editProducts/:id", upload.single("image"),requireAdminAuth, post_edit_product);

router.post("/toggle_product_status/:id", toggle_product_status);

router.get("/product_details/:id",requireAuth, get_product_details);

module.exports = router;
