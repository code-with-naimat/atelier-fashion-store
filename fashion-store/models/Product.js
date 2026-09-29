const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    lookNumber: { type: String, required: true }, // e.g. "LOOK 01"
    name: { type: String, required: true },
    category: { type: String, required: true }, // Outerwear, Dresses, Knitwear, Accessories...
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    description: { type: String, required: true },
    fabric: { type: String },
    sizes: { type: [String], default: ["XS", "S", "M", "L", "XL"] },
    colors: { type: [String], default: [] },
    image: { type: String, required: true },
    gallery: { type: [String], default: [] },
    isNewArrival: { type: Boolean, default: false },
    isSoldOut: { type: Boolean, default: false },
    stock: { type: Number, default: 20 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
