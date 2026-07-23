const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes");
const bookRoutes = require("./src/routes/book.routes");
const connectDB = require("./src/config/db");
const borrowRoutes = require("./src/routes/borrow.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const profileRoutes = require("./src/routes/profile.routes");
const wishlistRoutes = require("./src/routes/wishlist.routes");
const notificationRoutes = require("./src/routes/notification.routes");
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/notifications", notificationRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to BookBridge API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});