import React, { useState } from 'react';

const Commandes = () => {
  // Exemple de données commandes
  const [orders, setOrders] = useState([
    {
      id: 1,
      client: 'Ali Ben Ahmed',
      total: 150,
      status: 'En cours',
      date: '2024-12-01',
    },
    {
      id: 2,
      client: 'Sofia Trabelsi',
      total: 300,
      status: 'Livrée',
      date: '2024-11-28',
    },
    {
      id: 3,
      client: 'Yassine Meftah',
      total: 75,
      status: 'Annulée',
      date: '2024-11-30',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('');

  // Filtrer les commandes par statut
  const filteredOrders = filterStatus
    ? orders.filter((order) => order.status === filterStatus)
    : orders;

  // Changer le statut d'une commande
  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Commandes</h1>
      </div>

      {/* Filtrer les commandes par statut */}
      <div className="mb-4 flex items-center space-x-4">
        <select
          className="border border-gray-300 rounded-lg p-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="En cours">En cours</option>
          <option value="Livrée">Livrée</option>
          <option value="Annulée">Annulée</option>
        </select>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => setFilterStatus('')}
        >
          Réinitialiser
        </button>
      </div>

      {/* Table des commandes */}
      <table className="w-full table-auto bg-white shadow rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Client</th>
            <th className="p-3 text-left">Total (TND)</th>
            <th className="p-3 text-left">Statut</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.client}</td>
                <td className="p-3">{order.total}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3 text-center">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => updateStatus(order.id, 'En cours')}
                  >
                    En cours
                  </button>
                  <button
                    className="text-green-500 hover:underline mr-2"
                    onClick={() => updateStatus(order.id, 'Livrée')}
                  >
                    Livrée
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => updateStatus(order.id, 'Annulée')}
                  >
                    Annulée
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-3 text-center text-gray-500">
                Aucune commande trouvée.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Commandes;
