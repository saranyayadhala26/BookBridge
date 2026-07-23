const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { addToWishlist,getWishlist,removeFromWishlist } = require("../controllers/wishlist.controller");

router.get("/", protect, getWishlist);
router.post("/:bookId", protect, addToWishlist);
router.delete("/:bookId", protect, removeFromWishlist);

module.exports = router;