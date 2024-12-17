import React, { useState, useEffect, useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import Checkout from "../componnet/Checkout";
import { Link } from "react-router-dom";

// Fonction pour formater les prix
function formatPrice(price) {
  if (!isNaN(price)) {
    return parseFloat(price).toLocaleString('fr-TN', {
      style: 'decimal',
      maximumFractionDigits: 3,
    });
  }
  return '0';
}

const CartPage = ({ cart, removeFromCart }) => {
  const [updatedCart, setUpdatedCart] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    setUpdatedCart(cart);
  }, [cart]);

  const calculateStampFee = useCallback(() => 7, []);

  const calculateTotalWithStamp = useCallback(() => {
    const total = updatedCart.reduce((sum, item) => {
      const itemPrice = parseFloat(item.originalPrice) || 0;
      const itemQuantity = item.quantity || 0;
      return sum + itemPrice * itemQuantity;
    }, 0);
    return total + calculateStampFee();
  }, [updatedCart, calculateStampFee]);

  const updateQuantity = (id, change) => {
    setUpdatedCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => updateQuantity(id, -1);
  const handleIncreaseQuantity = (id) => updateQuantity(id, 1);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    alert("Commande validée !");
  };

  const handleOrderClick = () => {
    setShowSummary(true);
    setShowCheckout(true);
  };

  const handleReturnToCart = () => {
    setShowCheckout(false);
  };

  const totalWithStamp = calculateTotalWithStamp();

  return (
    <div className="container mx-auto py-8 my-24">
      {!showCheckout && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section du panier */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">PANIER</h2>
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
                {updatedCart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <h3 className="font-semibold text-blue-800">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.details}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="p-2 bg-gray-200 rounded-full hover:bg-blue-200 transition duration-300" onClick={() => handleDecreaseQuantity(item.id)} aria-label="Diminuer la quantité">
                        <AiOutlineMinus size={20} />
                      </button>
                      <span className="text-lg font-semibold">{item.quantity}</span>
                      <button className="p-2 bg-gray-200 rounded-full hover:bg-blue-200 transition duration-300" onClick={() => handleIncreaseQuantity(item.id)} aria-label="Augmenter la quantité">
                        <AiOutlinePlus size={20} />
                      </button>
                      <button className="ml-4 text-red-500 hover:text-red-700" onClick={() => removeFromCart(item)} aria-label="Supprimer l'article">
                        <AiFillDelete size={20} />
                      </button>
                    </div>
                    <p className="text-lg font-semibold text-blue-900">{formatPrice(item.quantity * parseFloat(item.originalPrice))} TND</p>
                  </div>
                ))}
              </div>
            )}
            <Link to="/home">
              <button className="relative text-green-500 mt-4 hover:underline flex items-center">
                &larr; Continuer mes achats
              </button>
            </Link>
          </div>

          {/* Section du résumé */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Résumé</h3>
            <div className="space-y-4">
              <p className="text-gray-600">{cart.length} article(s)</p>
              <p className="text-gray-600">Livraison : {formatPrice(7000)} TND</p>
              <p className="text-lg font-semibold text-blue-900">Total TTC : {formatPrice(totalWithStamp)} TND</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mt-6">
              <p className="text-sm text-gray-600">Dépensez <span className="font-bold text-blue-900">{formatPrice(145000)} TND</span> pour obtenir une livraison gratuite !</p>
            </div>
            <div className="mt-6">
              <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700" onClick={handleOrderClick} aria-label="Commander">
                Commander
              </button>
            </div>
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="mt-6">
            <button
            onClick={handleReturnToCart}
            className="mt-1 text-blue-500 hover:underline"
          >
            Retour au panier
          </button>
          <Checkout 
            handleSubmitOrder={handleSubmitOrder} 
            calculateTotalWithStamp={calculateTotalWithStamp} 
            cart={cart} 
          
          />
        
        </div>
      )}
    </div>
  );
};

export default CartPage;
