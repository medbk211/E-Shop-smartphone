
import SalesChart from './SalesChart'
import Notification from '../../Notification';
import React, { useState } from 'react'; // Import React and useState hook
const MainContent = () => {

  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
    return (
        <div className="p-4 bg-gray-100 flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow p-6 rounded-lg">
              <h2 className="font-bold text-lg">Total Ventes</h2>
              <p className="text-2xl mt-2">10,000 TND</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <h2 className="font-bold text-lg">Produits</h2>
              <p className="text-2xl mt-2">200</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <h2 className="font-bold text-lg">Clients</h2>
              <p className="text-2xl mt-2">150</p>
            </div>
          </div>
          <div className="mt-6">
            <SalesChart />
          </div>
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
