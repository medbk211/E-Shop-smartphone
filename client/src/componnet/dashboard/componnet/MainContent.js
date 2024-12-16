import React, { useState, useEffect } from 'react';
import SalesChart from './SalesChart';
import Notification from '../../Notification';
import Clients from './Clients'; // Import the Clients component
import { getAllProducts } from './productAPI'; // Import the API function to fetch products
import Commandes from './Commandes'; // Import Commandes component

const MainContent = () => {
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [clientCount, setClientCount] = useState(0); // Track the client count here
  const [productCount, setProductCount] = useState(0); // Track the product count here
  const [totalSales, setTotalSales] = useState(0); // State to store total sales

  // Fetch the product count from the API
  const fetchProductCount = async () => {
    try {
      const response = await getAllProducts();
      setProductCount(response.data.length); // Assuming response.data is the product array
    } catch (error) {
      console.error('Erreur lors de la récupération des produits', error);
    }
  };

  useEffect(() => {
    fetchProductCount(); // Fetch the product count on component mount
  }, []);

  return (
    <div className="p-4 bg-gray-100 flex-grow">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="font-bold text-lg">Total Ventes</h2>
          <p className="text-2xl mt-2">{totalSales} TND</p> {/* Display dynamic total sales */}
        </div>
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="font-bold text-lg">Produits</h2>
          <p className="text-2xl mt-2">{productCount}</p> {/* Display the product count */}
        </div>
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="font-bold text-lg">Clients</h2>
          <p className="text-2xl mt-2">{clientCount}</p> {/* Display the client count */}
        </div>
      </div>
      <div className="mt-6">
        <SalesChart />
      </div>
      <Clients setClientCount={setClientCount} /> {/* Pass setClientCount to Clients */}
      <Commandes setTotalSales={setTotalSales} /> {/* Pass setTotalSales to Commandes */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default MainContent;
