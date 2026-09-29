const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Home page
router.get("/", async (req, res) => {
  const featured = await Product.find({ isSoldOut: false }).sort({ createdAt: -1 }).limit(4);
  res.render("home", { title: "Atelier — Considered Clothing", featured });
});

// Shop page with category filter
router.get("/shop", async (req, res) => {
  const { category, sort } = req.query;
  const filter = category ? { category } : {};

  let query = Product.find(filter);
  if (sort === "price-asc") query = query.sort({ price: 1 });
  else if (sort === "price-desc") query = query.sort({ price: -1 });
  else query = query.sort({ lookNumber: 1 });

  const products = await query;
  const categories = await Product.distinct("category");

  res.render("shop", {
    title: "Shop — Atelier",
    products,
    categories,
    activeCategory: category || "",
    activeSort: sort || "",
  });
});

// Single product page
router.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).render("404", { title: "Not found" });

  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  }).limit(3);

  res.render("product", { title: `${product.name} — Atelier`, product, related });
});

module.exports = router;
