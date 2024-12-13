import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';

// Déclaration du composant Navbar
const Navbar = ({ favoriteCount = 0, cartCount = 0 }) => {
  // État pour gérer les menus et les préférences utilisateur
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour le menu principal
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // État pour le menu du profil
  const [isDarkMode, setIsDarkMode] = useState(false); // État pour le mode sombre
  const [username, setUsername] = useState(null); // État pour le nom d'utilisateur

  // Fonction pour basculer l'ouverture du menu principal
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Fonction pour basculer l'ouverture du menu du profil
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  // Fermer tous les menus
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  // Charger le thème initial depuis le stockage local
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Basculer le mode sombre et enregistrer dans le stockage local
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Charger le nom d'utilisateur depuis le stockage local
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Gestion de la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('username'); // Supprimer le nom d'utilisateur du stockage local
    setUsername(null); // Réinitialiser l'état
    localStorage.removeItem('token');
    closeMenus(); // Fermer le menu
  };

  return (
    <header
      className={`fixed top-0 w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white text-gray-200'
        } shadow-md z-50`}
    >
      {/* Conteneur principal */}
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link
            to="/"
            className="text-yellow-400 border-4 border-yellow-400 p-1 rounded"
          >
            E-Shop
          </Link>
        </div>

        {/* Liens de navigation (affichés uniquement sur les écrans moyens et plus) */}
        <nav className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200 font-medium">
          <Link
            to="/home"
            className="hover:text-yellow-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-400 transition duration-300"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-400 transition duration-300"
          >
            About
          </Link>
        </nav>

        {/* Actions utilisateur (mode sombre, favoris, panier, profil) */}
        <div className="flex items-center space-x-4">
          {/* Bouton pour basculer le mode sombre */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-xl"
          >
            {isDarkMode ? (
               <FaMoon className="text-gray-400" />
              
            ) : (
              <FaSun className="text-yellow-500" />
            )}
          </button>

          {/* Bouton pour les favoris avec compteur */}
          <Link to="/favorites" className="relative hover:text-yellow-400">
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-4 h-4 flex items-center justify-center rounded-full">
                {favoriteCount}
              </span>
            )}
            <FaHeart className="w-6 h-6" />
          </Link>

          {/* Bouton pour le panier avec compteur */}
          <Link to="/cart" className="relative hover:text-yellow-400">
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
            <FaShoppingCart className="w-6 h-6" />
          </Link>

          {/* Menu du profil utilisateur */}
          <div className="relative">
            <button onClick={toggleProfileMenu} aria-label="Open profile menu">
              <FaUser className="w-6 h-6" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md">
                <ul className="py-2">
                  {username ? (
                    // Si un utilisateur est connecté
                    <>
                      <li className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 font-bold ">
                        {/* Image de l'utilisateur */}
                        <FaUser className="mr-2 text-red-500" />
                        {/* Affichage du nom d'utilisateur */}
                         {username}  
                      </li>
                      <li>
                        {/* Lien vers les paramètres */}
                 
                      </li>
                      <li>
                        {/* Bouton pour déconnexion */}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-yellow-100 flex items-center"
                        >
                          <FaSignOutAlt className="mr-2 text-red-500" /> Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    // Si aucun utilisateur n'est connecté
                    <>
                      <li>
                        {/* Lien pour se connecter */}
                        <Link
                          to="/login"
                          onClick={closeMenus}
                          className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-yellow-100 flex items-center"
                        >
                          <FaSignInAlt className="mr-2 text-green-500" /> Login
                        </Link>
                      </li>
                      <li>
                        {/* Lien pour s'inscrire */}
                        <Link
                          to="/signup"
                          onClick={closeMenus}
                          className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-yellow-100 flex items-center"
                        >
                          <FaUserPlus className="mr-2 text-blue-500" /> Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Menu hamburger pour les petits écrans */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 dark:text-gray-200"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18" />
            </svg>
          </button>

          {isMenuOpen && (
              <div
              className={`absolute top-39 left-0 w-full max-w-7xl bg-white dark:bg-gray-700 shadow-lg rounded transform transition-all duration-5000 ease-in-out ${
                isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
            >
              <ul className="flex flex-col space-y-4 p-4">
                <li>
                  <Link to="/home" onClick={closeMenus}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={closeMenus}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={closeMenus}>
                    About
                  </Link>
                </li>
              </ul>
            </div>
            )}
          </div>
        </div>
      </header>
  );
};

export default Navbar;
