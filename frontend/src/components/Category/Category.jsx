// import React, { useState } from 'react';
// import "./Category.css"
// // import BooksDisplay from '../Books/BooksDisplay';
// import axios from "axios";
// import { toast } from 'react-toastify';
// // import Books from "../../assets/Books_data"
// // import cat_list from "../../assets/Books_data"


// const cat_list = [
//   { category: "All" },
//   { category: "History" },
//   { category: "Fiction" },
//   { category: "Science" },
//   { category: "holi" },
//   { category: "Technology" }

// ];


//  const BorrowHandler = async (bookID) => {
//   try {  
//     const response = await axios.post(
//       `http://localhost:5000/borrowRequests`,
//       { bookId: bookID}, // empty body if you don't need to send extra data
//       { withCredentials: true } // important to send cookies
//     );

//     console.log("Book borrowed successfully:", response.data);
//     // toast.success("Book borrowed successfully!");
//      toast.success(response.data.message )
//   } catch (error) {
//     console.error("Borrow error:", error.response ? error.response.data : error.message);
//     toast.error(errorMsg);
//   }
// };

// const Category = ({ Books }) => {
//   const [category, setCategory] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("")


//   const filteredBooks = category === "All"
//     ? Books
//     : Books.filter(book => book.category === category);


//   const handleClick = (cat) => {
//     setCategory(cat);
//     console.log(cat); // logs the selected category
//   };

//   return (
//     <>
//       <div className="category-all">
//         <h1>Category</h1>
//         <div className='category'>
//           {cat_list.map((cat, index) => (
//             <li className='category-item' key={index}>
//               <button className={category === cat.category ? "active" : ""} onClick={() => handleClick(cat.category)}>
//                 {cat.category}
//               </button>
//             </li>
//           ))}
//         </div>
//       </div>
//       <hr />
//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search books..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />


//       {
//         searchTerm != "" ?
//           <><ul>
//             {Books.filter((book) =>
//               book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               book.category.toLowerCase().includes(searchTerm.toLowerCase())
//             ).map((book, index) => (
//               <li key={index}>
//                 <strong>{book.title}</strong> by {book.author} ({book.category}) count: {book.count}

//               </li>
//             ))}
//           </ul>
//           </>
//           // : <BooksDisplay filteredBooks={filteredBooks} />
//           :<ul>
//         {filteredBooks.map((book, index) => (
//           <li key={index}>
//             <strong>{book.title}</strong> by {book.author} — <em>{book.category}</em>
//             Copies:{book.count}
//             <button onClick={() => BorrowHandler(book._id)} >Borrow Book</button>

//           </li>
//         ))}
//       </ul>

//       }



//     </>
//   );
// };

// export default Category;
