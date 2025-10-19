import React, { useState, useEffect } from 'react'
import "./BookList.css"
import axios from 'axios';
import UpdateBook from '../UpdateBook/UpdateBook';
import { NavLink } from 'react-router-dom';

const BookList = () => {

  const [Books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")


  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/books");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);


  const handleDelete = async (bookId) => {
    try {
      const deleted = await axios.delete(`http://localhost:5000/student/profile/delete/${bookId}`);
      fetchBooks();
      console.log("book deleted ", deleted)
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  // const handelToggel = async (bookId) => {
  //   try {
  //     const deleted = await axios.patch(`http://localhost:5000/books/toggele/${bookId}`);
  //     fetchBooks();
  //     console.log("statuse is change ", deleted)
  //   } catch (error) {
  //     console.error("Delete error:", error);
  //   }
  // }




  return (
    <div className='books-display'>

      <h1>Book List</h1>
      <div className="books-search-bar">
        <input
          className='search-bar'
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div id='books' className='books-info'>
        {Books.filter((book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((book, index) => (
          <li key={index}>
            <div className="book-info">
              <strong>{book.title}</strong> by -{book.author}  <em>{book.category}</em>
              count:{book.count}
            </div>
            
            <div className="book-action">
              <NavLink to={`/updateBook/${book._id}`}>edit</NavLink>
              <button onClick={() => handleDelete(book._id)} >Delete</button>
            </div>

          </li>
        ))}
      </div>
    </div>
  )
}

export default BookList