const express = require("express");
const router = express.Router();

const { requestBook,acceptRequest,rejectRequest,returnBook,getMyBorrowedBooks,getMyLentBooks } = require("../controllers/borrow.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/request/:bookId", protect, requestBook);
router.put("/:requestId/accept", protect, acceptRequest);
router.put("/:requestId/reject", protect, rejectRequest);
router.put("/:requestId/return", protect, returnBook);
router.get("/my-borrowed", protect, getMyBorrowedBooks);
router.get("/my-lent", protect, getMyLentBooks);

module.exports = router;