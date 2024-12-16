import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";


// Composant pour la Progress Bar
const ProgressBar = ({ step }) => (
  <div className="w-full flex mb-4">
    {["1", "2", "3"].map((s, idx) => (
      <div
        key={s}
        className={`flex-1 h-2 mx-1 ${idx + 1 <= step ? "bg-yellow-400" : "bg-gray-200"}`}
      ></div>
    ))}
  </div>
);

function formatPrice(price) {
  if (!isNaN(price)) {
    return parseFloat(price).toLocaleString('fr-TN', {
      style: 'decimal',
      maximumFractionDigits: 3,
    });
  }
  return '0';
}

// Composant pour une Section Pliable
const Section = ({ title, isOpen, onToggle, children }) => (
  <div className="border-b border-primary">
    <div
      className="accordion-header py-4 px-6 flex justify-between items-center cursor-pointer"
      onClick={onToggle}
    >
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      <span>{isOpen ? "▲" : "▼"}</span>
    </div>
    {isOpen && <div className="p-4">{children}</div>}
  </div>
);

// Modal Configuration
Modal.setAppElement("#root");

const Checkout = ({ calculateTotalWithStamp, cart }) => {
  const [openSection, setOpenSection] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [orderData, setOrderData] = useState({
    personalInfo: { title: "", firstName: "", lastName: "", email: "" },
    addresses: { shippingAddress: "", city: "", postalCode: "", country: "Tunisie", phoneNumber: "" },
    items: cart || [],
  });

  // Validation de champ
  const validateField = (section, field, value) => {
    let error = "";
    if (!value) error = "Ce champ est obligatoire";
    else if (field === "email" && !/\S+@\S+\.\S+/.test(value)) error = "Veuillez entrer un email valide.";
    setErrors((prev) => ({ ...prev, [`${section}.${field}`]: error }));
    return !error;
  };

  const handleInputChange = (section, field, value) => {
    setOrderData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleOrderSubmit = async () => {
    console.log(orderData)

    try {
      const isPersonalInfoValid = Object.values(orderData.personalInfo).every(
        (field) => field.trim() !== ""
      );
      const isAddressValid = Object.values(orderData.addresses).every(
        (field) => field.trim() !== ""
      );

      if (!isPersonalInfoValid || !isAddressValid) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      const totalWithoutStamp = orderData.items.reduce((total, item) => total + item.price * item.quantity, 0);
      const totalWithStamp = calculateTotalWithStamp(totalWithoutStamp);

      const response = await axios.post("http://localhost:5000/api/order/addOrder", {
        personalInfo: orderData.personalInfo,
        addresses: orderData.addresses,
        items: orderData.items,
        totalAmount: totalWithStamp,
      });
      console.log(response);
      setModalOpen(true);
    } catch (error) {
      console.error("Erreur lors de la commande :", error);
      alert("Une erreur s'est produite lors de la soumission de la commande.");
    }
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Calculer le total avec la taxe
  const totalWithoutStamp = orderData.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalWithStamp = calculateTotalWithStamp(totalWithoutStamp);

  // Vérifier si le formulaire est valide
  const isFormValid = Object.values(orderData.personalInfo).every((field) => field.trim() !== "") &&
    Object.values(orderData.addresses).every((field) => field.trim() !== "");

  return (
    <div className="bg-main min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-5xl bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold text-primary mb-4">Processus de Paiement</h1>
        <ProgressBar step={openSection} />
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 border-r border-gray-300">
            <Section
              title="1. Informations Personnelles"
              isOpen={openSection === 1}
              onToggle={() => toggleSection(1)}
            >
              <form className="p-5 grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Titre</label>
                  <div className="flex gap-4 mt-1">
                    <label>
                      <input
                        type="radio"
                        name="title"
                        value="M"
                        onChange={(e) => handleInputChange("personalInfo", "title", e.target.value)}
                      />{" "}
                      M
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="title"
                        value="Mme"
                        onChange={(e) => handleInputChange("personalInfo", "title", e.target.value)}
                      />{" "}
                      Mme
                    </label>
                  </div>
                </div>
                {/* Prénom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prénom *</label>
                  <input
                    type="text"
                    value={orderData.personalInfo.firstName}
                    onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
                    onBlur={() => validateField("personalInfo", "firstName", orderData.personalInfo.firstName)}
                    className="w-full border border-gray-300 rounded-md mt-1 p-2"
                    required
                  />
                  {errors["personalInfo.firstName"] && (
                    <p className="text-red-500 text-sm">{errors["personalInfo.firstName"]}</p>
                  )}
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom *</label>
                  <input
                    type="text"
                    value={orderData.personalInfo.lastName}
                    onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
                    onBlur={() => validateField("personalInfo", "lastName", orderData.personalInfo.lastName)}
                    className="w-full border border-gray-300 rounded-md mt-1 p-2"
                    required
                  />
                  {errors["personalInfo.lastName"] && (
                    <p className="text-red-500 text-sm">{errors["personalInfo.lastName"]}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    value={orderData.personalInfo.email}
                    onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                    onBlur={() => validateField("personalInfo", "email", orderData.personalInfo.email)}
                    className="w-full border border-gray-300 rounded-md mt-1 p-2"
                    required
                  />
                  {errors["personalInfo.email"] && (
                    <p className="text-red-500 text-sm">{errors["personalInfo.email"]}</p>
                  )}
                </div>
              </form>
            </Section>

            <Section
              title="2. Adresses"
              isOpen={openSection === 2}
              onToggle={() => toggleSection(2)}
            >
              <form className="grid grid-cols-1 gap-4 p-4">
                {/* Adresse de livraison */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Adresse de livraison *</label>
                  <input
                    type="text"
                    value={orderData.addresses.shippingAddress}
                    onChange={(e) => handleInputChange("addresses", "shippingAddress", e.target.value)}
                    onBlur={() => validateField("addresses", "shippingAddress", orderData.addresses.shippingAddress)}
                    className="w-full border border-gray-300 rounded-md mt-1 p-2"
                    required
                  />
                  {errors["addresses.shippingAddress"] && (
                    <p className="text-red-500 text-sm">{errors["addresses.shippingAddress"]}</p>
                  )}
                </div>

                {/* Ville */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ville *</label>
                  <select
                    value={orderData.addresses.city}
                    onChange={(e) => handleInputChange("addresses", "city", e.target.value)}
                    onBlur={() => validateField("addresses", "city", orderData.addresses.city)}
                    className="w-full border border-gray-300 rounded-md mt-1 p-2"
                    required
                  >
                    <option value="">Sélectionnez une ville</option>
                    <option value="Ariana">Ariana</option>
                    <option value="Tunis">Tunis</option>
                    <option value="Sousse">Sousse</option>
                  </select>
                  {errors["addresses.city"] && (
                    <p className="text-red-500 text-sm">{errors["addresses.city"]}</p>
                  )}
                </div>

                {/* Code Postal */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Code Postal *</label>
                  <input
                    type="text"
                    value={orderData.addresses.postalCode}
                    onChange={(e) => handleInputChange("addresses", "postalCode", e.target.value)}
                    onBlur={() => validateField("addresses", "postalCode", orderData.addresses.postalCode)}
                    className="w-full border border-gray-300 rounded-md mt-1 p-2"
                    required
                  />
                  {errors["addresses.postalCode"] && (
                    <p className="text-red-500 text-sm">{errors["addresses.postalCode"]}</p>
                  )}
                </div>

                {/* Numéro de téléphone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Numéro de téléphone *</label>
                  <input
                    type="text"
                    value={orderData.addresses.phoneNumber}
                    onChange={(e) => handleInputChange("addresses", "phoneNumber", e.target.value)}
                    onBlur={() => validateField("addresses", "phoneNumber", orderData.addresses.phoneNumber)}
                    className="w-full border border-gray-300 rounded-md mt-1 p-2"
                    required
                  />
                  {errors["addresses.phoneNumber"] && (
                    <p className="text-red-500 text-sm">{errors["addresses.phoneNumber"]}</p>
                  )}
                </div>
              </form>
            </Section>
          </div>

          <div className="lg:w-1/3 px-4">
            <div className="border-b border-gray-300 py-4">
              <h2 className="text-lg font-semibold text-primary">Résumé de la commande</h2>
              <div className="flex justify-between py-2">
                <span>Total sans taxe</span>
                <span>{formatPrice(totalWithoutStamp)} TND</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Total avec taxe</span>
                <span>{formatPrice(totalWithStamp)} TND</span>
              </div>
            </div>

            <button
              onClick={handleOrderSubmit}
              className={`bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg mt-4 ${!isFormValid && "opacity-50 cursor-not-allowed"}`}
              disabled={!isFormValid}
            >
              Confirmer la commande
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="bg-white rounded-lg p-10 w-full max-w-sm mx-auto mt-24 shadow-lg transition-transform transform-gpu"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      >
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-4">
          Commande Confirmée
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Votre commande a été confirmée avec succès. Merci pour votre achat !
        </p>
        <button
          onClick={() => {
            setModalOpen(false);
            setOrderData({
              personalInfo: { title: "", firstName: "", lastName: "", email: "" },
              addresses: { shippingAddress: "", city: "", postalCode: "", country: "Tunisie", phoneNumber: "" },
              items: cart || [],
            });
            window.location.href = "/home";
          }}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Retour à l'accueil
        </button>
      </Modal>

    </div>
  );
};

export default Checkout;
