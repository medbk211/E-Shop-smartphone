import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaAppleAlt,
  FaShoppingBasket,
  FaUser,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = ({ favoriteCount = 0, cartCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setIsDarkMode(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
    localStorage.removeItem('token');
    closeMenus();
  };

  return (
    <header className={`fixed top-0 w-full ${isDarkMode ? 'bg-green-800 text-white' : 'bg-yellow-500 text-black'} shadow-md z-50`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-extrabold">
          {/* Logo with Framer Motion */}
          <motion.div
            initial={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ rotate: 360 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              duration: 1,
            }}
          >
            <Link to="/" className="text-white hover:text-white transition duration-500 ease-in-out border-4">
              E-SHOP
            </Link>
          </motion.div>
        </div>

        <nav className="hidden md:flex space-x-8 font-semibold">
          <Link to="/home" className="hover:text-white transition duration-300">Home</Link>
          <Link to="/shop" className="hover:text-white transition duration-300">Shop</Link>
          <Link to="/about" className="hover:text-white transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-white transition duration-300">Contact</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-xl hover:scale-110 transform transition-all duration-300"
          >
            {isDarkMode ? (
              <FaMoon className="text-yellow-500" />
            ) : (
              <FaSun className="text-yellow-500" />
            )}
          </button>

          <Link to="/favorites" className="relative hover:text-white transition-all">
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {favoriteCount}
              </span>
            )}
            <FaAppleAlt className="w-6 h-6" />
          </Link>

          <Link to="/cart" className="relative hover:text-white transition-all">
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
            <FaShoppingBasket className="w-6 h-6" />
          </Link>

          <div className="relative">
            <button onClick={toggleProfileMenu} className="hover:text-white transition duration-300">
              <FaUser className="w-6 h-6" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-green-700 shadow-lg rounded-md animate-fade-in">
                <ul className="py-2">
                  {username ? (
                    <>
                      <li className="px-4 py-2 font-bold">Welcome, {username}</li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-yellow-100 transition-all"
                        >
                          <FaSignOutAlt className="mr-2" /> Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/login" className="block px-4 py-2 hover:bg-yellow-100 transition-all">
                          <FaSignInAlt className="mr-2" /> Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/signup" className="block px-4 py-2 hover:bg-yellow-100 transition-all">
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

        <button onClick={toggleMenu} className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18" />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white dark:bg-green-700 shadow-md animate-slide-down">
            <ul className="flex flex-col p-4">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
