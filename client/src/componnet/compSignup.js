// src/components/SignUp.js
import { Link } from 'react-router-dom'; // Import Link for routing between pages
import axios from 'axios'; // Import axios for making API requests
import React, { useState } from 'react'; // Import React and useState hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

const SignUp = () => {
  // State hooks to manage form inputs and error messages
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for managing errors during sign up
  const navigate = useNavigate(); // Hook to navigate after successful sign up

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    try {
      // Send signup request to the backend with the username, email, and password
      await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
      // Navigate to login page after successful signup
      navigate('/login');
    } catch (err) {
      // Set error message if the signup request fails
      setError('Failed to sign up');

      setTimeout(() => {
        setError('');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      {/* Main container with flex layout to center the content */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full p-8">
        <div className="flex-1 p-4">
          {/* Image section */}
          <div className="relative">
            <img
              src="/signeup.png" // Path to the signup image
              alt="Shopping cart and phone" // Alt text for accessibility
              className="inset-0 w-full h-full object-contain rounded-md" // Image styling
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {/* Display error message if there is one */}

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {/* Heading for the form */}
          <h2 className="flex justify-center text-3xl font-semibold mb-6">Create an account</h2>

          
         

          {/* Sign-up form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username input field */}
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state on input change
            />
            {/* Email input field */}
            <input
              type="email"
              placeholder="Email or Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            />
            {/* Password input field */}
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            />
            {/* Sign-up button */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md font-semibold mt-4 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Create Account
            </button>
          </form>

          {/* Link to the Login page for users who already have an account */}
          <div className="text-center mt-4 text-gray-500">
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-500">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
