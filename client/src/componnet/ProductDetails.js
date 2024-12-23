import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const ProductDetails = ({ products, addToCart, isInCart }) => {
  const { id } = useParams(); // Récupère l'ID du produit dans l'URL
  const [product, setProduct] = useState(null); // État pour stocker le produit
  const [loading, setLoading] = useState(true); // État pour suivre l'état de chargement
  const [error, setError] = useState(null); // État pour les erreurs

  useEffect(() => {
    setLoading(true);
    const foundProduct = products.find((p) => p.id === id); // Cherche le produit par ID

    if (foundProduct) {
      setProduct(foundProduct);
      setError(null);
    } else {
      setError("Produit non trouvé");
    }

    setLoading(false);
  }, [id, products]); // Recharger les données quand l'ID ou les produits changent

  // Si le produit n'est pas encore chargé, afficher un message de chargement
  if (loading) return <div>Chargement...</div>;

  // Si une erreur est survenue, afficher l'erreur
  if (error) return <div>{error}</div>;

  // Si le produit n'est pas trouvé, afficher un message d'erreur
  if (!product) return <div>Produit non disponible.</div>;

  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const imageVariants = {
    hover: { scale: 1.05, transition: { duration: 0.5 } },
  };

  const tabVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <motion.div
      className="bg-gray-50 min-h-screen p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto my-28 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section Image */}
        <motion.div className="space-y-4" whileHover="hover" variants={imageVariants}>
          <img
            src={product.image}
            alt={product.title}
            className="rounded-lg shadow-lg w-full"
          />
        </motion.div>

        {/* Section Description */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 transition-transform hover:scale-105">
            {product.title}
          </h1>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < product.rating ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
            <span className="ml-2 text-gray-600">({product.ratingCount} avis)</span>
          </div>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
          <p className="mt-4">
            <span className="text-red-500 font-bold text-lg">
              {product.discountedPrice} TND
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through ml-2 text-sm">
                {product.originalPrice} TND
              </span>
            )}
          </p>

          {/* Actions */}
          <div className="mt-6">
            <motion.button
              onClick={() => addToCart(product)}
              className={`px-6 py-3 text-white rounded-lg shadow-lg transition-all w-full md:w-auto ${
                isInCart(product.id)
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
              disabled={isInCart(product.id)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {isInCart(product.id) ? "Dans le panier" : "Ajouter au panier"}
            </motion.button>
          </div>

          {/* Poids (si applicable) */}
          {product.weights && (
            <div className="mt-6">
              <h2 className="font-semibold text-gray-700">Poids</h2>
              <div className="flex flex-wrap gap-4 mt-2">
                {product.weights.map((weight, index) => (
                  <motion.button
                    key={index}
                    className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-orange-50"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {weight}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section Tabs */}
      <motion.div
        className="mt-12 bg-white p-4 rounded-lg shadow"
        initial="initial"
        animate="animate"
        variants={tabVariants}
      >
        <div className="flex space-x-6 border-b pb-2">
          <motion.button
            className="font-semibold text-gray-700 border-b-2 border-orange-500 pb-1"
            whileHover={{ scale: 1.1 }}
          >
            Détails
          </motion.button>
          <motion.button
            className="font-semibold text-gray-700 hover:border-orange-500"
            whileHover={{ scale: 1.1 }}
          >
            Plus d'infos
          </motion.button>
        </div>
        <div className="mt-4 text-gray-600">
          <p>
            <strong>Utilisation :</strong> {product.usage || "Information non disponible"}
          </p>
          <p className="mt-2">
            <strong>Stockage :</strong> {product.storage || "Information non disponible"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
