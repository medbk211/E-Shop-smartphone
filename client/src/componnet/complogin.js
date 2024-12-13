// Importations nécessaires
import { Link } from 'react-router-dom'; // Pour la navigation entre les pages
import React, { useState, useEffect } from 'react'; // Hooks React pour gérer l'état et les effets
import axios from 'axios'; // Pour effectuer des requêtes HTTP
import { useNavigate } from 'react-router-dom'; // Pour naviguer programmatique

import Spinner from './Spinner'; // Composant de chargement

const Complogin = () => {
  // Déclaration des états
  const [email, setEmail] = useState(''); // Stocker l'email saisi par l'utilisateur
  const [password, setPassword] = useState(''); // Stocker le mot de passe saisi
  const [error, setError] = useState(''); // Gérer les erreurs

  const [loading, setLoading] = useState(true); // État de chargement
  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  // Effet pour simuler un chargement initial
  useEffect(() => {
    setTimeout(() => setLoading(false), 500); // Après 3 secondes, désactiver le chargement
  }, []);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    setLoading(true); // Activer l'état de chargement
    
    try {
      // Effectuer une requête POST vers le backend pour se connecter
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
  
      // Stocker le token et le nom d'utilisateur dans localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
  
      // Afficher une notification de succès
     
  
      // Rediriger l'utilisateur vers la page d'accueil
      setLoading(false); // Désactiver le chargement
      navigate('/home');
      window.location.reload(); // Recharger la page pour mettre à jour l'état global
    } catch (err) {
      // Gérer les erreurs (ex. : email ou mot de passe incorrect)
      const errorMsg = err.response?.data?.message || 'Email ou mot de passe incorrect.';
      setError(errorMsg);
      setLoading(false); // Désactiver le chargement
      setTimeout(() => setError(""), 3000); // Effacer l'erreur après 3 secondes
    }
  };

  // Affichage du spinner si l'état de chargement est actif
  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-transparent z-50">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div> {/* Calque semi-transparent */}
        <Spinner />
      </div>
    );
  }
  
  
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      {/* Conteneur principal */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full p-8">
        
        {/* Section image */}
        <div className="flex-1 p-4">
          <div className="relative">
            <img
              src="/signeup.png" // Chemin vers l'image
              alt="Shopping cart and phone" // Texte alternatif pour l'accessibilité
              className="inset-0 w-full h-full object-contain rounded-md" // Styles de l'image
            />
          </div>
        </div>

        {/* Section formulaire */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Afficher un message d'erreur si nécessaire */}
          {error && (
            <p
              className={`text-red-500 text-center mt-4 transition-opacity duration-500 ${
                error ? "opacity-100" : "opacity-0"
              }`}
            >
              {error}
            </p>
          )}

          {/* Titre du formulaire */}
          <h2 className="flex justify-center text-3xl font-semibold mb-6">Log in to Exclusive</h2>

          {/* Formulaire de connexion */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Champ email */}
            <input
              type="email"
              placeholder="Email"
              aria-label="Email" // Accessibilité
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'état email
            />

            {/* Champ mot de passe */}
            <input
              type="password"
              placeholder="Password"
              aria-label="Password" // Accessibilité
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état password
            />

            {/* Bouton de connexion */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-md font-semibold mt-4 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Log In
              </button>

          
            </div>
          </form>

          {/* Lien vers la page d'inscription */}
          <div className="text-center mt-4 text-gray-500">
            Vous n'avez pas de compte ?{" "}
            <Link to="/SignUp" className="text-blue-500">
              Inscrivez-vous
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complogin;
