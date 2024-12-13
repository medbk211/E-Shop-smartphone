import React from 'react';

const About = () => {
  return (
    <section className="mt-20 bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image de l'entreprise ou du produit */}
          <div className="flex-1">
            <img
              src="/about.png" // Remplace par une image réelle
              alt="Aperçu de notre entreprise"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Informations sur l'entreprise */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-800">À propos de nous</h2>
            <p className="text-lg text-gray-600 mt-4">
              Nous sommes une entreprise passionnée par la qualité des produits que nous proposons. Depuis [année de création], nous offrons une large gamme de fruits secs, soigneusement sélectionnés pour garantir une fraîcheur et un goût exceptionnels. Notre objectif est de vous fournir des produits naturels, délicieux et sains, tout en offrant un service client exceptionnel.
            </p>
            <p className="text-lg text-gray-600 mt-4">
              Notre équipe est composée de professionnels qui veillent à ce que chaque produit réponde aux plus hauts standards de qualité. Nous croyons en la transparence et en la satisfaction client.
            </p>
            
            {/* Bouton d'appel à l'action */}
            <div className="mt-6">
              <button className="bg-green-500 text-white font-semibold py-2 px-6 rounded hover:bg-green-600 transition">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
