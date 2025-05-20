import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase"; // Assuming Firebase is set up

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8800/api/login", {
        email,
        password,
      });
      const { token, user } = res.data; // Assuming your backend sends user info and token
      localStorage.setItem("token", token); // Store the token
      localStorage.setItem("user", JSON.stringify(user)); // Store the user data
      Swal.fire("Success", "Login successful", "success");
      navigate("/add-task"); // Redirect to Add Task page
    } catch (err) {
      Swal.fire("Error", "Invalid credentials", "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { email, displayName, photoURL } = result.user;
      const res = await axios.post("http://localhost:8800/api/save-user", {
        email,
        name: displayName,
        photoURL,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: displayName, email, photoURL })
      );
      Swal.fire("Success", "Google Login successful", "success");
      navigate("/add-task");
    } catch (err) {
      Swal.fire("Error", "Google login failed", "error");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
