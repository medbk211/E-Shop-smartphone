import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making API requests
import { FiHome, FiBox, FiShoppingCart, FiUsers, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook to programmatically navigate

const Sidebar = ({ setActivePage }) => {

    const [isOpen, setIsOpen] = useState(true); // For handling mobile sidebar toggle
    const navigate = useNavigate(); // Hook to navigate after successful login

    const handleLogout = () => {
        localStorage.removeItem('username'); // Supprimer le nom d'utilisateur du stockage local
        navigate('/home');
        window.location.reload();

    };

    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <h2 className="text-lg font-bold mb-6">E-SHOP Dashboard</h2>
            <ul>
                <li className="mb-4 flex items-center">
                    <FiHome className="mr-2" />
                    <a href="#" className="hover:text-gray-400"
                     onClick={() => setActivePage('MainContent')}>Dashboard</a>
                </li>
                <li className="mb-4 flex items-center">
                    <FiBox className="mr-2" />
                    <a
                        href="#"
                        className="hover:text-gray-400"
                        onClick={() => setActivePage('Produits')}
                    >
                        Produits
                    </a>
                </li>
                <li className="mb-4 flex items-center">
                    <FiShoppingCart className="mr-2" />
                    <a
                        href="#"
                        className="hover:text-gray-400"
                        onClick={() => setActivePage('Commandes')}
                    >
                        Commandes
                    </a>
                </li>
                <li className="mb-4 flex items-center">
                    <FiUsers className="mr-2" />
                    <a
                        href="#"
                        className="hover:text-gray-400"
                        onClick={() => setActivePage('Clients')}
                    >
                        Clients
                    </a>
                </li>
                <li className="mt-6 flex items-center">
                    <FiLogOut className="mr-2" />
                    <button
                        className="hover:text-gray-400"
                        onClick={handleLogout}
                    >
                        Retour
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;





























