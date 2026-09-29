const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

function getCart(req) {
  if (!req.session.cart) req.session.cart = [];
  return req.session.cart;
}

// View cart
router.get("/", async (req, res) => {
  const cart = getCart(req);
  const items = [];
  let subtotal = 0;

  for (const line of cart) {
    const product = await Product.findById(line.productId);
    if (!product) continue;
    const lineTotal = product.price * line.quantity;
    subtotal += lineTotal;
    items.push({ product, ...line, lineTotal });
  }

  res.render("cart", { title: "Your Bag — Atelier", items, subtotal });
});

// Add to cart
router.post("/add", async (req, res) => {
  const { productId, size, color, quantity } = req.body;
  const cart = getCart(req);

  const existing = cart.find(
    (l) => l.productId === productId && l.size === size && l.color === color
  );

  if (existing) {
    existing.quantity += parseInt(quantity, 10) || 1;
  } else {
    cart.push({
      productId,
      size: size || "M",
      color: color || "",
      quantity: parseInt(quantity, 10) || 1,
    });
  }

  res.redirect("/cart");
});

// Update quantity
router.post("/update", (req, res) => {
  const { index, quantity } = req.body;
  const cart = getCart(req);
  const i = parseInt(index, 10);
  if (cart[i]) {
    cart[i].quantity = Math.max(1, parseInt(quantity, 10) || 1);
  }
  res.redirect("/cart");
});

// Remove item
router.post("/remove", (req, res) => {
  const { index } = req.body;
  const cart = getCart(req);
  const i = parseInt(index, 10);
  if (cart[i] !== undefined) cart.splice(i, 1);
  res.redirect("/cart");
});

module.exports = router;
