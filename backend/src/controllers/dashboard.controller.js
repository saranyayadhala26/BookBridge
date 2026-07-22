const Book = require("../models/book");
const BorrowRequest = require("../models/BorrowRequest");

const getDashboard = async (req, res) => {
    try {

        // Total books added by the logged-in user
        const myBooks = await Book.countDocuments({
            owner: req.user.id
        });

        // Available books
        const availableBooks = await Book.countDocuments({
            owner: req.user.id,
            availability: true
        });

        // Books borrowed by the logged-in user
        const booksBorrowed = await BorrowRequest.countDocuments({
            borrower: req.user.id,
            status: "Approved"
        });

        // Books lent by the logged-in user
        const booksLent = await BorrowRequest.countDocuments({
            owner: req.user.id,
            status: "Approved"
        });

        // Pending borrow requests for the logged-in user's books
        const pendingRequests = await BorrowRequest.countDocuments({
            owner: req.user.id,
            status: "Pending"
        });

        res.status(200).json({
            myBooks,
            availableBooks,
            booksBorrowed,
            booksLent,
            pendingRequests
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getDashboard
};