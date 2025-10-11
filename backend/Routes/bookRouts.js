import express from "express";
import { addBook, borrowBook, deleteBook, findBook, getAllBooks, toggeleBookStatus, updateBook } from "../Controller/bookController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";



const BookRout = express.Router();


BookRout.get("/", getAllBooks);
BookRout.post("/add",addBook);
BookRout.delete("/delete/:id", deleteBook);
BookRout.patch("/toggele/:id",toggeleBookStatus)
BookRout.post("/borrow",authMiddleware,borrowBook)
BookRout.patch("/update/:id",updateBook)
BookRout.get("/find/:bookId",findBook)


export default BookRout;