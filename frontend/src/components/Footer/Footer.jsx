import React from 'react'
import { assets } from "../../assets/assets.js"
import logo from "../../assets/logo.jpg"


import "./Footer.css"
const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={logo} alt="" />
                    <p>
                    The Library Management System is a MERN stack web application designed to manage books, users, and borrowing requests efficiently. It allows admins to handle book records while users can request, borrow, and return books easily. This project ensures smooth digital library operations with a simple and user-friendly interface.
                    </p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>HOME</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+7498873816</li>
                        <li>abhijitgodase04.10@gmail.com</li>

                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>
                copyright 2025 &copy; All Rights Reserved
            </p>
        </div>
    )
}

export default Footer
