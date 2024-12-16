import React from "react";
import Hero from "../componnet/hero";
import ProductCarousel from "../componnet/ProductCarousel";
import NewArrivals from "../componnet/NewArrivals";
import FeaturesSection from "../componnet/FeaturesSection";
import About from "../componnet/About";
import ContactForm from "../componnet/ContactForm";

import StatisticsCards from "../componnet/StatisticsCards";
// import FeaturesSection from "../componnet/FeaturesSection";

export default function Home({
  addToCart,
  products,
  removeFromCart,
  isInCart,
  addFavorise,
  isInFavoris,
  removeFromFavorise,
}) {
  return (
    <div>
      <Hero />
      <ProductCarousel
        addToCart={addToCart}
        isInCart={isInCart}
        products={products}
        removeFromCart={removeFromCart}
        addFavorise={addFavorise}
        removeFromFavorise={removeFromFavorise}
        isInFavoris={isInFavoris}
      />
      
      <About />
      <NewArrivals
       products={products}
       removeFromCart={removeFromCart}
       addToCart={addToCart}
      />
       <StatisticsCards/>
      <ContactForm/>
      <FeaturesSection />
    </div>
  );
}