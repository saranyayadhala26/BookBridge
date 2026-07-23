const mongoose = require("mongoose");

const borrowRequestSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Returned"],
      default: "Pending",
    },

    requestDate: {
      type: Date,
      default: Date.now,
    },

    AcceptedDate:{
          type: Date,
    },

    returnedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BorrowRequest", borrowRequestSchema);