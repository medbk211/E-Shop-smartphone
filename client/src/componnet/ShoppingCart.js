import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import Checkout from "../componnet/Checkout";

// Function to format prices
function formatPrice(price) {
    if (!isNaN(price)) {
        return parseFloat(price).toLocaleString('fr-TN', {
            style: 'decimal',
            maximumFractionDigits: 3,
        });
    }
    return '0';
}

const CartPage = ({ cart, removeFromCart, updateCartQuantity }) => {
    const [updatedCart, setUpdatedCart] = useState(cart);
    const [showSummary, setShowSummary] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
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

    useEffect(() => {
        setUpdatedCart(cart);
    }, [cart]);

    const calculateTotalWithStamp = () => {
        const total = updatedCart.reduce((sum, item) => {
            const itemPrice = parseFloat(item.originalPrice);
            return sum + itemPrice * (item.quantity || 0);
        }, 0);
        return total + calculateStampFee();
    };

    const calculateStampFee = () => 7.5;

    const updateQuantity = (id, change) => {
        setUpdatedCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
        updateCartQuantity(id, change);
    };

    const totalPrice = updatedCart.reduce((total, item) => {
        const itemPrice = parseFloat(item.originalPrice);
        return total + itemPrice * (item.quantity || 0);
    }, 0);

    const totalWithStamp = calculateTotalWithStamp();

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        alert("Commande validée !");
    };

    const handleOrderClick = () => {
        setShowSummary(true);
        setShowCheckout(true);
    };

    return (
        <div className="container mx-auto py-8 my-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Product List */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">PANIER</h2>
                    {updatedCart.length === 0 ? (
                        <motion.p
                            className="text-center text-gray-500 text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Votre panier est vide.
                        </motion.p>
                    ) : (
                        <div className="space-y-6">
                            {updatedCart.map((item) => {
                                const quantity = item.quantity;
                                const itemPrice = parseFloat(item.originalPrice);
                                const totalItemPrice = quantity * itemPrice;

                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between border-b pb-4"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                                <p className="text-gray-500 text-sm">{item.details}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <button
                                                className="p-2 bg-gray-200 rounded-full"
                                                onClick={() => updateQuantity(item.id, -1)}
                                            >
                                                <AiOutlineMinus size={20} />
                                            </button>
                                            <span className="text-lg font-semibold">{quantity}</span>
                                            <button
                                                className="p-2 bg-gray-200 rounded-full"
                                                onClick={() => updateQuantity(item.id, 1)}
                                            >
                                                <AiOutlinePlus size={20} />
                                            </button>
                                            <button
                                                className="ml-4 text-red-500"
                                                onClick={() => removeFromCart(item)}
                                            >
                                                <AiFillDelete size={20} />
                                            </button>
                                        </div>
                                        <p className="text-lg font-semibold text-gray-800">{formatPrice(totalItemPrice)} TND</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <button
                        className="mt-6 text-blue-600"
                        onClick={() => window.location.href = "/"}
                    >
                        Continue l'achats
                    </button>
                </div>

                {/* Right Column - Summary and Checkout */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Résumé</h3>
                    <div className="space-y-4">
                        <p className="text-gray-600">1 article</p>
                        <p className="text-gray-600">Livraison : {formatPrice(7000)} TND</p>
                        <p className="text-lg font-semibold text-gray-800">
                            Total TTC : {formatPrice(totalWithStamp)} TND
                        </p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-6">
                        <p className="text-sm text-gray-600">
                            Dépensez <span className="font-bold">{formatPrice(145100)} TND</span> Pour obtenir un
                            livraison gratuite !
                        </p>
                    </div>
                    <div className="mt-6">
                        {!showSummary && !showCheckout && (
                            <button
                                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
                                onClick={handleOrderClick}
                            >
                                Commander
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Checkout Form */}
            {showCheckout && (
                <div className="mt-6">
                    <Checkout
                        addressForm={addressForm}
                        setAddressForm={setAddressForm}
                        handleSubmitOrder={handleSubmitOrder}
                    />
                </div>
            )}
        </div>
    );
};

export default CartPage;
