import { Book_schema } from "../models/Book_schema.js";
import Student from "../models/Student.js";

export const addBook = async (req, res) => {
  try {
    let { title, author, category ,count} = req.body;
    if (!title || !author || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let newBook = new Book_schema({
      title: title,
      author: author,
      category: category,
      count : count,
    });
    const bookSave = await newBook.save();
    console.log("book save", bookSave);
    res.status(200).json(bookSave)
    // res.send("book added");
    // res.json(bookSave);
  } catch (error) {
    console.log(error);
  }
};
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book_schema.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  let { id } = req.params;
  try {
    const deleteBooks = await Book_schema.findByIdAndDelete(id);
    console.log("delete book", deleteBooks);
    res.send("deleted book");
  } catch (error) {
    console.log(error);
  }
};

export const toggeleBookStatus = async (req, res) => {
  let { id } = req.params;
  try {
    const book = await Book_schema.findById(id);
    // res.send(book.title);
    // console.log("your booke is");

    book.isAwailable = !book.isAwailable;
    await book.save();

    console.log(`statuse of ${book.title} change as ${book.isAwailable}`);
    res.status(200).json({ message: "status is changed successfully " });
  } catch (error) {
    console.log("error in finding book", error);
  }
};

export const borrowBook = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find student
    const BorrowedBy = await Student.findById(req.user.id);
    if (!BorrowedBy) {
      return res.status(404).json({ message: "Student not found" });
    }
    console.log("Student found:", BorrowedBy.name);

    // Get book ID from params
    const { bookId } = req.body;

    // Find book
    const book = await Book_schema.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check availability
    if (!book.isAwailable) {
      return res.status(400).json({ message: "Book already borrowed" });
    }

    // Set borrow info
    const now = new Date();
    const expireAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hrs

    book.isAwailable = false;
    book.borrowedBy = BorrowedBy._id;
    book.borrowAt = now;
    book.expireAt = expireAt;

    await book.save();

    res.status(200).json({
      message: "Book borrowed successfully",
      book: {
        title: book.title,
        borrowedBy: BorrowedBy.name,
        expireAt,
      },
    });
  } catch (error) {
    console.error("Borrow book error:", error);
    // Send error response
    res.status(500).json({ message: "Internal server error" });
  }
};

export const findBook = async (req, res) => {
  try {
    const { bookId } = req.params; // ✅ extract the ID properly
    const book = await Book_schema.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" }); // ✅ proper 404
    }

    res.status(200).json(book); // ✅ success response
  } catch (error) {
    console.error("Failed to get book data:", error);
    res.status(500).json({ message: "Internal server error" }); // ✅ 500 for server errors
  }
};


export const updateBook = async (req, res) => {
  try {
    const { id } = req.params; // book ID from URL
    const updatedData = req.body; // new data from frontend

    // Find book by ID and update
    const updatedBook = await Book_schema.findByIdAndUpdate(id, updatedData, {
      new: true, // return the updated book instead of old one
      runValidators: true, // ensure validation rules are applied
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Failed to update book" });
  }
};

