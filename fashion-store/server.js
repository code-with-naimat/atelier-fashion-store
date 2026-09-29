require("dotenv").config({path: require("path").resolve(__dirname, ".env")});
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const path = require("path");
const connectDB = require("./config/db");

const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const checkoutRoutes = require("./routes/checkout");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "atelier_dev_secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
     mongoUrl: process.env.MONGO_URI, 
 }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 7 days
  })
);

// Make cart item count available to all views
app.use((req, res, next) => {
  const cart = req.session.cart || [];
  res.locals.cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  next();
});

app.use("/", productRoutes);
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

app.listen(PORT, () => {
  console.log(`[server] Atelier store running on http://localhost:${PORT}`);
});
