
// Add Book
const Book = require("../models/book");

// Add Book
const addBook = async (req, res) => {
  try {
    const {
  title,
  author,
  category,
  description,
  condition,
  location,
} = req.body;

console.log(req.file);

const coverImage = req.file ? req.file.location : "";

    // Create Book
    const book = await Book.create({
      title,
      author,
      category,
      description,
      condition,
      coverImage,
      location,
      // Temporary owner (we'll replace this with JWT in the next step)
      owner: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("owner", "fullName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: books.length,
      books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Book By ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id).populate(
      "owner",
      "fullName email"
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check ownership
    if (book.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this book",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("owner", "fullName email");

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this book",
      });
    }

    await Book.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const searchBooks = async (req, res) => {
    try {

        const { title, author, category, description, condition,location } = req.query;
    
        const filter = {};

        if (title) {
            filter.title = {
                $regex: title,
                $options: "i"
            };
        }

        if (author) {
            filter.author = {
                $regex: author,
                $options: "i"
            };
        }

        if (category) {
            filter.category = {
                $regex: category,
                $options: "i"
            };
        }

        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }

        const books = await Book.find(filter);

        res.status(200).json({
            success: true,
            count: books.length,
            books
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const uploadBookCover = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: req.file.location,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
  uploadBookCover
};