import React from "react";

const CheckoutForm = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 py-4">
      <div className="flex items-center space-x-4">
        {/* Étape 1 */}
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-orange-600 text-white font-bold rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="ml-2 text-sm font-medium text-black">Livraison</span>
        </div>

        {/* Ligne de progression */}
        <div className="w-16 h-1 bg-orange-600"></div>

        {/* Étape 2 */}
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 font-bold rounded-full">
            2
          </div>
          <span className="ml-2 text-sm font-medium text-gray-500">
            Vérification et paiement
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
