require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    lookNumber: "LOOK 01",
    name: "Wool Overcoat",
    category: "Outerwear",
    price: 320,
    compareAtPrice: 390,
    description: "A structured double-breasted overcoat cut from Italian wool. Built for a decade of winters, not one season.",
    fabric: "100% Italian wool, cupro lining",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Camel", "Charcoal"],
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
    isNewArrival: true,
    stock: 12,
  },
  {
    lookNumber: "LOOK 02",
    name: "Silk Slip Dress",
    category: "Dresses",
    price: 210,
    description: "A bias-cut slip dress in mulberry silk. Falls to the ankle with a soft cowl neckline.",
    fabric: "100% mulberry silk",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Ink"],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    isNewArrival: true,
    stock: 8,
  },
  {
    lookNumber: "LOOK 03",
    name: "Ribbed Cashmere Knit",
    category: "Knitwear",
    price: 180,
    description: "A relaxed crewneck in pure cashmere, ribbed at the cuffs and hem for shape retention.",
    fabric: "100% cashmere",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Oatmeal", "Forest", "Burgundy"],
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",
    stock: 15,
  },
  {
    lookNumber: "LOOK 04",
    name: "Tailored Wide-Leg Trouser",
    category: "Dresses",
    price: 145,
    description: "High-waisted wide-leg trousers with a single pleat, cut from a heavyweight cotton twill.",
    fabric: "98% cotton, 2% elastane",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Stone"],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    stock: 20,
  },
  {
    lookNumber: "LOOK 05",
    name: "Leather Belt Bag",
    category: "Accessories",
    price: 95,
    description: "A compact vegetable-tanned leather belt bag with brass hardware that darkens with wear.",
    fabric: "Full-grain leather",
    sizes: ["One Size"],
    colors: ["Tan", "Black"],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    stock: 25,
  },
  {
    lookNumber: "LOOK 06",
    name: "Merino Turtleneck",
    category: "Knitwear",
    price: 120,
    description: "A fine-gauge merino turtleneck, light enough to layer, warm enough to wear alone.",
    fabric: "100% merino wool",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ink", "Cream"],
    image: "https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=800&q=80",
    isSoldOut: true,
    stock: 0,
  },
  {
    lookNumber: "LOOK 07",
    name: "Trench Coat",
    category: "Outerwear",
    price: 275,
    description: "A classic trench in waxed cotton gabardine with a storm flap and belted waist.",
    fabric: "Waxed cotton gabardine",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Khaki"],
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80",
    stock: 10,
  },
  {
    lookNumber: "LOOK 08",
    name: "Silk Scarf",
    category: "Accessories",
    price: 58,
    description: "A hand-rolled silk twill scarf, printed in small batches from an original studio artwork.",
    fabric: "100% silk twill",
    sizes: ["One Size"],
    colors: ["Multi"],
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
    isNewArrival: true,
    stock: 30,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/atelier_store");
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`[seed] Inserted ${products.length} products.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("[seed] Failed:", err);
  process.exit(1);
});
