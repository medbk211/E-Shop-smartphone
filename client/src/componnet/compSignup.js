import { Link } from 'react-router-dom'; 

import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion'; 
import api from '../api/axiosConfig'

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('auth/signup', { username, email, password });
      navigate('/login');
    } catch (err) {
      setError('Failed to sign up');
      setTimeout(() => setError(''), 1000);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <motion.div 
        className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full p-8"
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6 }}
      >
        {/* Section Image */}
        <div className="flex-1 p-4 bg-gradient-to-b from-blue-500 to-violet-500 rounded-lg">
          <motion.img
            src="/login.png"
            alt="Shopping cart and phone"
            className="w-full h-full object-contain rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>

        {/* Formulaire */}
        <div className="flex-1 flex flex-col justify-center px-6">
          {error && (
            <motion.p
              className="text-red-500 text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}

          <h2 className="text-center text-3xl font-semibold mb-6 text-blue-700">Create an account</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <motion.input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.input
              type="email"
              placeholder="Email or Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
            <motion.input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white py-2 rounded-md font-semibold hover:opacity-90 focus:outline-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Create Account
            </motion.button>
          </form>

          <div className="text-center mt-4 text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-violet-600">
              Log In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
