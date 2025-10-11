import React, { useState, useContext } from "react";
import axios from "axios";
import "./Login.css"
 function Login() {
  // const { setUser } = useContext(UserContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", form ,{
  withCredentials: true,
});


      localStorage.setItem("token", res.data.token);
      // setUser(res.data.student); // update context with logged-in student

      // Save token in localStorage
      // localStorage.setItem("token", res.data.token);
      alert("Login successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (




    <form className="login-form" onSubmit={handleLogin}>
      <h2>Student Login</h2>
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
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
