const express = require("express");
const router = express.Router();

const { addBook, getAllBooks, getBookById,updateBook,deleteBook } = require("../controllers/book.controller");
const { protect } = require("../middleware/auth.middleware");

// Public route
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// Protected route
router.post("/", protect, addBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;