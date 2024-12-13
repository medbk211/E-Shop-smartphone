import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Notification from './Notification';

function MaListePredefinie({ favoris: initialFavoris = [], removeFromFavorise, addToCart }) {
  const [favoris, setFavoris] = useState(initialFavoris); // Local state for favorites
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Toggle menu state
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Remove product from favorites
  const handleRemove = (productId) => {
    setFavoris(favoris.filter((item) => item.id !== productId));
    setNotification({
      show: true,
      message: `Produit "${productId.title}" supprimé avec succès !`,
      type: "info",
    });
    removeFromFavorise(productId);  // Call the parent function to update the main favoris state
  };

  // Add products to the cart
  const handleAddToCart = () => {
    favoris.forEach(product => {
      setNotification({
        show: true,
        message: `Produit "${product.title}" supprimé avec succès !`,
        type: "success",
      });
      addToCart(product); // Call parent function to add each product to the cart
    });
  };

  return (
    <div className="mt-1  py-8  mx-5 my-2">
      <h2 className="mt-10 text-2xl font-bold text-center">Ma liste prédéfinie</h2>
      <div className="mt-10 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-3xl px-4">
          <thead className="bg-gray-50 ">
            <tr>
              <th className="px-7 py-3 bg-yellow-400 text-left text-xs font-bold text-black uppercase tracking-wider">
                Nom
              </th>
              <th className="px-7 py-3 bg-yellow-400 text-right text-xs font-bold text-black uppercase tracking-wider">
                Produit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="border">
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={toggleMenu} className="text-blue-500 hover:underline">
                  Ma liste prédéfinie
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">{favoris.length}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Display products if the menu is open */}
      {isMenuOpen && favoris.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoris.map((product) => (
              <ProductCard
                key={product.id}
                product={product} // Pass the entire product
                handleRemove={handleRemove} // Pass the handleRemove function
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              className="bg-green-500 text-white py-2 px-6 rounded-md shadow hover:bg-green-600"
              onClick={handleAddToCart} // Add the functionality to add all products to the cart
            >
              Ajouter les produits au panier
            </button>

          </div>
        </div>
      )}

      {/* Display a message if no favorite products are found */}
      {isMenuOpen && favoris.length === 0 && (
        <div className="p-4 text-center mt-4">
          Aucun produit favori trouvé.
        </div>
      )}

      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: "", type: "info" })}
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

// ProductCard component that displays each product
const ProductCard = ({ product, handleRemove }) => {
  const { image, title, id } = product;

  return (
    <div className="relative border rounded-lg shadow-md p-4 flex flex-col items-center">
      <img src={image} alt={title} className="w-32 h-32 object-cover rounded-md mb-2" />
      <h3 className="text-center font-medium text-gray-700">{title}</h3>
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
        aria-label="Remove"
        onClick={() => handleRemove(id)} // Call handleRemove with the product ID
      >
        ✖
      </button>
    </div>
  );
};

export default MaListePredefinie;
