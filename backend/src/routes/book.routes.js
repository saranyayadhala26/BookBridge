const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const { addBook, getAllBooks, getBookById,updateBook,deleteBook,searchBooks,uploadBookCover } = require("../controllers/book.controller");
const { protect } = require("../middleware/auth.middleware");

// Public route
router.get("/", getAllBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);

// Protected route
router.post("/", protect, upload.single("coverImage"), addBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);
router.post("/upload", protect, upload.single("coverImage"), uploadBookCover);

module.exports = router;