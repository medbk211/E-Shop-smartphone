import React, { useState } from "react";
import { motion } from "framer-motion";


const Checkout = () => {
  const [openSection, setOpenSection] = useState(1);

  // Toggle section animation
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-5xl bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="py-4 px-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Processus de Paiement</h1>
        </div>

        {/* Form and Summary Section */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Column: Form */}
          <div className="lg:w-2/3 border-r border-gray-200">
            <div className="py-4 px-6">
              {/* Section Informations personnelles */}
              <div className="border-b border-gray-200">
                <div
                  className="accordion-header py-4 px-6 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(1)}
                >
                  <h2 className="text-lg font-semibold">1. Informations personnelles</h2>
                  <span>{openSection === 1 ? "▲" : "▼"}</span>
                </div>

                {/* Animated Section */}
                <motion.div
                  className={`accordion-body ${openSection === 1 ? "slide-in" : "hidden"}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: openSection === 1 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Form Fields */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Titre</label>
                      <div className="flex gap-4 mt-1">
                        <label>
                          <input type="radio" name="title" value="M" className="mr-2" />
                          M
                        </label>
                        <label>
                          <input type="radio" name="title" value="Mme" className="mr-2" />
                          Mme
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Prénom</label>
                      <motion.input
                        type="text"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nom</label>
                      <motion.input
                        type="text"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">E-mail</label>
                      <motion.input
                        type="email"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Mot de passe (optionnel)</label>
                      <motion.input
                        type="password"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                      />
                    </div>
                  </form>
                </motion.div>
              </div>

              {/* Other Sections (Similar to Section 1) */}
              <div className="border-b border-gray-200">
                <div
                  className="accordion-header py-4 px-6 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(2)}
                >
                  <h2 className="text-lg font-semibold">2. Adresses</h2>
                  <span>{openSection === 2 ? "▲" : "▼"}</span>
                </div>

                {/* Animated Section */}
                <motion.div
                  className={`accordion-body ${openSection === 2 ? "slide-in" : "hidden"}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: openSection === 2 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <form className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Adresse de livraison</label>
                      <motion.input
                        type="text"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ville</label>
                      <motion.input
                        type="text"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Code postal</label>
                      <motion.input
                        type="text"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                      />
                    </div>
                  </form>
                </motion.div>
              </div>

              {/* Add similar animations for other sections here... */}

            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-1/3 px-6 py-4">
            <motion.div
              className="order-summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-xl font-semibold mb-4">Résumé de la commande</h3>
              <div className="mb-4">
                <p>1 article</p>
                <p>Livraison: 7,000 TND</p>
                <p>Total TTC: 11,900 TND</p>
                <p>Dépensez 145,100 TND pour la livraison gratuite!</p>
                <p>Taxes incluses: 0,000 TND</p>
              </div>
              <motion.button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Commander
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
