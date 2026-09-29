const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    lookNumber: String,
    size: String,
    color: String,
    price: Number,
    quantity: { type: Number, default: 1 },
    image: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    customer: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: String,
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: String,
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, default: "Cash on Delivery" },
    status: { type: String, default: "Pending" }, // Pending, Confirmed, Shipped, Delivered, Cancelled
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
