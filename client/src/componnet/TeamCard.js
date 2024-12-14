import React from "react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const TeamCards = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Tom Cruise",
      role: "Founder & Chairman",
      image: "https://via.placeholder.com/150", // Remplace par un vrai lien d'image
      socials: { twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      id: 2,
      name: "Emma Watson",
      role: "Managing Director",
      image: "https://via.placeholder.com/150", // Remplace par un vrai lien d'image
      socials: { twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      id: 3,
      name: "Will Smith",
      role: "Product Designer",
      image: "https://via.placeholder.com/150", // Remplace par un vrai lien d'image
      socials: { twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      id: 4,
      name: "Anna Kendrick",
      role: "Marketing Specialist",
      image: "https://via.placeholder.com/150", // Remplace par un vrai lien d'image
      socials: { twitter: "#", instagram: "#", linkedin: "#" },
    },
  ];

  return (
    <div
      className="flex flex-wrap justify-center gap-8 py-10"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1920x1080/?nuts,fruits')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {teamMembers.map((member) => (
        <motion.div
          key={member.id}
          className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-64 text-center"
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: member.id * 0.2 }}
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md"
          />
          <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
          <p className="text-gray-500 font-medium">{member.role}</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href={member.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href={member.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-700"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TeamCards;
