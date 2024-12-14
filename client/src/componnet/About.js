import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="relative mt-20 bg-gradient-to-r from-yellow-100 to-yellow-300 py-16 overflow-hidden">
      {/* Formes décoratives */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-500 rounded-full opacity-20 animate-bounce"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Animation Image avec zoom au survol */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <motion.img
              src="/about.png" // Remplace par une image réelle
              alt="Découverte de notre passion"
              className="w-full h-80 object-cover rounded-2xl shadow-2xl border-4 border-yellow-400"
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>

          {/* Animation Texte */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-4xl font-extrabold text-yellow-800 drop-shadow-md">
              À propos de <motion.span
                whileHover={{ rotate: -2, scale: 1.2 }}
                className="text-orange-600"
              >
                nous
              </motion.span>
            </h2>
            <p className="text-lg text-gray-700 mt-6 leading-relaxed">
              Chez <span className="font-bold text-yellow-700">Fruits Secs Delices</span>, la passion guide chacun
              de nos choix. Depuis <span className="font-semibold text-orange-500">2010</span>, nous régalons
              nos clients avec une sélection rigoureuse de fruits secs 
              <span className="italic">100% naturels</span>, frais et savoureux.
            </p>
            <p className="text-lg text-gray-700 mt-4 leading-relaxed">
              Nous allions qualité, 
              <span className="text-yellow-600 font-medium">santé</span> et
              <span className="text-orange-500 font-medium">satisfaction client</span> pour créer une 
              expérience unique à chaque bouchée.
            </p>

            {/* Bouton d'appel à l'action */}
            <div className="mt-8">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-orange-500 hover:to-orange-700 transition-all duration-300 animate-pulse"
              >
                Découvrir nos produits
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
