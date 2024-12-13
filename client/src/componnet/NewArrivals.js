import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import Notification from "./Notification";

function formatPrice(price) {
  if (typeof price === "number") {
    price = price.toString();
  }
  if (typeof price === "string") {
    return parseFloat(price.replace(',', '.')).toLocaleString('fr-TN', {
      style: 'decimal',
      maximumFractionDigits: 3
    });
  }
  return '0';
}

// Composant principal pour afficher la grille de produits
const ProductGrid = ({ products, removeFromCart, addToCart }) => {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Effect hook to update sorted products whenever the original products list changes
  useEffect(() => {
    let filteredProducts = [...products];
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
    setSortedProducts(filteredProducts);
  }, [products, selectedCategory]);

  const handleSort = (e) => {
    const sortOrder = e.target.value;
    const sorted = [...sortedProducts]; // Create a copy to avoid mutating state directly
    
    // Sort based on discounted price, using numeric comparison
    if (sortOrder === "asc") {
      sorted.sort((a, b) => {
        const priceA = parseFloat(a.discountedPrice.replace(',', '.'));
        const priceB = parseFloat(b.discountedPrice.replace(',', '.'));
        return priceA - priceB;
      });
    } else if (sortOrder === "desc") {
      sorted.sort((a, b) => {
        const priceA = parseFloat(a.discountedPrice.replace(',', '.'));
        const priceB = parseFloat(b.discountedPrice.replace(',', '.'));
        return priceB - priceA;
      });
    }
    setSortedProducts(sorted); // Update the sorted products state
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 mb-5 pb-10 ">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 text-center border-y-2 border-green-600">
          <h1 className="text-3xl font-bold text-green-600 ">NewArrivals</h1>
          <p className="text-sm text-gray-500">Découvrez nos {sortedProducts.length} produits</p>
        </div>
      </header>
      <div className="container mx-auto px-4 py-4">
        <img
          src="/img.png"
          alt="Boissons"
          className="w-full rounded-lg lg:h-40 lg:w-65 "
        />
      </div>

      <div className="container mx-auto px-1 py-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Il y a {sortedProducts.length} produits.</div>
        <div className="flex space-x-2">
          <div>
            <label htmlFor="category" className="text-sm text-gray-600 mr-2">
              Catégorie :
            </label>
            <select
              id="category"
              className="border rounded-lg text-sm p-1"
              onChange={handleCategoryChange}
            >
              <option value="all">catégories</option>
              <option value="electronics">Électronique</option>
              <option value="clothing">Vêtements</option>
              <option value="accessories">Accessoires</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="text-sm text-gray-600 mr-2">
              Trier par :
            </label>
            <select
              id="sort"
              className="border rounded-lg text-sm p-1"
              onChange={handleSort}
            >
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart} // Pass addToCart here
            removeFromCart={removeFromCart} // Pass removeFromCart here
          />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product, addToCart }) => {
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const handleAddToCart = () => {
    addToCart(product); // Call addToCart when button is clicked
    setNotification({
      show: true,
      message: `${product.title} a été ajouté au panier !`,
      type: "success",
    });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" }); // Hide notification after 3 seconds
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-green-600   ">
      {product.promotion && (
        <span className=" top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded relative">
          Promotion
        </span>
      )}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
        <p className="text-sm text-gray-600">{product.brand}</p>
        <p className="text-sm text-gray-600">kg</p>
        {product.originalPrice && (
         
          <span className="text-xs line-through text-gray-500">
            {product.originalPrice} TND
          </span>
          
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-green-600 font-bold">{product.discountedPrice} DT</span>
          <div className="flex">
            <button
              className="bg-green-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-green-600 mr-2"
              onClick={handleAddToCart}
            >
              <FaShoppingCart />
            </button>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
