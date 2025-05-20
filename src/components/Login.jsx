// src/components/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Grab the route user tried to access before being redirected to login
  const from = location.state?.from?.pathname || "/";

  const loginWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true }); // ✅ Go back to the intended route
    } catch (error) {
      alert(error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate(from, { replace: true }); // ✅ Go back to the intended route
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full border p-2 mb-2 rounded"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full border p-2 mb-2 rounded"
      />
      <button
        onClick={loginWithEmail}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
      <button
        onClick={loginWithGoogle}
        className="w-full bg-red-500 mt-2 text-white p-2 rounded hover:bg-red-600"
      >
        Login with Google
      </button>
      <Link
        to="/forgot-password"
        state={{ email }}
        className="text-blue-600 hover:underline"
      >
        Forgot Password?
      </Link>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register Here
        </Link>
      </p>
    </div>
  );
}
