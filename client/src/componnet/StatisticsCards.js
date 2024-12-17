import React from 'react';
import { FaSeedling, FaTree, FaShippingFast, FaCoins } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StatisticsCards = () => {
  const stats = [
    {
      id: 1,
      icon: <FaSeedling className="text-5xl text-blue-500" />, // Bleu pour l'icône
      value: '8,000+',
      label: 'Variétés de fruits secs',
      bgColor: 'bg-gradient-to-r from-[#6a4c9c] to-[#4e3483]', // Dégradé violet
      textColor: 'text-[#2c1a55]', // Gris foncé pour le texte
    },
    {
      id: 2,
      icon: <FaTree className="text-5xl text-purple-600" />, // Violet pour l'icône
      value: '120+',
      label: 'Fermes partenaires bio',
      bgColor: 'bg-gradient-to-r from-[#7f5a8b] to-[#9c4e97]', // Dégradé violet foncé à violet clair
      textColor: 'text-[#2b1d3b]', // Gris foncé
    },
    {
      id: 3,
      icon: <FaShippingFast className="text-5xl text-indigo-500" />, // Indigo pour l'icône
      value: '24H',
      label: 'Livraison rapide et sûre',
      bgColor: 'bg-gradient-to-r from-[#a7c7e7] to-[#5a6b9b]', // Dégradé bleu clair
      textColor: 'text-[#1d3a5a]', // Gris bleu pour le texte
    },
    {
      id: 4,
      icon: <FaCoins className="text-5xl text-gray-400" />, // Gris clair pour l'icône
      value: '100K€',
      label: 'Chiffre d’affaires annuel',
      bgColor: 'bg-gradient-to-r from-[#e3e3e3] to-[#b1b1b1]', // Dégradé gris clair
      textColor: 'text-[#333333]', // Gris foncé pour le texte
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10 py-16">
      {stats.map((stat) => (
        <motion.div
          key={stat.id}
          className={`flex flex-col items-center justify-center rounded-xl shadow-lg h-48 p-6 transition-all duration-300 ${stat.bgColor}`}
          whileHover={{
            scale: 1.1,
            rotate: 1,
            boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)',
          }}
          aria-label={stat.label}
        >
          <motion.div
            whileHover={{ scale: 1.5, rotate: -5 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            {stat.icon}
          </motion.div>
          <div className={`text-4xl font-extrabold ${stat.textColor}`}>{stat.value}</div>
          <div className="text-lg text-center text-gray-700 mt-2">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatisticsCards;
