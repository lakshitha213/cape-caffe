const express = require("express");
const multer = require("multer");
const Product = require("../modal/Poduct"); // import Product model
const router = express.Router();

// Multer setup (memory storage, so file is not saved on disk)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add new product
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("❌ Add product error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
});

// Serve product image
router.get("/:id/image", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.image || !product.image.data) {
      return res.status(404).send("No image found");
    }

    res.contentType(product.image.contentType);
    res.send(product.image.data);
  } catch (error) {
    console.error("❌ Get image error:", error);
    res.status(500).send("Internal server error");
  }
});



module.exports = router;
