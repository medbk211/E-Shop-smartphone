import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaRegStar, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import Spinner from "./Spinner";

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
  // const [loading, setLoading] = useState(true);

  // Charger l’état initial avec un spinner
  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 500);
  //   return () => clearTimeout(timer);
  // }, []);

  const visibleProducts = products.slice(currentIndex, currentIndex + 3);

  // Gestion cyclique des index
  const changeIndex = (direction) => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = products.length - 1;
      if (direction === "left") {
        return (prevIndex - 1 + products.length) % products.length;
      } else {
        return (prevIndex + 1) % products.length;
      }
    });
  };

  const toggleFavorite = (product) => {
    if (isInFavoris(product.id)) {
      removeFromFavorise(product.id);
    } else {
      addFavorise(product);
    }
  };

  const toggleCart = (product) => {
    if (isInCart(product.id)) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
  };

  if (products.length === 0) {
    return <div className="text-center p-4">Aucun produit disponible</div>;
  }

  // if (loading) {
  //   return (
  //     <div className="fixed inset-0 flex justify-center items-center bg-transparent z-50">
  //       <div className="absolute inset-0 bg-gray-800 bg-opacity-40"></div>
  //       <Spinner />
  //     </div>
  //   );
  // }

  return (
    <div className="bg-[#f0f0f0] py-8 relative">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-[#007BFF] text-center mb-6">
          <span className="text-yellow-500">📱</span> Nos accessoires recommandés
        </h2>

        <div className="relative">
          {/* Bouton gauche */}
          <motion.button
            onClick={() => changeIndex("left")}
            whileHover={{ scale: 1.2, rotate: -10 }}
            className="absolute top-1/2 transform -translate-y-1/2 left-4 z-10 p-3 bg-white rounded-full shadow-md hover:bg-blue-200 transition"
          >
            <FaChevronLeft />
          </motion.button>

          {/* Grille de produits */}
          <div className="flex justify-center overflow-x-auto space-x-4 py-2">
            {visibleProducts.map((product) => (
              <motion.div
                key={product.id}
                className="flex-shrink-0 w-64 md:w-72 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition"
                whileHover={{ scale: 1.05 }}
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative h-40 md:h-48">
                    {product.promotion && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Promotion
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full p-2 rounded-lg object-cover"
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
                      <span className="text-red-500 font-bold">
                        {product.discountedPrice} TND
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Actions */}
                <div className="flex justify-between p-4 border-t">
                  <button onClick={() => toggleFavorite(product)}>
                    <FaRegStar
                      className={`text-2xl transition-colors duration-300 ${isInFavoris(product.id) ? "text-yellow-500" : "text-gray-400"}`}
                    />
                  </button>
                  <button onClick={() => toggleCart(product)}>
                    <FaShoppingCart
                      className={`text-2xl transition-colors duration-300 ${isInCart(product.id) ? "text-yellow-500" : "text-gray-400"}`}
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bouton droit */}
          <motion.button
            onClick={() => changeIndex("right")}
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10 p-3 bg-white rounded-full shadow-md hover:bg-blue-200 transition"
          >
            <FaChevronRight />
          </motion.button>
        </div>

        {/* Barre de progression */}
        <div className="flex justify-center mt-4">
          {products.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 mx-1 rounded-full ${index >= currentIndex && index < currentIndex + 3
                  ? "bg-blue-500"
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
