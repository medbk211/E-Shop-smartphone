import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-500 via-orange-400 to-red-500 text-gray-100 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section 1: Logo et Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold">E-Shop</h2>
            <p className="mt-4 text-sm">
              Votre boutique en ligne préférée ! Découvrez nos produits de qualité et profitez de nos offres exceptionnelles.
            </p>
          </motion.div>

          {/* Section 2: Liens rapides */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold">Liens rapides</h3>
            <ul className="mt-4 space-y-2">
              {["Accueil", "Boutique", "À propos", "Contact"].map((link, index) => (
                <li key={index}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="hover:underline hover:text-yellow-200 transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Section 3: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li>Adresse : Rue Exemple, Tunis, Tunisie</li>
              <li>Téléphone : +216 12 345 678</li>
              <li>Email : contact@eshop.com</li>
            </ul>
          </motion.div>

          {/* Section 4: Suivez-nous */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold">Suivez-nous</h3>
            <div className="mt-4 flex space-x-4">
              {[
                { icon: FaFacebook, link: "https://facebook.com", color: "text-blue-500" },
                { icon: FaTwitter, link: "https://twitter.com", color: "text-blue-400" },
                { icon: FaInstagram, link: "https://instagram.com", color: "text-pink-500" },
                { icon: FaLinkedin, link: "https://linkedin.com", color: "text-blue-700" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:${social.color} transition`}
                  whileHover={{ scale: 1.2 }}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-8 text-center border-t border-gray-200 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm">
            © {new Date().getFullYear()} E-Shop. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
