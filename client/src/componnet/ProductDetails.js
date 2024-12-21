import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import api from '../api/axiosConfig'

const ProductDetails = ({ handleAddToCart }) => {
  const { id } = useParams(); // Récupération de l'ID depuis l'URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger les détails du produit
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/product/${id}`);
        setProduct(response.data); // Assurez-vous que votre backend renvoie les données correctes
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des détails du produit :", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-12">Chargement des détails du produit...</div>;
  }

  if (!product) {
    return <div className="text-center mt-12 text-red-500">Produit introuvable.</div>;
  }

  return (
    <section className="mt-12 bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image du produit */}
          <div className="flex-1 relative">
            {product.promotion && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                Promotion
              </span>
            )}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Détails du produit */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
            <p className="text-sm text-gray-600 mt-4">{product.brand}</p>
            <p className="text-lg text-gray-900 mt-6">{product.description}</p>

            <div className="flex items-center justify-between mt-4">
              {product.originalPrice && (
                <span className="text-xs line-through text-gray-500">{product.originalPrice} TND</span>
              )}
              <span className="text-red-500 font-bold text-sm">{product.discountedPrice} TND</span>
            </div>

            {/* Bouton Ajouter au Panier */}
            <button
              onClick={() => handleAddToCart(product)} // Passer le produit comme paramètre
              className="mt-6 w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition"
            >
              Ajouter au panier
            </button>
          </div>
        </div>

        {/* Lien pour retourner à la liste des produits */}
        <Link to="/home">
          <button className="relative text-green-500 mt-4 hover:underline flex items-center">
            &larr; Continuer mes achats
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ProductDetails;
