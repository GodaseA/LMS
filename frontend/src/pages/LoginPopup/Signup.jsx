import React, { useState } from "react";
import axios from "axios";
import "./Signup.css"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/signup", form, {
        withCredentials: true,
      });
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error signing up");
    }
  };
     const navigate = useNavigate();
  const goToProfile = () => {
    navigate("/profile"); // this path should match your Route path
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Student Signup</h2>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit"  onClick={goToProfile}>Signup</button>
    </form>
  );
}

export default Signup;
