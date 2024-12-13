import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiFillDelete } from "react-icons/ai";

// Fonction pour formater les prix
function formatPrice(price) {
    if (!isNaN(price)) {
        return parseFloat(price).toLocaleString('fr-TN', {
            style: 'decimal',
            maximumFractionDigits: 3,
        });
    }
    return '0'; // Retourner 0 si le prix n'est pas valide
}

const CartPage = ({ cart, removeFromCart, updateCartQuantity }) => {
    const [updatedCart, setUpdatedCart] = useState(cart);
    const [showSummary, setShowSummary] = useState(true); // Afficher ou masquer le résumé
    const [addressForm, setAddressForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        country: '',
        city: '',
        postalCode: '',
        phoneNumber: '',
        additionalPhoneNumber: ''
    });

    // Synchroniser le panier local avec le panier global (props)
    useEffect(() => {
        setUpdatedCart(cart);
    }, [cart]);

    // Fonction pour calculer le total avec les frais de timbre
    const calculateTotalWithStamp = () => {
        const total = updatedCart.reduce((sum, item) => {
            const itemPrice = parseFloat(item.originalPrice);
            return sum + itemPrice * (item.quantity || 0);
        }, 0);
        return total + calculateStampFee();
    };

    // Fonction pour obtenir les frais de timbre
    const calculateStampFee = () => 7.5;

    // Mettre à jour la quantité d'un produit dans le panier
    const updateQuantity = (id, change) => {
        setUpdatedCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
        updateCartQuantity(id, change);  // Notifier le parent du changement
    };

    // Calcul du prix total des produits
    const totalPrice = updatedCart.reduce((total, item) => {
        const itemPrice = parseFloat(item.originalPrice);
        return total + itemPrice * (item.quantity || 0);
    }, 0);

    const totalWithStamp = calculateTotalWithStamp();

    // Soumettre la commande
    const handleSubmitOrder = (e) => {
        e.preventDefault();
        alert("Commande validée !");
    };

    return (
        <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-200 min-h-screen">
            <h2 className="text-3xl font-bold text-green-700 mb-6">Votre Panier</h2>
            {updatedCart.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">Votre panier est vide.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {showSummary ? (
                        <>
                            {/* Section des produits */}
                            <div className="col-span-1 space-y-6">
                                {updatedCart.map((item) => {
                                    const quantity = item.quantity;
                                    const itemPrice = parseFloat(item.originalPrice);
                                    const totalItemPrice = quantity * itemPrice;

                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                                        >
                                            {/* Image */}
                                   
                                            {/* Détails */}
                                            <div className="ml-1 flex-1">
                                                <h7 className=" font-semibold">{item.title}</h7>
                                                <p className="text-sm text-gray-500">{item.details}</p>
                                                
                                            </div>
                                            {/* Quantité */}
                                            <div className="flex items-center">
                                                <button
                                                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                >
                                                    <AiOutlineMinus />
                                                </button>
                                                <span className="px-2 font-semibold">{quantity}</span>
                                                <button
                                                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                >
                                                    <AiOutlinePlus />
                                                </button>
                                            </div>
                                            {/* Total & Supprimer */}
                                            <p className="text-green-600 font-bold ml-4">
                                                {formatPrice(totalItemPrice)} DT
                                            </p>
                                            <button
                                                className="ml-4 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                                onClick={() => removeFromCart(item)}
                                            >
                                                <AiFillDelete />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Résumé */}
                            <div className="bg-white shadow-md p-6 rounded-lg">
                                <h3 className="text-xl font-semibold">Résumé de la commande</h3>
                                <div className="mt-4">
                                    <p className="text-lg">
                                        <strong>Prix total :</strong> {formatPrice(totalPrice)} DT
                                    </p>
                                    <p className="text-lg">
                                        <strong>Frais de timbre :</strong> {formatPrice(calculateStampFee())} DT
                                    </p>
                                    <div className="mt-2 border-t pt-2">
                                        <p className="text-lg font-bold">
                                            Total TTC : {formatPrice(totalWithStamp)} DT
                                        </p>
                                    </div>
                                </div>
                                <button
                                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                                    onClick={() => setShowSummary(false)}
                                >
                                    Commander
                                </button>
                            </div>
                        </>
                    ) : (
                        // Formulaire de commande
                        <div className="bg-white  p-3  ">
                           
                           <div className="bg-white flex justify-center   rounded-lg">
                               
                                <div className="mt-4">

                                <h3 className="text-xl font-semibold">Résumé de la commande</h3>
                                    <p className="text-lg">
                                        <strong>Prix total :</strong> {formatPrice(totalPrice)} DT
                                    </p>
                                    <p className="text-lg">
                                        <strong>Frais de timbre :</strong> {formatPrice(calculateStampFee())} DT
                                    </p>
                                    <div className="mt-2 border-t pt-2">
                                        <p className="text-lg font-bold">
                                            Total TTC : {formatPrice(totalWithStamp)} DT
                                        </p>
                                    </div>
                                </div>
                           
                            </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          Adresse de Livraison
                        </h3>
                        <form onSubmit={handleSubmitOrder} className="space-y-6">
                          {Object.keys(addressForm).map((field) => (
                            <div key={field} className="relative">
                              <label
                                htmlFor={field}
                                className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-500"
                              >
                                {field === 'additionalPhoneNumber'
                                  ? 'Autre numéro de téléphone'
                                  : field.replace(/([A-Z])/g, ' $1')}
                              </label>
                              <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-green-600">
                                <span className="text-gray-400">
                                  {field === 'email' ? (
                                    <i className="fas fa-envelope"></i>
                                  ) : field.includes('phone') ? (
                                    <i className="fas fa-phone"></i>
                                  ) : (
                                    <i className="fas fa-map-marker-alt"></i>
                                  )}
                                </span>
                                <input
                                  id={field}
                                  type={field === 'email' ? 'email' : 'text'}
                                  placeholder={
                                    field === 'additionalPhoneNumber'
                                      ? 'Autre numéro de téléphone'
                                      : field.replace(/([A-Z])/g, ' $1')
                                  }
                                  className="w-full p-2 bg-transparent focus:outline-none"
                                  value={addressForm[field]}
                                  onChange={(e) =>
                                    setAddressForm({ ...addressForm, [field]: e.target.value })
                                  }
                                  required={field !== 'additionalPhoneNumber'}
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold shadow-md transform transition-transform hover:scale-105 hover:bg-green-600"
                          >
                            Valider la commande
                          </button>
                        </form>
                      </div>
                      
                    )}
                </div>
            )}
        </div>
    );
};

export default CartPage;
