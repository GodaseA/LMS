import React, { useState } from 'react';
import "./BooksDisplay.css"
// import BooksDisplay from '../Books/BooksDisplay';
import axios from "axios";
import { toast } from 'react-toastify';
// import Books from "../../assets/Books_data"
// import cat_list from "../../assets/Books_data"





const BorrowHandler = async (bookID) => {

  try {
    const response = await axios.post(
      `http://localhost:5000/borrowRequests`,
      { bookId: bookID }, // empty body if you don't need to send extra data
      { withCredentials: true } // important to send cookies
    );

    console.log("Book borrowed successfully:", response.data);
    // toast.success("Book borrowed successfully!");
    toast.success(response.data.message)
  } catch (error) {
    console.error("Borrow error:", error.response ? error.response.data : error.message);
    toast.error(errorMsg);
  }
};

const BooksDisplay = ({ Books }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(Books.map(book => book.category))];

  const filteredBooks = selectedCategory === "All"
    ? Books
    : Books.filter(book => book.category === selectedCategory);


  return (
    <>
      <div className="book-top">
        <h1>Explore our collection</h1>
        <div className="book-cat-search">
          <div className="books-category">
            <label>Filter by Category: </label>
            <select className='select-category' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

             <input
              className='search-bar'
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>


      <div className="book-display">
        {filteredBooks.filter((book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((book, index) => (
          <li className='book-display' key={book._id || index}>

            <div className='book-info-a'>
              <strong>{book.title}</strong> by {book.author}
            </div>
            <div className='book-info-b'>
              <em>{book.category}</em>
              <span className="book-copies"> • Copies: {book.count}</span>
            </div>
            <div className="book-info-action">
              <button onClick={() => BorrowHandler(book._id)}>Borrow Book</button>
            </div>

          </li>
        ))}
      </div>
    </>
  );
};

export default BooksDisplay;
