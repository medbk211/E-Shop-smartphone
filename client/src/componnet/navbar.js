import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaAppleAlt,
  FaShoppingBasket,
  FaUser,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { motion } from "framer-motion";

const useOutsideClick = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

const Navbar = ({ favoriteCount = 0, cartCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState(null);

  const menuRef = useOutsideClick(() => setIsMenuOpen(false));
  const profileMenuRef = useOutsideClick(() => setIsProfileMenuOpen(false));

  // Toggle functions
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setIsDarkMode(savedTheme === "dark");
  }, []);

  // Toggle theme
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Load username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUsername(null);
    setIsProfileMenuOpen(false);
  };
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 shadow-md transition-colors duration-300 ${isDarkMode
        ? "bg-gray-900 text-white"
        : "bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white"
        }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <motion.div
          className="text-2xl font-extrabold"
          initial={{ scale: 1, rotate: 0 }}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Link to="/" className="text-white hover:text-yellow-500">
            E-SHOP
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 font-semibold">
          {[
            { label: "Home", to: "/home" },
            { label: "Shop", to: "/shop" },
            { label: "About", to: "/about" },
            { label: "Contact", to: "/contact" },
          ].map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="hover:text-yellow-500 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transform transition"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <FaMoon className="text-yellow-500" />
            ) : (
              <FaSun className="text-yellow-500" />
            )}
          </button>

          {/* Favorites */}
          <Link to="/favorites" className="relative hover:text-yellow-500">
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {favoriteCount}
              </span>
            )}
            <FaAppleAlt className="w-6 h-6" />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-yellow-500">
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
            <FaShoppingBasket className="w-6 h-6" />
          </Link>

          {/* Profile Menu */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={toggleProfileMenu}
              className="hover:text-yellow-500"
              aria-label="Toggle Profile Menu"
            >
              <FaUser className="w-6 h-6" />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md">
                <ul className="py-2">
                  {username ? (
                    <>
                      <li className="px-4 py-2 text-gray-800 font-bold flex items-center transition-all duration-500 ease-in-out transform hover:scale-110 hover:bg-yellow-200">
                        {getGreeting()},{username}
                      </li>




                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-yellow-100"
                        >
                          <FaSignOutAlt className="mr-2" /> Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-gray-800 hover:bg-yellow-100"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <FaSignInAlt className="mr-2" /> Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/signup"
                          className="block px-4 py-2 text-gray-800 hover:bg-yellow-100"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <FaUserPlus className="mr-2" /> Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden relative p-3 bg-primary rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
          aria-label="Toggle Mobile Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 transition-transform duration-300 ease-in-out"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18" />
          </svg>

          {/* Add transition when menu is active */}

        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-2/3 h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white shadow-2xl z-40 md:hidden"
            ref={menuRef}
          >
            {/* Bouton de fermeture */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="absolute top-4 right-4 text-white hover:text-yellow-500 transition transform hover:scale-110"
              aria-label="Close Mobile Menu"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
                initial={{ rotate: 0, scale: 1 }}
                animate={{ rotate: isMenuOpen ? 0 : 90, scale: isMenuOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            </button>

            {/* Liens du menu */}
            <div className="p-6 flex flex-col space-y-6">
              {[
                { label: "Home", to: "/home" },
                { label: "Shop", to: "/shop" },
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold hover:text-yellow-500 hover:underline hover:underline-offset-4 transition duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Effet de fermeture animé */}
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 left-6 text-sm text-gray-400"
            >
              <p>&copy; {new Date().getFullYear()} Your Company</p>
            </motion.div>
          </motion.div>
        )}

      </div>
    </header>
  );
};

export default Navbar;