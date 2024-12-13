import React from 'react';
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <section className="relative bg-gray-100">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/fruit.png)',
        }}
        alt="Fruit background"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenu */}
      <div className="relative container mx-auto px-4 py-20 sm:py-32 lg:py-40 text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
          Bienvenue chez <span className="text-yellow-400">E-Shop</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto">
          Découvrez nos dernières collections de produits à prix imbattables.
          Profitez d'offres exclusives sur vos articles préférés !
        </p>
        <div className="mt-8 flex justify-center gap-4">
       
          <a
            href="/"
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition duration-300"
          >
            Commencez à Acheter
          </a>
       
         
          <a
            href="/about"
            className="px-6 py-3 bg-transparent border border-white font-semibold rounded-lg hover:bg-white hover:text-black transition duration-300"
          >
            En savoir plus
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
