import React from 'react'
import "./Navbar.css"


import { Link,NavLink } from 'react-router-dom';
import logo from "../../assets/logo.jpg"

const Navbar = ({ user, setUser }) => {


  console.log("Navbar user:", user);


  return (
    <div className='navbar'>
      <div className="nav-left">

        <NavLink to = "/" ><img src={logo} alt="" /></NavLink>
        <NavLink to = "/">Home</NavLink>
      </div>
      <div className="nav-right">
        
          <NavLink to="/category">Books</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {
        user ? 
        <Link  onClick={() => {setUser(null); }} to="/profile">Profile</Link>
        :  <Link to="/login" >Login</Link>
        }
          
      </div>

    </div>
  )
}

export default Navbar