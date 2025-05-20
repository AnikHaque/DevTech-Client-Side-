import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
  const [user, setUser] = useState(null); // User data from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Token check

  const navigate = useNavigate();
  const location = useLocation();

  // Check for token and user in localStorage on mount and path change
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Helper for active link highlighting
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-600 text-white px-4 py-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold">
          TheCrate
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none text-2xl"
        >
          ☰
        </button>

        {/* Navigation Links */}
        <div
          className={`w-full md:w-auto mt-4 md:mt-0 ${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6`}
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
            <Link
              to="/"
              className={`block py-1 ${
                isActive("/") ? "font-semibold underline" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/add-task"
              className={`block py-1 ${
                isActive("/add-task") ? "font-semibold underline" : ""
              }`}
            >
              Add Task
            </Link>
            <Link
              to="/success"
              className={`block py-1 ${
                isActive("/success") ? "font-semibold underline" : ""
              }`}
            >
              Success Stories
            </Link>
            <Link
              to="/contact"
              className={`block py-1 ${
                isActive("/contact") ? "font-semibold underline" : ""
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Auth Actions */}
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                {user?.photoURL ? (
                  <div className="relative group cursor-pointer">
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10">
                      {user.name || "No Name"}
                    </div>
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-black">
                    ?
                  </div>
                )}

                <button
                  onClick={logout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
