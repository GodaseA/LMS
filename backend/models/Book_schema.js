import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isAwailable: {
    type: Boolean,
    default: true,
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId, // reference to Student who borrowed
    ref: "Student",
    default: null,
  },
  borrowAt: {
    type: Date,
    default: null,
  },
  expireAt: {
    type: Date,
    default: null,
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  }, // 👈 new field
});

export const Book_schema = mongoose.model("Book_schema", BookSchema);
