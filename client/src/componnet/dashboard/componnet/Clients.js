import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Récupérer tous les clients via l'API backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/getAllClients');
        setClients(response.data.users); // Assurez-vous que la structure est correcte
      } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    };
    fetchClients();
  }, []);

  // Filtrer les clients par nom
  const filteredClients = clients.filter((client) =>
    client.username.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrage par nom d'utilisateur
  );

  // Ajouter un client
  const handleAddClient = async () => {
    const newClient = {
      username: 'Nouveau Client',
      email: 'newclient@example.com',
      
      password: '123456', // Ce n'est pas une bonne pratique de définir un mot de passe en dur
    };
    try {
      const response = await axios.post('http://localhost:5000/api/users/addClient', newClient);
      setClients([...clients, response.data.client]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du client:', error);
    }
  };

  // Supprimer un client
  const handleDeleteClient = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce client ?')) {
      try {
        await axios.delete(`/http://localhost:5000/api/users/deleteClient/${id}`);
        setClients(clients.filter(client => client._id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression du client:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Clients</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddClient}
        >
          + Ajouter Client
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un client..."
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table des clients */}
      <table className="w-full table-auto bg-white shadow rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <tr key={client._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{client._id}</td>
                <td className="p-3">{client.username}</td>
                <td className="p-3">{client.email}</td>
                <td className="p-3 text-center">
                  <button className="text-blue-500 hover:underline mr-2">
                    Modifier
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteClient(client._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-3 text-center text-gray-500">
                Aucun client trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
