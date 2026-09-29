const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");

const FLAT_SHIPPING = 350;

async function buildCartSummary(req) {
  const cart = req.session.cart || [];
  const items = [];
  let subtotal = 0;

  for (const line of cart) {
    const product = await Product.findById(line.productId);
    if (!product) continue;
    const lineTotal = product.price * line.quantity;
    subtotal += lineTotal;
    items.push({ product, ...line, lineTotal });
  }
  return { items, subtotal };
}

// Checkout form
router.get("/", async (req, res) => {
  const { items, subtotal } = await buildCartSummary(req);
  if (items.length === 0) return res.redirect("/cart");

  const shipping = subtotal > 0 ? FLAT_SHIPPING : 0;
  res.render("checkout", {
    title: "Checkout — Atelier",
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
  });
});

// Place order
router.post("/place-order", async (req, res) => {
  const { items, subtotal } = await buildCartSummary(req);
  if (items.length === 0) return res.redirect("/cart");

  const shipping = FLAT_SHIPPING;
  const total = subtotal + shipping;

  const order = await Order.create({
    items: items.map((i) => ({
      product: i.product._id,
      name: i.product.name,
      lookNumber: i.product.lookNumber,
      size: i.size,
      color: i.color,
      price: i.product.price,
      quantity: i.quantity,
      image: i.product.image,
    })),
    subtotal,
    shipping,
    total,
    customer: {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
    },
    paymentMethod: req.body.paymentMethod || "Cash on Delivery",
  });

  req.session.cart = [];
  res.redirect(`/checkout/success/${order._id}`);
});

// Order success page
router.get("/success/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).render("404", { title: "Not found" });
  res.render("order-success", { title: "Order Confirmed — Atelier", order });
});

module.exports = router;
