const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");

const {
    getProfile,
    updateProfile,
    getMyBooks,
    getProfileStats
} = require("../controllers/profile.controller");

router.get("/", protect, getProfile);

router.put("/", protect, updateProfile);

router.get("/my-books", protect, getMyBooks);

router.get("/stats", protect, getProfileStats);

module.exports = router;