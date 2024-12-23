import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, addToCart }) => {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    let filteredProducts = [...products];
    if (selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === selectedCategory
      );
    }
    setSortedProducts(filteredProducts);
  }, [products, selectedCategory]);

  return (
    <div className="relative min-h-screen bg-gray-100 pb-10 overflow-hidden mt-24">
      {/* Formes décoratives en arrière-plan */}
      <div className="absolute top-0 -left-20 w-80 h-80 bg-gray-300 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-500 opacity-15 rounded-full blur-3xl"></div>

      {/* Titre animé */}
      <motion.header
        className="text-center py-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.span
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          🎧 Accessoires GSM 🎧
        </motion.span>
        <p className="text-gray-600 mt-2">
          Découvrez nos {sortedProducts.length} accessoires mobiles de qualité !
        </p>
      </motion.header>

      {/* Filtres */}
      <div className="container mx-auto px-4 flex justify-between items-center mb-6">
        <div className="text-gray-600 font-medium">
          Produits : {sortedProducts.length}
        </div>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow text-gray-600"
        >
          <option value="all">Toutes les catégories</option>
          <option value="cases">Coques</option>
          <option value="chargers">Chargeurs</option>
          <option value="earphones">Écouteurs</option>
        </select>
      </div>

      {/* Grille de produits */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product, addToCart }) => {
  return (
    <motion.div
      className="relative bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden"
      whileHover={{ scale: 1.05 }}
    >
      {/* Image avec zoom et rotation */}
      <Link to={`/product/${product.id}`} className="block">
      <motion.img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ duration: 0.5 }}
      />
      {product.promotion && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          Promo
        </span>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
        <p className="text-gray-500 text-sm">{product.brand}</p>
        {product.originalPrice && (
          <p className="text-gray-400 line-through text-sm">
            {product.originalPrice} TND
          </p>
        )}
        <div className="flex justify-between items-center mt-3">
          <span className="text-gray-800 text-lg font-bold">
            {product.discountedPrice} TND
          </span>
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full shadow-lg hover:scale-110 transition"
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
            aria-label={`Ajouter ${product.title} au panier`}
          >
            <FaShoppingCart />
          </motion.button>
        </div>
      </div>
      </Link>
    </motion.div>
  );
};

export default ProductGrid;
