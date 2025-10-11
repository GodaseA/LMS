import React from 'react'
import Login from "./Login";
import Signup from "./Signup";
import "./LoginPopup.css";
import { useNavigate } from 'react-router-dom';

const LoginPopup = () => {

    const [LoginStatus, setLoginStatus] = React.useState("Login");

    const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile"); // this path should match your Route path
  };



    return (
        <div className='login-popup'>
            <div className="login-popup-container">
                <div className='login-popup-title'>
                <h1> {LoginStatus}</h1>
                <button className='close-button' onClick={goToProfile}>X</button>
            </div>

            <div className="login-popup-input">
                {LoginStatus === "Login" ? <ul> <Login /><p>Don't have an account? <span onClick={() => setLoginStatus("Signup")}>Sign up</span></p></ul>
                    : <ul> <Signup /><p>Already have an account? <span onClick={() => setLoginStatus("Login")}>Login</span></p></ul>
                }

            </div>

            </div>
            
        </div>
    )
}

export default LoginPopup