import React, { use, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
// import { BrowserRouter , Routr, Route } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
// import Category from './components/Category/Category';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import BooksDisplay from "./components/Books/BooksDisplay"
import LoginPopup from "./pages/LoginPopup/LoginPopup";
import Profile from "./pages/Profile/Profile";
import Footer from "./components/Footer/Footer";

function App() {
  const [books, setBooks] = useState([]);
   const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post("http://localhost:5000/auth/getprofile",
          {},
          { withCredentials: true }
        );
        setUser(response.data.user);
        
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("Error:", err));
  }, []);


  return (

    <>
      {/* {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>} */}

      <div className="App">
        <Navbar  Books={books}   user={user} setUser={setUser} />

        {/* <Navbar /> */}
        <Routes>

          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/" element={<Home />}/> 
          <Route path="/cat" element={<BooksDisplay Books={books} />} />
          {/* <Route path="/cat" element={<BooksDisplay/>}/> */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/login" element={<LoginPopup  />} />

        </Routes>
        {/* <Footer /> */}
        <Footer />
      </div>

        <ToastContainer 
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>

  );
}

export default App;





