import React, { useState } from "react";

const Checkout = () => {
  // État pour gérer quelle section est ouverte
  const [openSection, setOpenSection] = useState(1);

  // Fonction pour basculer une section
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-5xl bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="py-4 px-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">
            Processus de Paiement
          </h1>
        </div>

        {/* Section Informations personnelles */}
        <div className="border-b border-gray-200">
          <div
            className="py-4 px-6 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(1)}
          >
            <h2 className="text-lg font-semibold">1. Informations personnelles</h2>
            <span>{openSection === 1 ? "▲" : "▼"}</span>
          </div>
          {openSection === 1 && (
            <div className="px-6 pb-6">
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Titre
                  </label>
                  <div className="flex gap-4 mt-1">
                    <label>
                      <input
                        type="radio"
                        name="title"
                        value="M"
                        className="mr-2"
                      />
                      M
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="title"
                        value="Mme"
                        className="mr-2"
                      />
                      Mme
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <input
                    type="text"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    E-mail
                  </label>
                  <input
                    type="email"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Mot de passe (optionnel)
                  </label>
                  <input
                    type="password"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                  />
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Section Adresses */}
        <div className="border-b border-gray-200">
          <div
            className="py-4 px-6 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(2)}
          >
            <h2 className="text-lg font-semibold">2. Adresses</h2>
            <span>{openSection === 2 ? "▲" : "▼"}</span>
          </div>
          {openSection === 2 && (
            <div className="px-6 pb-6">
              <form className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Adresse de livraison
                  </label>
                  <input
                    type="text"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ville
                  </label>
                  <input
                    type="text"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Code postal
                  </label>
                  <input
                    type="text"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                  />
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Section Mode de livraison */}
        <div className="border-b border-gray-200">
          <div
            className="py-4 px-6 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(3)}
          >
            <h2 className="text-lg font-semibold">3. Mode de livraison</h2>
            <span>{openSection === 3 ? "▲" : "▼"}</span>
          </div>
          {openSection === 3 && (
            <div className="px-6 pb-6">
              <form className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Choisir un mode de livraison
                  </label>
                  <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1">
                    <option>Standard - 7 TND</option>
                    <option>Express - 15 TND</option>
                    <option>Retrait en magasin - Gratuit</option>
                  </select>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Section Paiement */}
        <div>
          <div
            className="py-4 px-6 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(4)}
          >
            <h2 className="text-lg font-semibold">4. Paiement</h2>
            <span>{openSection === 4 ? "▲" : "▼"}</span>
          </div>
          {openSection === 4 && (
            <div className="px-6 pb-6">
              <form className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Numéro de carte
                  </label>
                  <input
                    type="text"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date d'expiration
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
