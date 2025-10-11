import { BorrowRequest } from "../models/BorrowRequest.js";
import { Book_schema } from "../models/Book_schema.js";
import Student from "../models/Student.js";

export const requestBorrow = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    const { bookId } = req.body;

    const book = await Book_schema.findById(bookId);
    if (!book) {
      return res.status(200).json({ message: "Book not found" });
    }
    if (book.count <= 0) {
      return res.status(200).json({ message: "Book not available" });
    }

    // Check if already borrowed or requested
    const existingRequest = await BorrowRequest.findOne({
      student: student._id,
      book: book._id,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(200).json({ message: "Request already pending" });
    }

    const borrowReq = new BorrowRequest({
      student: student._id,
      book: book._id,
    });

    await borrowReq.save();

    res.status(201).json({
      message: "Borrow request submitted successfully",
      request: borrowReq,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const allrequest = async (req, res) => {
  try {
    const requests = await BorrowRequest.find()
      .populate("student", "name email")
      .populate("book", "title author category")
      .sort({ requestedAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    // if (!["approved", "rejected"].includes(status))
    if (status != "rejected") {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await BorrowRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = status;
    console.log(status);

    // if (status === "approved") {
    //   const book = await Book_schema.findById(request.book);
    //   if (!book.isAwailable)
    //     return res.status(400).json({ message: "Book already borrowed" });

    //   book.isAwailable = false;
    //   book.count -= 1;
    //   book.borrowAt = new Date();
    //   book.expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    //   await book.save();
    // }

    await request.save();
    res.status(200).json({ message: `Request ${status}`, request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    // 1️⃣ Find the request
    const request = await BorrowRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    if (request.status == "approved") {
      return res.status(404).json({ message: "Request alredy aproved" });
    }

    // 2️⃣ Check if book exists
    const book = await Book_schema.findById(request.book);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    

    // 3️⃣ Check if book count is available
    if (book.count <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // 4️⃣ Approve request & decrease book count
    request.status = "approved";
    await request.save();

    book.count -= 1;
    await book.save();

    res.status(200).json({
      message: "Book approved and count updated",
      book,
      request,
    });
  } catch (error) {
    console.error("Error approving request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteBorrowRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const deleted = await BorrowRequest.findByIdAndDelete(requestId);

    if (!deleted) {
      return res.status(404).json({ message: "Request not found" });
    }

    console.log("Request deleted:", deleted);
    res.status(200).json({ message: "Request deleted successfully", deleted });
  } catch (error) {
    console.error("Error deleting request:", error);
    return res.status(500).json({ message: "Failed to delete request" });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { requestId } = req.params;

    // 1️⃣ Find the request
    const request = await BorrowRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // 2️⃣ Check if book exists
    const book = await Book_schema.findById(request.book);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.count += 1;
    await book.save();

    request.status = "returned";
    await request.save();

    res.status(200).json({
      message: "Book Return and count updated",
      book,
      request,
    });
  } catch (error) {
    console.error("Error Returning book:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
