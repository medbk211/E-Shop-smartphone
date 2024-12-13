import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section 1: Logo et Description */}
          <div>
            <h2 className="text-2xl font-bold text-white">E-Shop</h2>
            <p className="mt-4 text-sm">
              Votre boutique en ligne préférée pour tous vos besoins ! Nous offrons des produits de qualité à des prix compétitifs.
            </p>
          </div>

          {/* Section 2: Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold text-white">Liens rapides</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/" className="hover:text-white transition">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-white transition">
                  Boutique
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  À propos
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li>Adresse : Rue Exemple, Tunis, Tunisie</li>
              <li>Téléphone : +216 12 345 678</li>
              <li>Email : contact@eshop.com</li>
            </ul>
          </div>

          {/* Section 4: Suivez-nous */}
          <div>
            <h3 className="text-lg font-semibold text-white">Suivez-nous</h3>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-sm">
            © {new Date().getFullYear()} E-Shop. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
