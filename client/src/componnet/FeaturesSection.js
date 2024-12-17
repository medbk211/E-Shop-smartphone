import React from "react";
import { FaTruck, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion"; // Import pour l'animation Framer Motion

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: FaTruck,
      title: "LIVRAISON GRATUITE ET RAPIDE",
      description: "Livraison gratuite pour toutes les commandes de plus de 140 DT.",
    },
    {
      id: 2,
      icon: FaHeadset,
      title: "SERVICE CLIENT 24/7",
      description: "Assistance clientèle réactive et amicale.",
    },
    {
      id: 3,
      icon: FaShieldAlt,
      title: "GARANTIE REMBOURSEMENT",
      description: "Retour sous 30 jours en cas d'insatisfaction.",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 py-12 bg-gray-50">
      {features.map((feature, index) => (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, y: 50 }} // Animation au départ
          whileInView={{ opacity: 1, y: 0 }} // Animation à l'affichage
          transition={{ duration: 0.5, delay: index * 0.2 }} // Délai progressif
          viewport={{ once: true }}
          className="flex flex-col items-center text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 max-w-[280px]"
        >
          <div className="flex items-center justify-center w-16 h-16 bg-white text-white rounded-full shadow-lg">
            <feature.icon className="text-3xl text-purple-700" />
          </div>
          <h3 className="mt-4 font-semibold text-xl text-white">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm text-gray-100">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturesSection;
