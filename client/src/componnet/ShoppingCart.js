import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import Checkout from "../componnet/Checkout";

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
    const [showSummary, setShowSummary] = useState(false); // Afficher ou masquer le résumé
    const [showCheckout, setShowCheckout] = useState(false); // Afficher Checkout après "Commander"
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
        // Vous pouvez ajouter un appel API ou une logique pour valider la commande ici.
    };

    // Gérer l'affichage du résumé et Checkout
    const handleOrderClick = () => {
        setShowSummary(true); // Afficher le résumé après validation
        setShowCheckout(true); // Afficher le formulaire Checkout après "Commander"
    };

    return (
        <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Votre Panier</h2>
            {updatedCart.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">Votre panier est vide.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Liste des produits dans le panier */}
                    {!showSummary ? (
                        <div className="col-span-1 space-y-6">
                            {updatedCart.map((item) => {
                                const quantity = item.quantity;
                                const itemPrice = parseFloat(item.originalPrice);
                                const totalItemPrice = quantity * itemPrice;

                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        {/* Image */}
                                        <div className="ml-1 flex-1">
                                            <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                                            <p className="text-sm text-gray-500">{item.details}</p>
                                        </div>
                                        {/* Quantité */}
                                        <div className="flex items-center space-x-4">
                                            <button
                                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                                                onClick={() => updateQuantity(item.id, -1)}
                                            >
                                                <AiOutlineMinus size={20} />
                                            </button>
                                            <span className="px-3 font-semibold text-gray-700">{quantity}</span>
                                            <button
                                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                                                onClick={() => updateQuantity(item.id, 1)}
                                            >
                                                <AiOutlinePlus size={20} />
                                            </button>
                                        </div>
                                        {/* Total & Supprimer */}
                                        <p className="text-green-600 font-bold ml-4">
                                            {formatPrice(totalItemPrice)} DT
                                        </p>
                                        <button
                                            className="ml-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200"
                                            onClick={() => removeFromCart(item)}
                                        >
                                            <AiFillDelete size={20} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="col-span-1 bg-white shadow-lg p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Résumé de la commande</h3>
                            <div className="mt-4 space-y-2">
                                <p className="text-lg">
                                    <strong>Prix total :</strong> {formatPrice(totalPrice)} DT
                                </p>
                                <p className="text-lg">
                                    <strong>Frais de timbre :</strong> {formatPrice(calculateStampFee())} DT
                                </p>
                                <div className="mt-2 border-t pt-2">
                                    <p className="text-lg font-bold text-gray-800">
                                        Total TTC : {formatPrice(totalWithStamp)} DT
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Affichage du formulaire d'adresse et Checkout */}
                    {showCheckout && (
                        <div className="col-span-1 bg-white shadow-lg p-6 rounded-lg">
                            <Checkout
                                addressForm={addressForm}
                                setAddressForm={setAddressForm}
                                handleSubmitOrder={handleSubmitOrder}
                            />
                            <button
                                className="mt-4 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-all duration-200"
                                onClick={handleSubmitOrder}
                            >
                                Valider la commande
                            </button>
                        </div>
                    )}

                    {/* Bouton "Commander" */}
                    {!showSummary && !showCheckout && (
                        <button
                            className="mt-4 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-all duration-200"
                            onClick={handleOrderClick}
                        >
                            Commander
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default CartPage;
