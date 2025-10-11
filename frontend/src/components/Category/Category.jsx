import React, { useState } from 'react';
import "./Category.css"
import BooksDisplay from '../Books/BooksDisplay';
// import Books from "../../assets/Books_data"
// import cat_list from "../../assets/Books_data"


const cat_list = [
  { category: "All" },
  { category: "History" },
  { category: "Fiction" },
  { category: "Science" },
  { category: "holi" },
  { category: "Technology" }
  
];

const Category = ({Books}) => {
  const [category, setCategory] = useState("All");

  const filteredBooks = category === "All"
    ? Books
    : Books.filter(book => book.category === category);


  const handleClick = (cat) => {
    setCategory(cat);
    console.log(cat); // logs the selected category
  };

  return (
    <>
      <div className="category-all">
        <h1>Category</h1>
        <div className='category'>
          {cat_list.map((cat, index) => (
            <li className='category-item' key={index}>
              <button className={category === cat.category ? "active" : ""} onClick={() => handleClick(cat.category)}>
                {cat.category}
              </button>
            </li>
          ))}
        </div>
      </div>
      <hr />
      <BooksDisplay filteredBooks={filteredBooks} />
    </>
  );
};

export default Category;
