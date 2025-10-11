import React, { useState, useEffect } from 'react'
import "./BookList.css"
import axios from 'axios';
import UpdateBook from '../UpdateBook/UpdateBook';
import { NavLink } from 'react-router-dom';

const BookList = () => {

  const [Books, setBooks] = useState([]);
  const [statuse,setStatuse]= useState("available")

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
    <div>

      <div id='books' className='books'>
        <h1>Book List</h1>
        <ul>
          {Books.map((book, index) => (
            <li key={index}>
              <strong>{book.title}</strong> by -{book.author}  <em>{book.category}</em> 
              <button onClick={() => handleDelete(book._id)} >Delete</button>
              {/* <button > <UpdateBook bookId={book._id} /></button>
               */}
               <NavLink to={`/updateBook/${book._id}`}>edit</NavLink> 

                count:{book.count}
             {/* { book.isAwailable?
                <button className='butt-available' onClick={()=>handelToggel(book._id)}>available</button>
                :<button className='butt-not-available' onClick={()=>handelToggel(book._id)}>not available</button>
              } */}
            </li>
          ))}
        </ul>
      </div>



    </div>
  )
}

export default BookList