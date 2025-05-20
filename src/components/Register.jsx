import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase"; // Firebase

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return Swal.fire(
        "Error",
        "Password must have uppercase, lowercase, and at least 6 characters",
        "error"
      );
    }

    try {
      const res = await axios.post("http://localhost:8800/api/register", {
        name,
        email,
        password,
        photoURL,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({ name, email, photoURL }));
      Swal.fire("Success", "Registration successful", "success");
      navigate("/add-task");
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Registration failed",
        "error"
      );
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
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <input
        type="text"
        placeholder="Photo URL (optional)"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleGoogleLogin}>Register with Google</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
