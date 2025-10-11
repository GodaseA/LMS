import mongoose from "mongoose";

const borrowRequestSchema = new mongoose.Schema({
    
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book_schema",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected","returned"],
    default: "pending",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

export const BorrowRequest = mongoose.model("BorrowRequest", borrowRequestSchema);
