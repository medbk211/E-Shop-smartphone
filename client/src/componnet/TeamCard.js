import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const TeamCards = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Tom Cruise',
      role: 'Founder & Chairman',
      image: 'https://via.placeholder.com/150', // Remplace par un vrai lien d'image
      socials: { twitter: '#', instagram: '#', linkedin: '#' },
    },
    {
      id: 2,
      name: 'Emma Watson',
      role: 'Managing Director',
      image: 'https://via.placeholder.com/150', // Remplace par un vrai lien d'image
      socials: { twitter: '#', instagram: '#', linkedin: '#' },
    },
    {
      id: 3,
      name: 'Will Smith',
      role: 'Product Designer',
      image: 'https://via.placeholder.com/150', // Remplace par un vrai lien d'image
      socials: { twitter: '#', instagram: '#', linkedin: '#' },
    },
    {
      id: 4,
      name: 'Will Smith',
      role: 'Product Designer',
      image: 'https://via.placeholder.com/150', // Remplace par un vrai lien d'image
      socials: { twitter: '#', instagram: '#', linkedin: '#' },
    },
  ];

  return (
    <div className="flex flex-wrap justify-around gap-6 p-6  bg-gray-50">
      {teamMembers.map((member) => (
        <div
          key={member.id}
          className="bg-white rounded-lg shadow-md border p-6 w-full sm:w-64 text-center"
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold">{member.name}</h3>
          <p className="text-gray-600">{member.role}</p>
          <div className="flex justify-center space-x-4 mt-4 text-gray-500">
            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-blue-500" />
            </a>
            <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-pink-500" />
            </a>
            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-blue-700" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamCards;

