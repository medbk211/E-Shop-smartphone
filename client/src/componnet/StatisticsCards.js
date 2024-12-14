import React from 'react';
import { FaSeedling, FaTree, FaShippingFast, FaCoins } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StatisticsCards = () => {
  const stats = [
    {
      id: 1,
      icon: <FaSeedling className="text-5xl text-green-700" />,
      value: '8,000+',
      label: 'Variétés de fruits secs',
      bgColor: 'bg-gradient-to-r from-[#fef8e0] to-[#f9d776]', // Dégradé jaune-doré
      textColor: 'text-[#5b341b]', // Marron foncé
    },
    {
      id: 2,
      icon: <FaTree className="text-5xl text-orange-600" />,
      value: '120+',
      label: 'Fermes partenaires bio',
      bgColor: 'bg-gradient-to-r from-[#ffe3d8] to-[#ffa985]', // Dégradé pêche
      textColor: 'text-[#4e2e16]', // Marron chaud
    },
    {
      id: 3,
      icon: <FaShippingFast className="text-5xl text-blue-700" />,
      value: '24H',
      label: 'Livraison rapide et sûre',
      bgColor: 'bg-gradient-to-r from-[#e0f7fa] to-[#80d9e9]', // Dégradé bleu clair
      textColor: 'text-[#2b4b5f]', // Bleu foncé
    },
    {
      id: 4,
      icon: <FaCoins className="text-5xl text-yellow-500" />,
      value: '100K€',
      label: 'Chiffre d’affaires annuel',
      bgColor: 'bg-gradient-to-r from-[#fff8dc] to-[#fcd34d]', // Dégradé doré
      textColor: 'text-[#5c3a00]', // Brun doré
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
