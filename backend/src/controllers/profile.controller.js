const User = require("../models/user");
const Book = require("../models/book");
const BorrowRequest = require("../models/BorrowRequest");

const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {

        const { fullName, phone, profileImage } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (fullName) user.fullName = fullName;
        if (phone) user.phone = phone;
        if (profileImage) user.profileImage = profileImage;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getMyBooks = async (req, res) => {
    try {

        const books = await Book.find({
            owner: req.user.id
        });

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

const getProfileStats = async (req, res) => {
    try {

        const booksShared = await Book.countDocuments({
            owner: req.user.id
        });

        const booksBorrowed = await BorrowRequest.countDocuments({
            borrower: req.user.id,
            status: "Approved"
        });

        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            stats: {
                booksShared,
                booksBorrowed,
                trustScore: user.trustScore
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getMyBooks,
    getProfileStats
};