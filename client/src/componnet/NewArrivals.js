import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

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
    <div className="relative min-h-screen bg-[#F5E9DA] pb-10 overflow-hidden mt-24">
      {/* Formes décoratives en arrière-plan */}
      <div className="absolute top-0 -left-20 w-80 h-80 bg-[#D2B48C] opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-[#8B9A46] opacity-20 rounded-full blur-3xl"></div>

      {/* Titre animé */}
      <motion.header
        className="text-center py-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.span
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8B9A46] to-[#F2A65A]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          🍂 Fruits Secs Bio 🍂
        </motion.span>
        <p className="text-[#8C5E3C] mt-2">
          Savourez la nature avec nos {sortedProducts.length} produits bio !
        </p>
      </motion.header>

      {/* Filtres */}
      <div className="container mx-auto px-4 flex justify-between items-center mb-6">
        <div className="text-[#8C5E3C] font-medium">
          Produits : {sortedProducts.length}
        </div>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow text-[#8B9A46]"
        >
          <option value="all">Toutes les catégories</option>
          <option value="nuts">Noix</option>
          <option value="dried-fruits">Fruits Séchés</option>
          <option value="mixes">Mélanges</option>
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
      className="relative bg-white rounded-lg shadow-md border border-[#D2B48C] overflow-hidden"
      whileHover={{ scale: 1.05 }}
    >
      {/* Image avec zoom et rotation */}
      <motion.img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
        whileHover={{ scale: 1.1, rotate: 2 }}
        transition={{ duration: 0.5 }}
      />
      {product.promotion && (
        <span className="absolute top-2 left-2 bg-[#F2A65A] text-white text-xs px-2 py-1 rounded">
          Promotion
        </span>
      )}
      <div className="p-4">
        <h2 className="text-lg font-bold text-[#8C5E3C]">{product.title}</h2>
        <p className="text-[#8B9A46] text-sm">{product.brand}</p>
        {product.originalPrice && (
          <p className="text-gray-400 line-through text-sm">
            {product.originalPrice} TND
          </p>
        )}
        <div className="flex justify-between items-center mt-3">
          <span className="text-[#8B9A46] text-lg font-bold">
            {product.discountedPrice} DT
          </span>
          <motion.button
            className="bg-gradient-to-r from-[#8B9A46] to-[#F2A65A] text-white px-3 py-1 rounded-full shadow-lg hover:scale-110 transition"
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
            aria-label={`Ajouter ${product.title} au panier`}
          >
            <FaShoppingCart />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductGrid;
