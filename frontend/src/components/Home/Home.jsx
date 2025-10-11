import React from 'react'
import "./Home.css"
import home from "../../assets/home.jpg"
import { NavLink } from 'react-router-dom'


const Home = () => {
    return (
        <>
        <div className='home-top'>
            <div className="home-left">
                <img src={home} alt="" />
            </div>
            <div className="home-right">
                <h1>Welcome to the Library</h1>
                <p>
                Dive into a world of knowledge and adventure with our extensive collection of books across various genres. Whether you're looking for the latest bestsellers or timeless classics, our library has something for everyone. Start your reading journey today!
                </p>
            </div>
        </div>
        <div className="home-bottom">
            <h1>Explore Our Collection</h1>
            <NavLink to="/category">
                <button>Browse Books</button>
            </NavLink>
        </div>
        </>
    )
}

export default Home