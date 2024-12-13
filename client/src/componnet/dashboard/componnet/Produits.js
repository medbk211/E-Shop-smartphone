import React, { useEffect, useState } from 'react';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from './productAPI';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Détermine si on modifie un produit
  const [currentProduct, setCurrentProduct] = useState(null); // Produit en cours d'édition
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    description: '',
    originalPrice: '',
    discountedPrice: '',
    promotion: false,
    image: null,
  });
  const [showModal, setShowModal] = useState(false); // Afficher ou masquer la modale
  const [toast, setToast] = useState({ message: '', type: '' }); // Gestion des notifications Toast

  const fetchProducts = async () => {
    const response = await getAllProducts();
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Gérer les champs du formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Gérer le téléchargement d'image
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      title: '',
      brand: '',
      description: '',
      originalPrice: '',
      discountedPrice: '',
      promotion: false,
      image: null,
    });
    setCurrentProduct(null);
    setIsEditing(false);
    setShowModal(false); // Fermer la modale
  };

  // Gérer l'envoi du formulaire pour ajouter ou modifier un produit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        form.append(key, formData[key]);
      }
    });

    try {
      if (isEditing && currentProduct) {
        await updateProduct(currentProduct._id, form); // Mise à jour du produit
        setToast({ message: 'Produit mis à jour avec succès !', type: 'success' });
      } else {
        await addProduct(form); // Ajout d'un nouveau produit
        setToast({ message: 'Produit ajouté avec succès !', type: 'success' });
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou la modification du produit:', error);
      setToast({ message: 'Une erreur est survenue.', type: 'error' });
    }
  };

  // Préparer le formulaire pour modifier un produit
  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      brand: product.brand,
      description: product.description,
      originalPrice: product.originalPrice,
      discountedPrice: product.discountedPrice || '',
      promotion: product.promotion || false,
      image: null, // L'image ne peut pas être préremplie
    });
    setCurrentProduct(product);
    setIsEditing(true);
    setShowModal(true); // Ouvrir la modale
  };

  // Gérer la suppression d'un produit
  const handleDelete = async (productId) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      try {
        await deleteProduct(productId);
        setToast({ message: 'Produit supprimé avec succès !', type: 'success' });
        fetchProducts();
      } catch (error) {
        console.error('Erreur lors de la suppression du produit :', error);
        setToast({ message: 'Impossible de supprimer le produit.', type: 'error' });
      }
    }
  };

  // Ouvrir la modale pour ajouter un produit
  const handleAddProduct = () => {
    resetForm(); // Réinitialiser le formulaire pour un nouvel ajout
    setShowModal(true); // Ouvrir la modale
  };

  // Fermer le toast après 3 secondes
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: '', type: '' }), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Gestion des produits</h2>

      {/* Toast Notification */}
      {toast.message && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg ${
            toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Bouton pour ajouter un produit */}
      <button
        onClick={handleAddProduct}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Ajouter un produit
      </button>

      {/* Liste des produits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <div key={product._id} className="p-4 bg-white shadow-md rounded relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold">{product.title}</h3>
            <p className="text-gray-600">{product.brand}</p>
            <p className="text-gray-800">{product.description}</p>
            <p className="text-lg font-bold">
              {product.discountedPrice ? (
                <>
                  <span className="line-through text-red-500 mr-2">{product.originalPrice}€</span>
                  {product.discountedPrice}€
                </>
              ) : (
                `${product.originalPrice}€`
              )}
            </p>
            <button
              onClick={() => handleEdit(product)}
              className="absolute top-2 right-92 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Modifier
            </button>
            <button
              onClick={() => handleDelete(product._id)}
              className="absolute top-2 right-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      {/* Modale */}
      {showModal && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
            showModal ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative">
            <h3 className="text-2xl font-bold mb-4">
              {isEditing ? 'Modifier un produit' : 'Ajouter un produit'}
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Titre"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="text"
                name="brand"
                placeholder="Marque"
                value={formData.brand}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
                required
              ></textarea>
              <input
                type="number"
                name="originalPrice"
                placeholder="Prix d'origine"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="number"
                name="discountedPrice"
                placeholder="Prix réduit (optionnel)"
                value={formData.discountedPrice}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
              />
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="promotion"
                  checked={formData.promotion}
                  onChange={handleChange}
                  className="mr-2"
                />
                En promotion ?
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 mb-4 border rounded"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  {isEditing ? 'Mettre à jour' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;