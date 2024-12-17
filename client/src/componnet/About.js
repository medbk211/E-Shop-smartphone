import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="relative mt-20 bg-gradient-to-r from-blue-100 to-blue-300 py-16 overflow-hidden">
      {/* Formes décoratives */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gray-500 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-600 rounded-full opacity-20 animate-bounce"></div>

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
              alt="Accessoires GSM de qualité"
              className="w-full h-80 object-cover rounded-2xl shadow-2xl border-4 border-blue-400"
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
            <h2 className="text-4xl font-extrabold text-blue-800 drop-shadow-md">
              À propos de <motion.span
                whileHover={{ rotate: -2, scale: 1.2 }}
                className="text-blue-600"
              >
                nous
              </motion.span>
            </h2>
            <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg mt-6">
              <p className="text-lg text-gray-700 mt-6 leading-relaxed">
                Chez <span className="font-bold text-blue-700">GSM Accessories</span>, nous nous engageons à offrir à
                nos clients les accessoires les plus innovants et de qualité supérieure pour leurs appareils mobiles.
                Depuis <span className="font-semibold text-blue-500">2015</span>, nous vous proposons des produits qui
                combinent performance et design, toujours à la pointe de la technologie.
              </p>
              <p className="text-lg text-gray-700 mt-4 leading-relaxed">
                Que vous cherchiez une coque, un chargeur rapide ou un support de voiture, nous avons ce qu'il vous faut.
                Nous mettons un point d'honneur à vous offrir une expérience client irréprochable.
              </p>
            </div>

            {/* Bouton d'appel à l'action */}
            <div className="mt-8">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 2, backgroundColor: '#2563eb' }}
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 animate-pulse"
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
