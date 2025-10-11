import React from 'react'
import "./BooksDisplay.css"
import axios from "axios";
import { toast } from 'react-toastify';


const BooksDisplay = ({ filteredBooks }) => {


  const BorrowHandler = async (bookID) => {
  try {  
    const response = await axios.post(
      `http://localhost:5000/borrowRequests`,
      { bookId: bookID}, // empty body if you don't need to send extra data
      { withCredentials: true } // important to send cookies
    );

    console.log("Book borrowed successfully:", response.data);
    // toast.success("Book borrowed successfully!");
     toast.success(response.data.message )
  } catch (error) {
    console.error("Borrow error:", error.response ? error.response.data : error.message);
    toast.error(errorMsg);
  }
};

  return (
    <div id='books' className='books-display'>
      <h1>Book List</h1>
      <ul>
        {filteredBooks.map((book, index) => (
          <li key={index}>
            <strong>{book.title}</strong> by {book.author} — <em>{book.category}</em>
            Copies:{book.count}
            <button onClick={() => BorrowHandler(book._id)} >Borrow Book</button>

          </li>
        ))}
      </ul>
    </div>
  )
}

export default BooksDisplay