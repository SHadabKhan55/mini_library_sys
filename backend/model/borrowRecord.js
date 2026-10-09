import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student reference is required"],
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book reference is required"],
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
      required: [true, "Return date is required"],
    },
    actualReturnDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
    finePerDay: {
      type: Number,
      default: 10,
    },
    fineAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BorrowRecord", borrowSchema);