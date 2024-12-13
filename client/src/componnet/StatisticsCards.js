import React from 'react';
import { FaStore, FaDollarSign, FaGift, FaMoneyBillWave } from 'react-icons/fa';

const StatisticsCards = () => {
  const stats = [
    {
      id: 1,
      icon: <FaStore className="text-4xl" />,
      value: '10.5k',
      label: 'Sellers active on our site',
      bgColor: 'bg-white',
    },
    {
      id: 2,
      icon: <FaDollarSign className="text-4xl" />,
      value: '33k',
      label: 'Monthly Product Sale',
      bgColor: 'bg-green-200',
    },
    {
      id: 3,
      icon: <FaGift className="text-4xl" />,
      value: '45.5k',
      label: 'Customers active on our site',
      bgColor: 'bg-white',
    },
    {
      id: 4,
      icon: <FaMoneyBillWave className="text-4xl" />,
      value: '25k',
      label: 'Annual gross sale on our site',
      bgColor: 'bg-white',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`flex flex-col items-center justify-center border rounded-lg shadow-lg h-32 p-4 ${stat.bgColor} hover:shadow-xl hover:bg-gray-100 transition-all duration-300 border-2 border-green-200`}
        >
          <div className="mb-2">{stat.icon}</div>
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm text-center text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;
