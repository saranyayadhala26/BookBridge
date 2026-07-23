const Book = require("../models/book");
const BorrowRequest = require("../models/BorrowRequest");

const requestBook = async (req, res) => {
  try {
    console.log("Request reached controller");

    const { bookId } = req.params;
    console.log("Book ID:", bookId);

    const book = await Book.findById(bookId);
    console.log("Book Owner:", book.owner.toString());
console.log("Logged In User:", req.user.id);
console.log("Are Equal:", book.owner.toString() === req.user.id);
    console.log("Book:", book);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.owner.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot borrow your own book",
      });
    }

    if (!book.availability) {
  return res.status(400).json({
    success: false,
    message: "This book is currently unavailable",
  });
}

const existingRequest = await BorrowRequest.findOne({
    book: bookId,
    borrower: req.user.id,
    status: "Pending"
});

if (existingRequest) {
   return res.status(400).json({
      success:false,
      message:"You have already requested this book"
   });
}
//request book
const borrowRequest = await BorrowRequest.create({
  book: bookId,
  borrower: req.user.id,
  owner: book.owner,
});

return res.status(201).json({
  success: true,
  message: "Borrow request sent successfully",
  borrowRequest,
});

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const acceptRequest = async (req, res) => {
  try {

    const { requestId } = req.params;
    const borrowRequest = await BorrowRequest.findById(requestId).populate("book");
    if (!borrowRequest) {
  return res.status(404).json({
    success: false,
    message: "Borrow request not found",
  });
}

if (borrowRequest.owner.toString() !== req.user.id) {
  return res.status(403).json({
    success: false,
    message: "Only the owner can accept this request",
  });
}

if (borrowRequest.status !== "Pending") {
  return res.status(400).json({
    success: false,
    message: "This request has already been processed",
  });
}

borrowRequest.status = "Accepted";
await borrowRequest.save();
borrowRequest.book.availability = false;
await borrowRequest.book.save();

return res.status(200).json({
  success: true,
  message: "Borrow request accepted successfully",
  borrowRequest,
});

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const rejectRequest = async (req, res) => {
  try {

    const { requestId } = req.params;

    const borrowRequest = await BorrowRequest.findById(requestId);

    if (!borrowRequest) {
      return res.status(404).json({
        success: false,
        message: "Borrow request not found",
      });
    }
    if (borrowRequest.owner.toString() !== req.user.id) {
  return res.status(403).json({
    success: false,
    message: "Only the owner can reject this request",
  });
}

if (borrowRequest.status !== "Pending") {
  return res.status(400).json({
    success: false,
    message: "This request has already been processed",
  });
}

borrowRequest.status = "Rejected";
await borrowRequest.save();

    return res.status(200).json({
      success: true,
      message: "Borrow request rejected successfully",
      borrowRequest,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const returnBook = async (req, res) => {
  try {

    const { requestId } = req.params;

    const borrowRequest = await BorrowRequest.findById(requestId).populate("book");

    if (!borrowRequest) {
      return res.status(404).json({
        success: false,
        message: "Borrow request not found",
      });
    }

    if (borrowRequest.borrower.toString() !== req.user.id) {
  return res.status(403).json({
    success: false,
    message: "Only the borrower can return this book",
  });
}

if (borrowRequest.status !== "Accepted") {
  return res.status(400).json({
    success: false,
    message: "Only accepted requests can be returned",
  });
}
borrowRequest.status = "Returned";
await borrowRequest.save();

borrowRequest.book.availability = true;
await borrowRequest.book.save();
    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
      borrowRequest,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyBorrowedBooks = async (req, res) => {
  try {

    const borrowRequests = await BorrowRequest.find({
      borrower: req.user.id,
    }).populate("book");

    return res.status(200).json({
      success: true,
      borrowRequests,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyLentBooks = async (req, res) => {
  try {

    const lentBooks = await BorrowRequest.find({
      owner: req.user.id,
    })
    .populate("book")
    .populate("borrower", "fullName email");

    return res.status(200).json({
      success: true,
      lentBooks,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
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

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: req.file.location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  requestBook,
  acceptRequest,
  rejectRequest,
  uploadBookCover,
  returnBook,
  getMyBorrowedBooks,
  getMyLentBooks,
};