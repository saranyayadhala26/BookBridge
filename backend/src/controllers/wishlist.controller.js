const Wishlist = require("../models/Wishlist");
const Book = require("../models/book");

// Add Book to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Check if book exists
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if already wishlisted
    const existingWishlist = await Wishlist.findOne({
      user: req.user.id,
      book: bookId,
    });

    if (existingWishlist) {
      return res.status(400).json({
        success: false,
        message: "Book already exists in wishlist",
      });
    }

    // Create wishlist entry
    const wishlist = await Wishlist.create({
      user: req.user.id,
      book: bookId,
    });

    return res.status(201).json({
      success: true,
      message: "Book added to wishlist",
      wishlist,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getWishlist = async (req, res) => {
  try {

    const wishlist = await Wishlist.find({
      user: req.user.id,
    }).populate("book");

    return res.status(200).json({
      success: true,
      count: wishlist.length,
      wishlist,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;

    const wishlist = await Wishlist.findOneAndDelete({
      user: req.user.id,
      book: bookId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Book not found in wishlist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book removed from wishlist",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};