// src/api/axiosConfig.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://your-backend-url.com/api', // URL de votre back-end déployé
});

// Ajouter un intercepteur pour inclure un token si nécessaire
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Récupérer le token JWT s'il existe
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
