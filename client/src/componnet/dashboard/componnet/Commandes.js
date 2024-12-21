import React, { useState, useEffect, useCallback, useReducer } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa'; // Import the close icon from react-icons
import api from '../../../api/axiosConfig'

// Reducer for managing the different states
const orderReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ORDERS_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_ORDERS_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'UPDATE_STATUS':
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.id ? { ...order, status: action.newStatus } : order
        ),
      };
    default:
      return state;
  }
};

const Commandes = ({ setTotalSales }) => {
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const initialState = {
    orders: [],
    loading: true,
    error: '',
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);

  const fetchOrders = useCallback(async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await api.get('order/all');
      if (response.data && Array.isArray(response.data)) {
        dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: response.data });
      } else {
        dispatch({ type: 'FETCH_ORDERS_ERROR', payload: 'Aucune commande trouvée.' });
      }
         
      
    } catch (error) {
      dispatch({ type: 'FETCH_ORDERS_ERROR', payload: 'Erreur lors de la récupération des commandes.' });
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = filterStatus
    ? state.orders.filter((order) => order.status === filterStatus)
    : state.orders;

 const updateStatus = (id, newStatus) => {
  api
    .put(`order/${id}/status`, { newStatus })
    .then((response) => {
      // Update the local state with the updated order
      dispatch({
        type: 'UPDATE_STATUS',
        id,
        newStatus,
      });
    })
    .catch((error) => {
      console.error('Error updating status:', error);
      alert('Erreur lors de la mise à jour du statut');
    });
};


  const handleClientClick = (orderId) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null); // Close the modal
  };

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>{state.error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Commandes</h1>
      </div>

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

      <table className="w-full table-auto bg-white shadow rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Client</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Adresse</th>
            <th className="p-3 text-left">Total (TND)</th>
            <th className="p-3 text-left">Statut</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders && filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{order._id}</td>
                <td
                  className="p-3 text-blue-500 cursor-pointer hover:underline"
                  onClick={() => handleClientClick(order._id)}
                >
                  {order.personalInfo.firstName} {order.personalInfo.lastName}
                </td>
                <td className="p-3">{order.personalInfo.email}</td>
                <td className="p-3">
                  {order.addresses.shippingAddress}, {order.addresses.city}, {order.addresses.country} - {order.addresses.postalCode}<br />
                  Tel: {order.addresses.phoneNumber}
                </td>
                <td className="p-3">{order.totalAmount} TND</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">{new Date(order.orderDate).toLocaleString()}</td>
                <td className="p-3 text-center">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => updateStatus(order._id, 'En cours')}
                  >
                    En cours
                  </button>
                  <button
                    className="text-green-500 hover:underline mr-2"
                    onClick={() => updateStatus(order._id, 'Livrée')}
                  >
                    Livrée
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => updateStatus(order._id, 'Annulée')}
                  >
                    Annulée
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-3 text-center text-gray-500">
                Aucune commande trouvée.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for displaying order details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
            {/* Close button with FaTimes icon */}
            <button
              className=" text-gray-500 hover:text-red-700"
              onClick={handleCloseModal}
              aria-label="Close order details"
            >
              <FaTimes size={24} /> {/* Using FaTimes icon from react-icons */}
            </button>

            {filteredOrders
              .filter((order) => order._id === selectedOrder)
              .map((order) => (
                <div key={order._id}>
                  <h3 className="text-xl font-semibold mb-4">Détails de la Commande {order._id}</h3>
                  <div className="mb-4">
                    <h4 className="font-bold">Informations Personnelles</h4>
                    <p>Nom: {order.personalInfo.firstName} {order.personalInfo.lastName}</p>
                    <p>Email: {order.personalInfo.email}</p>
                    <p>Adresse: {order.addresses.shippingAddress}, {order.addresses.city}, {order.addresses.country} - {order.addresses.postalCode}</p>
                    <p>Téléphone: {order.addresses.phoneNumber}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold">Produits Commandés</h4>
                    <table className="w-full table-auto bg-white shadow rounded-lg">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="p-3 text-left">ID du Produit</th>
                          <th className="p-3 text-left">Titre</th>
                          <th className="p-3 text-left">Quantité</th>
                          <th className="p-3 text-left">Prix (TND)</th>
                          <th className="p-3 text-left">Total (TND)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item) => (
                          <tr key={item._id} className="border-b hover:bg-gray-100">
                            <td className="p-3">{item.id}</td>
                            <td className="p-3">{item.title}</td>
                            <td className="p-3">{item.quantity}</td>
                            <td className="p-3">{item.discountedPrice} TND</td>
                            <td className="p-3">{item.quantity * item.price} TND</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Commandes;
