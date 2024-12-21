import { Link } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react'; 

import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion'; 
import Spinner from './Spinner';
import api from '../api/axiosConfig' 

const Complogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      setLoading(false);
      navigate('/home');
      window.location.reload();
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Email ou mot de passe incorrect.';
      setError(errorMsg);
      setLoading(false);
      setTimeout(() => setError(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-transparent z-50">
        <div className="absolute inset-0 bg-gray-800 bg-opacity-40"></div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-violet-100 mt-12">
      <motion.div 
        className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full p-8"
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1 p-4">
          <div className="relative">
            <motion.img
              src="/login.png"
              alt="Shopping cart and phone"
              className="inset-0 w-full h-full object-contain rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {error && (
            <motion.p
              className="text-red-500 text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}

          <h2 className="flex justify-center text-3xl font-semibold mb-6 text-blue-600">Log in to E-SHOP</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <motion.input
              type="email"
              placeholder="Email"
              aria-label="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.input
              type="password"
              placeholder="Password"
              aria-label="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
            <motion.div
              className="flex justify-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold mt-4 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                Log In
              </button>
            </motion.div>
          </form>

          <div className="text-center mt-4 text-gray-500">
            Vous n'avez pas de compte ?{" "}
            <Link to="/SignUp" className="text-blue-500 hover:text-violet-500 transition-colors duration-300">
              Inscrivez-vous
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Complogin;
