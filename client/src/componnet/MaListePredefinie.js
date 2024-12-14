import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Notification from "./Notification";

function MaListePredefinie({ favoris = [], removeFromFavorise, addToCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Toggle menu visibility
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Remove a product from favorites
  const handleRemove = (product) => {
    removeFromFavorise(product.id);
    setNotification({
      show: true,
      message: `Produit "${product.title}" supprimé avec succès !`,
      type: "info",
    });
  };

  // Add all favorite products to the cart
  const handleAddToCart = () => {
    favoris.forEach((product) => addToCart(product));
    setNotification({
      show: true,
      message: `Tous les produits favoris ont été ajoutés au panier !`,
      type: "success",
    });
  };

  return (
    <div className="mt-1 py-8 mx-5 my-2">
      <h2 className="mt-10 text-3xl font-extrabold text-center text-gradient bg-gradient-to-r from-yellow-500 to-red-500 animate-pulse">
        Ma liste prédéfinie
      </h2>

      {/* Favorite List Summary */}
      <div className="mt-10 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-3xl px-4">
          <thead className="bg-gradient-to-r from-yellow-400 to-orange-500">
            <tr>
              <th className="px-7 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Nom
              </th>
              <th className="px-7 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">
                Produits
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="border hover:bg-gray-100 transition duration-300">
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={toggleMenu}
                  className="text-blue-500 hover:text-blue-600 underline transition duration-300"
                >
                  Ma liste prédéfinie
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">{favoris.length}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Favorite Products */}
      {isMenuOpen && (
        <div className="container mx-auto px-4 py-8">
          {favoris.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoris.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleRemove={handleRemove}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center mt-4">
              <img
                src="/empty-state.png"
                alt="Aucun produit favori"
                className="mx-auto w-40 opacity-80 hover:opacity-100 transition duration-300"
              />
              <p className="text-gray-500">Aucun produit favori trouvé.</p>
            </div>
          )}
          <div className="mt-8 flex justify-center">
            <button
              className="bg-green-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-green-600 hover:scale-105 transform transition duration-300"
              onClick={handleAddToCart}
              disabled={favoris.length === 0}
            >
              Ajouter les produits au panier
            </button>
          </div>
        </div>
      )}

      {/* Notification Component */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: "", type: "" })}
        />
      )}

      <Link to="/home">
        <button className="relative text-green-500 mt-4 hover:underline flex items-center">
          &larr; Continuer mes achats
        </button>
      </Link>
    </div>
  );
}

// Product Card
const ProductCard = ({ product, handleRemove }) => {
  const { image, title } = product;

  return (
    <div className="relative border rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transform hover:scale-105 transition duration-300">
      <img
        src={image}
        alt={title}
        className="w-32 h-32 object-cover rounded-md mb-2 hover:opacity-90"
      />
      <h3 className="text-center font-medium text-gray-700">{title}</h3>
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition duration-300"
        aria-label={`Retirer ${title} des favoris`}
        onClick={() => handleRemove(product)}
      >
        ✖
      </button>
    </div>
  );
};

// Prop Types
MaListePredefinie.propTypes = {
  favoris: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  removeFromFavorise: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default MaListePredefinie;
