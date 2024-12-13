import React, { useState, useEffect } from 'react';

const Hero = () => {
  const images = [
    '/fruit.png',
    '/hero1.png',
    '/hero3.png',
    '/hero2.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  // Fonction pour changer d'image avec un effet de glissement
  const changeImage = (direction) => {
    if (isSliding) return; // Empêche un changement si une animation est en cours
    setIsSliding(true);

    setTimeout(() => {
      if (direction === 'next') {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      } else {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      }
      setIsSliding(false);
    }, 500); // Durée de l'animation
  };

  // Changement automatique d'image toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      changeImage('next');
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden bg-gray-100">
      {/* Conteneur des images pour l'effet de glissement */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-[500px] sm:h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenu */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
          Bienvenue chez <span className="text-yellow-400">E-Shop</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl max-w-3xl">
          Découvrez nos dernières collections de fruits secs premium.
          Profitez d'offres exclusives dès aujourd'hui !
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

      {/* Points de navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentImageIndex
                ? 'bg-yellow-400'
                : 'bg-gray-400'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          ></button>
        ))}
      </div>

      {/* Boutons de navigation */}
      <button
        onClick={() => changeImage('prev')}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition duration-300"
      >
        &#8592; {/* Flèche gauche */}
      </button>
      <button
        onClick={() => changeImage('next')}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition duration-300"
      >
        &#8594; {/* Flèche droite */}
      </button>
    </section>
  );
};

export default Hero;
