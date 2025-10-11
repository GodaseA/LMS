import React from 'react'
import call_icon from "../../assets/call_icon.svg"
import mail_icon from "../../assets/mail_icon.svg"
import "./About.css"
const About = () => {
    return (
        <div id='about' className='about'>
            <h1>About our Library</h1>
            <div className="about-content">
                <p>Our Library Management System is a digital platform designed to simplify the process of managing books and library services. It allows students and readers to easily search, borrow, and return books online, while providing administrators with tools to add, update, and monitor book records.</p>
                <h2>Key Features</h2>
                <ul className="key-points">
                    <li>Accessible anytime, anywhere.</li>
                    <li>Easy book search (by title, author, category).</li>
                    <li>Online borrowing and return tracking.</li>
                    <li>User-friendly admin dashboard.</li>
                    <li>Real-time book availability updates.</li>
                </ul>
            </div>
        </div>
    )
}

export default About