import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaRegStar, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCarousel = ({
  addToCart,
  isInCart,
  products,
  removeFromCart,
  addFavorise,
  isInFavoris,
  removeFromFavorise,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleProducts = products.slice(currentIndex, currentIndex + 3);

  const goLeft = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 3 : prev - 1));
  };

  const goRight = () => {
    setCurrentIndex((prev) => (prev + 3 >= products.length ? 0 : prev + 1));
  };

  const handleFavoriseClick = (product) => {
    if (isInFavoris(product.id)) {
      removeFromFavorise(product.id);
    } else {
      addFavorise(product);
    }
  };

  const handleCartClick = (product) => {
    if (isInCart(product.id)) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
  };

  if (products.length === 0) {
    return <div className="text-center p-4">Aucun produit disponible</div>;
  }

  return (
    <div className="bg-[#f7f5f2] py-8 relative">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-[#f2c94c] text-center mb-6">
          <span className="text-yellow-500">🌟</span> Nous recommandons pour vous
        </h2>
        <div className="relative">
          {/* Bouton gauche */}
          <motion.button
            onClick={goLeft}
            whileHover={{ scale: 1.2, rotate: -10 }}
            className="absolute top-1/2 transform -translate-y-1/2 left-4 z-10 p-3 bg-white rounded-full shadow-md hover:bg-yellow-200 transition"
          >
            <FaChevronLeft />
          </motion.button>

          {/* Grille de produits */}
          <div className="flex justify-center overflow-x-auto space-x-4 py-2">
            {visibleProducts.map((product) => (
              <motion.div
                key={product.id}
                className="flex-shrink-0 w-64 md:w-72 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition"
                whileHover={{ scale: 1.1, x: 5 }} 
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Lien vers le produit */}
                <Link to={`/product/${product.id}`} className="block">
                  {/* Image du produit */}
                  <div className="relative h-40 md:h-48">
                    {product.promotion && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Promotion
                      </span>
                    )}
                    <motion.img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full p-2 rounded-lg object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-700 truncate">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <div className="flex items-center justify-between mt-2">
                      {product.originalPrice && (
                        <span className="text-xs line-through text-gray-500">
                          {product.originalPrice} TND
                        </span>
                      )}
                      <p className="text-xs text-gray-600">AU KG</p>
                      <span className="text-red-500 font-bold">
                        {product.discountedPrice} TND
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Actions : Favoris et Panier */}
                <div className="flex justify-between p-4 border-t">
                  <motion.button
                    onClick={() => handleFavoriseClick(product)}
                    whileTap={{ scale: 0.8 }}
                    className="text-2xl"
                    whileHover={{ rotate: 15 }}
                  >
                    <FaRegStar
                      className={`transition-colors duration-300 ${
                        isInFavoris(product.id) ? "text-yellow-500" : "text-gray-400"
                      }`}
                    />
                  </motion.button>

                  <motion.button
                    onClick={() => handleCartClick(product)}
                    whileTap={{ scale: 0.8 }}
                    className="text-2xl"
                  >
                    <FaShoppingCart
                      className={`transition-colors duration-300 ${
                        isInCart(product.id) ? "text-yellow-500" : "text-gray-400"
                      }`}
                    />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bouton droit */}
          <motion.button
            onClick={goRight}
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10 p-3 bg-white rounded-full shadow-md hover:bg-yellow-200 transition"
          >
            <FaChevronRight />
          </motion.button>
        </div>

        {/* Barre de progression */}
        <div className="flex justify-center mt-4">
          {products.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 mx-1 rounded-full ${
                index >= currentIndex && index < currentIndex + 3
                  ? "bg-yellow-500"
                  : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
