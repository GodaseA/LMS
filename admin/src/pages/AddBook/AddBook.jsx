import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 import "./AddBook.css"
import axios from "axios";

function AddBook() {
    const [newBook, setNewBook] = useState({title: "", author: "", category: "", count: 1});

    const handleAddBook = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/books/add", newBook);

            console.log("book added...1", response);
            // if (response.data.success) {
            setNewBook({  title: "", author: "", category: "",count:1});   
            console.log("book added...2");
            // } else {
            //   console.log("errorrr");
            // }
            toast.success("Book added successfully");
            // tostify.success("Book added successfully");
        } catch (err) {
            console.error("Error while adding book:", err);
        }
    };


    return (
        <div className="Add-book">
            <h2>Add New Book</h2>
            <form className="Add-book-form" onSubmit={handleAddBook}>
                <input
                    placeholder="Title"
                    name="title"
                    value={newBook.title || ""}
                    onChange={(e) => setNewBook({ ...newBook, [e.target.name]: e.target.value })}
                />

                <input
                    placeholder="Author"
                    name="author"
                    value={newBook.author || ""}
                    onChange={(e) => setNewBook({ ...newBook, [e.target.name]: e.target.value })}
                />

                <input
                    placeholder="Category"
                    name="category"
                    value={newBook.category || ""}
                    onChange={(e) => setNewBook({ ...newBook, [e.target.name]: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Count"
                    name="count"
                    value={newBook.count || 1}
                    onChange={(e) => setNewBook({ ...newBook, [e.target.name]: e.target.value })}
                />

                <button type="submit">Add Book</button>
            </form>
        </div>
    );
}

export default AddBook;
