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
import ProductDetails from '../componnet/ProductDetails'




function RoutesPages() {
  const [cart, setCart] = useState([]);
  const [favoris, setFavoris] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      // Normalisation des produits pour utiliser "id" au lieu de "_id"
      const normalizedProducts = response.data.map((product) => ({
        ...product,
        id: product._id, // Convertir _id en id pour uniformiser
      }));
      setProducts(normalizedProducts);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const userRole = localStorage.getItem("username"); // Ex: "admin" ou "user"
    if (userRole === "admin") setIsAdmin(true);
  }, []);

  const updateCartLength = (length) => {
    console.log(`Cart length updated to: ${length}`);
  };

  const addToCart = useCallback(
    (product) => {
      if (!cart.some((item) => item.id === product.id)) {
        setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
      }
    },
    [cart]
  );

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
      updateCartLength(favoris.length - 1);
    },
    [favoris]
  );

  const removeFromCart = useCallback(
    (product) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
      updateCartLength(cart.length - 1);
    },
    [cart]
  );

  const updateCartQuantity = useCallback(
    (productId, action) => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: action === "increase" ? item.quantity + 1 : Math.max(item.quantity - 1, 1) }
            : item
        )
      );
    },
    []
  );

  const isInCart = (productId) => cart.some((item) => item.id === productId);
  const isInFavoris = (productId) => favoris.some((item) => item.id === productId);

  return (
    <Router>
      {isAdmin ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      ) : (
        <>
        
          <Navbar favoriteCount={favoris.length} cartCount={cart.length} />
         
          <main className="min-h-screen">
         
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
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
              <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
              
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/cart"
                element={<CartPage cart={cart} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} />}
              />
              <Route path="/product/:id" element={<ProductDetails />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/favorites"
                element={
                  <FavoritesPage favoris={favoris} removeFromFavorise={removeFromFavorise} addToCart={addToCart} />
                }
              />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default RoutesPages;
