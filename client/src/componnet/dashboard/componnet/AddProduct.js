import React, { useState } from 'react';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    image: '',
    title: '',
    brand: '',
    description: '',
    category:'',
    originalPrice: '',
    discountedPrice: '',
    promotion: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process or send the data to backend here
    console.log('Product Data:', productData);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Ajouter un produit</h2>
      <form onSubmit={handleSubmit}>
        {/* Image */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={productData.image}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="URL de l'image"
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            id="title"
            name="title"
            value={productData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Nom du produit"
          />
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Marque</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Marque du produit"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Description du produit"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="category"
          />
        </div>

        {/* Original Price */}
        <div className="mb-4">
          <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">Prix Original</label>
          <input
            type="text"
            id="originalPrice"
            name="originalPrice"
            value={productData.originalPrice}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Prix original du produit"
          />
        </div>

        {/* Discounted Price */}
        <div className="mb-4">
          <label htmlFor="discountedPrice" className="block text-sm font-medium text-gray-700">Prix avec réduction</label>
          <input
            type="text"
            id="discountedPrice"
            name="discountedPrice"
            value={productData.discountedPrice}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Prix avec réduction"
          />
        </div>

        {/* Promotion */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="promotion"
            name="promotion"
            checked={productData.promotion}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="promotion" className="text-sm">Produit en promotion</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-2 rounded-md"
        >
          Ajouter le produit
        </button>
      </form>
    </div>
  );
};

// export default AddProduct;
