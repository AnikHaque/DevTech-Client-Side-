// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../components/Products";
import Login from "../components/Login";
import Register from "../components/Register";
import Blogs from "../components/Blogs/Blogs";
import NotFound from "../components/NotFound/NotFound";
import Profile from "../components/Profile/Profile";
import ForgotPassword from "../components/ForgetPassword";
import Contact from "../components/Contact/Contact";
import SuccessStories from "../components/Success-Stories/Success";
import SubscriptionDetail from "../components/Subscription/SubscriptionDetails";
import ProtectedRoute from "../pages/ProtectedRoute";

export default function AppRoutes({ user }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/blogs"
        element={
          <ProtectedRoute user={user}>
            <Blogs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute user={user}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/success" element={<SuccessStories />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/products"
        element={
          <ProtectedRoute user={user}>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subscriptions/:id"
        element={
          <ProtectedRoute user={user}>
            <SubscriptionDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}
