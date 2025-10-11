import React from 'react'
import call_icon from "../../assets/call_icon.svg"
import mail_icon from "../../assets/mail_icon.svg"
import location_icon from "../../assets/location_icon.svg"

import "./Contact.css"


const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "63895d0e-ff42-4d9a-8ee6-8be821453e73");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      // alert(res.message)
      console.log("Success", res);
    }
  };
  return (
    <div id='contact' className="contact-info">
      <h1>Contact</h1>
      <form onSubmit={onSubmit} className="contact-right">
        <label htmlFor="">Your Name</label>
        <input type="text" placeholder='Enter your name' name='name' />
        <label htmlFor="">Your Email</label>
        <input type="email" placeholder='Enter your email' name='email' />
        <label htmlFor="">Write your message here</label>
        <textarea name="message" rows="8" placeholder='Enter your message'></textarea>
        <button type='submit' className="contact-submit">Submit now</button>
      </form>

      <div className="contact-left">
        <div className="contact-item">
          <img src={call_icon} alt="Phone" />
          <a href="tel:+917498873816">+91 7498873816</a>
        </div>
        <div className="contact-item">
          <img src={mail_icon} alt="Email" />
          <a href="mailto:abhijitgodase04.10@gmail.com">abhijitgodase04.10@gmail.com</a>
        </div>
         <div className="contact-item">
          <img src={location_icon} alt="Add" />
          <a href="">GCOEARA. Awasari Khurd</a>
        </div>

      </div>

    </div>
  )
}

export default Contact