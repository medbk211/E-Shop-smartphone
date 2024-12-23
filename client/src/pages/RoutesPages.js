import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../componnet/navbar";
import Footer from "../componnet/Footer";
import Home from "./home";
import CartPage from "./panier";
import FavoritesPage from "./MaListePredefiniePage";
import ProductPage from "./ProductPage";
import Login from "./login";
import SignUp from "../componnet/compSignup";
import About from "./About";
import Contact from "./contact";
import Dashboard from "../componnet/dashboard/dashboard"; // Importez la page Dashboard
import { getAllProducts } from "../componnet/dashboard/componnet/productAPI";
import ProductDetails from "../componnet/ProductDetails";

function RoutesPages() {
  const [cart, setCart] = useState([]);
  const [favoris, setFavoris] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);

  // Récupération des produits
  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      const normalizedProducts = response.data.map((product) => ({
        ...product,
        id: product._id, // Normalisation des IDs
      }));
      setProducts(normalizedProducts);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Vérification du rôle de l'utilisateur
  useEffect(() => {
    const userRole = localStorage.getItem("username"); // "admin" ou "user"
    if (userRole === "admin") setIsAdmin(true);
  }, []);

  // Gestion du panier
  const addToCart = useCallback(
    (product) => {
      if (!cart.some((item) => item.id === product.id)) {
        setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
      }
    },
    [cart]
  );

  const removeFromCart = useCallback(
    (product) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    },
    [cart]
  );

  const updateCartQuantity = useCallback(
    (productId, action) => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: action === "increase" ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
              }
            : item
        )
      );
    },
    []
  );

  const isInCart = (productId) => cart.some((item) => item.id === productId);

  // Gestion des favoris
  const addFavorise = useCallback(
    (product) => {
      if (!favoris.some((item) => item.id === product.id)) {
        setFavoris((prevFavoris) => [...prevFavoris, product]);
      }
    },
    [favoris]
  );

  const removeFromFavorise = useCallback(
    (productId) => {
      setFavoris((prevFavoris) => prevFavoris.filter((item) => item.id !== productId));
    },
    [favoris]
  );

  const isInFavoris = (productId) => favoris.some((item) => item.id === productId);

  return (
    <Router>
      {isAdmin ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      ) : (
        <>
          <Navbar favoriteCount={favoris.length} cartCount={cart.length} />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route
                path="/home"
                element={
                  <Home
                    addToCart={addToCart}
                    products={products}
                    removeFromCart={removeFromCart}
                    isInCart={isInCart}
                    addFavorise={addFavorise}
                    isInFavoris={isInFavoris}
                    removeFromFavorise={removeFromFavorise}
                  />
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProductDetails
                    addToCart={addToCart}
                    isInCart={isInCart}
                    products={products}
                  />
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/cart"
                element={
                  <CartPage
                    cart={cart}
                    updateCartQuantity={updateCartQuantity}
                    removeFromCart={removeFromCart}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <FavoritesPage
                    favoris={favoris}
                    removeFromFavorise={removeFromFavorise}
                    addToCart={addToCart}
                  />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default RoutesPages;
