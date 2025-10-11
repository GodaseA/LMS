import React from 'react'
import "./Sidebar.css"
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-options">

        
                <NavLink to="/addBook" className="sidebar-option">
                    <p>Add Book</p>
                </NavLink>

                <NavLink to="/bookList" className="sidebar-option">
                    <p>Book List</p>
                </NavLink>
                 <NavLink to="/students" className="sidebar-option">
                    <p>Students List</p>
                </NavLink>
                <NavLink to="/request"className="sidebar-option">
                    <p>All Requests</p>
                </NavLink>

    
            </div>

        </div>
    )
}

export default Sidebar