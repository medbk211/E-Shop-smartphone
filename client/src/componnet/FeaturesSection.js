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
    <div className="flex flex-wrap justify-center gap-8 py-12 bg-white">
      {features.map((feature, index) => (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, y: 50 }} // Animation au départ
          whileInView={{ opacity: 1, y: 0 }} // Animation à l'affichage
          transition={{ duration: 0.5, delay: index * 0.2 }} // Délai progressif
          viewport={{ once: true }}
          className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-[280px]"
        >
          <div className="flex items-center justify-center w-16 h-16 bg-yellow-400 text-white rounded-full">
            <feature.icon className="text-3xl" />
          </div>
          <h3 className="mt-4 font-semibold text-xl text-gray-800">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturesSection;
