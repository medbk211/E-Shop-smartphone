import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Notification from "./Notification";

function MaListePredefinie({ favoris = [], removeFromFavorise, addToCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleRemove = (product) => {
    removeFromFavorise(product.id);
    setNotification({
      show: true,
      message: `Produit "${product.title}" supprimé avec succès !`,
      type: "info",
    });
  };

  const handleAddToCart = () => {
    favoris.forEach((product) => addToCart(product));
    setNotification({
      show: true,
      message: `Tous les produits favoris ont été ajoutés au panier !`,
      type: "success",
    });
  };

  return (
    <div className="mt-10 py-8 mx-10 my-2">
      {/* Titre principal */}
      <div className="text-center mb-8 mt-8">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          Ma Liste Prédéfinie
        </h1>
      </div>

      {/* Tableau des favoris */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="w-full bg-gradient-to-br from-gray-100 to-white rounded-lg shadow-md">
          <thead className="bg-gradient-to-r from-indigo-500 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase">Nom</th>
              <th className="px-6 py-3 text-right text-xs font-bold uppercase">Produits</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-200 transition-all duration-300">
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={toggleMenu}
                  className="text-blue-500 hover:text-indigo-600 underline transition duration-300"
                >
                  Voir mes produits favoris
                </button>
              </td>
              <td className="px-6 py-4 text-right font-semibold text-gray-700">
                {favoris.length}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section des produits favoris */}
      {isMenuOpen && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoris.length > 0 ? (
            favoris.map((product) => (
              <ProductCard key={product.id} product={product} handleRemove={handleRemove} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      )}

      {/* Bouton pour ajouter au panier */}
      {favoris.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 transform transition duration-300"
          >
            Ajouter tout au panier
          </button>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: "", type: "" })}
        />
      )}

      {/* Lien vers les achats */}
      <Link to="/home">
        <button className="mt-6 text-blue-600 hover:text-indigo-600 underline flex items-center">
          &larr; Continuer mes achats
        </button>
      </Link>
    </div>
  );
}

// Carte de produit
const ProductCard = ({ product, handleRemove }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105 duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover bg-gray-100"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <button
          onClick={() => handleRemove(product)}
          className="mt-2 text-red-500 hover:text-red-700 transition duration-300"
        >
          Retirer
        </button>
      </div>
    </div>
  );
};

// État vide
const EmptyState = () => (
  <div className="text-center mt-10">
    <img
      src="/empty-state.png"
      alt="Aucun produit favori"
      className="w-32 mx-auto opacity-80 hover:opacity-100 transition duration-300"
    />
    <p className="text-gray-500 mt-4">Aucun produit favori trouvé.</p>
  </div>
);

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  handleRemove: PropTypes.func.isRequired,
};

MaListePredefinie.propTypes = {
  favoris: PropTypes.array.isRequired,
  removeFromFavorise: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default MaListePredefinie;
