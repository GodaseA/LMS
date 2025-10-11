import axios from 'axios';
import React from 'react'
import "./UpdateBook.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';


const UpdateBook = () => {

    const { id } = useParams();
    const [bookDetails, setBookDetails] = React.useState({
        title: '',
        author: '',
        category: '',
        count: 0
    });
    React.useEffect(() => {
        // Fetch the book details using the bookId prop
        // axios.get(`http://localhost:5000/books/find/${bookId}`)
        //     .then(response => {
        //         setBookDetails(response.data);
        //     }).catch(error => {
        //         console.error("Error fetching book details:", error);
        //     });

        getBook();

    }, [ ]);


     const getBook = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/books/find/${id}`);
      console.log(response.data);
      setBookDetails(response.data);
    } catch (error) {
      console.log("Error fetching book data:", error);
    }
  };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBookDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.patch(`http://localhost:5000/books/update/${id}`, {
            ...bookDetails
        }).then(response => {
            console.log("Book updated successfully", response.data);
        }).catch(error => {
            console.error("Error updating book:", error);
        });
    }

    return (
        <div className='update-book'>
            <h2>Update Book</h2>
            <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    name="title"
                    value={bookDetails.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required

                />
                <input
                    type="text"
                    name="author"
                    value={bookDetails.author}
                    onChange={handleChange}
                    placeholder="Author"
                    required
                />
                <input
                    type="text"
                    name="category"
                    value={bookDetails.category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                />
                <input
                    type="number"
                    name="count"
                    value={bookDetails.count}
                    onChange={handleChange}
                    placeholder="Count"
                    required
                />
                <button type="submit">Update Book</button>
            </form>
        </div>
    )
}

export default UpdateBook


