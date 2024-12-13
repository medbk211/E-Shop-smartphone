import React from 'react';
import { FaTruck, FaHeadset, FaShieldAlt } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: FaTruck,
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140',
    },
    {
      id: 2,
      icon: FaHeadset,
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support',
    },
    {
      id: 3,
      icon: FaShieldAlt,
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 py-8">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="flex flex-col items-center text-center max-w-[300px] space-y-4"
        >
          <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full  ">
            <feature.icon className="text-3xl text-black" />
          </div>
          <h3 className="font-semibold text-lg">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesSection;
