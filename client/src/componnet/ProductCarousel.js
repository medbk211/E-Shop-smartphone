import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaRegStar, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";


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
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
          Nous recommandons pour vous
        </h2>
        <div className="relative">
          <button
            onClick={goLeft}
            className="absolute top-1/2 transform -translate-y-1/2 left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition"
          >
            <FaChevronLeft />
          </button>

          <div className="flex justify-center overflow-x-auto space-x-3 scrollbar-none max-h-96  py-2">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-64 md:w-72 h-auto bg-white border rounded-lg shadow hover:shadow-lg max-w-xs border border-yellow-500"
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
                      className="w-full h-full p-3 rounded-2xl"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-700 truncate">{product.title}</h3>
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <p className="text-xs text-gray-400 truncate">{product.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      {product.originalPrice && (
                        <span className="text-xs line-through text-gray-500">
                          {product.originalPrice} TND
                        </span>
                      )}
                      <p  className="text-sm font-semibold text-gray-700 truncate">AU KG</p>
                      <span className="text-red-500 font-bold text-sm">{product.discountedPrice} TND</span>
                      

                    </div>
                  </div>
                </Link>
                <div className="flex justify-between p-4 border-t">
                  <button
                    onClick={() => handleFavoriseClick(product)}
                    className="flex items-center space-x-2"
                  >
                    <FaRegStar
                      className={`text-2xl ${isInFavoris(product.id) ? "text-yellow-500" : "text-gray-400"
                        } transition-colors duration-300`}
                    />
                  </button>

                  <button
                    onClick={() => handleCartClick(product)}
                    className="flex items-center space-x-2"
                  >
                    <FaShoppingCart
                      className={`text-2xl ${isInCart(product.id) ? "text-yellow-500" : "text-gray-400"
                        } transition-colors duration-300`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={goRight}
            className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition"
          >
            <FaChevronRight />
          </button>

       
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
