import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactForm = () => {
  return (
    <div
      className="mt-20 flex flex-col lg:flex-row items-start lg:items-stretch justify-center lg:justify-between p-8 lg:p-16 gap-12"
      style={{
        backgroundImage: "url('/image211.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left Section */}
      <motion.div
        className="bg-white shadow-xl rounded-xl p-8 lg:w-1/3 border-l-4 border-orange-500"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
      >
        <div className="mb-8">
          <h3 className="text-2xl font-bold flex items-center gap-3 text-green-800">
            <FaPhoneAlt className="text-orange-400 text-3xl" />
            <span>Appelez-nous</span>
          </h3>
          <p className="text-gray-600 mt-2 text-lg">
            Nous sommes disponibles 7j/7 pour répondre à vos questions.
          </p>
          <p className="text-gray-800 font-medium mt-4 text-lg">📞 +216 98 123 456</p>
        </div>
        <hr className="border-t-2 border-orange-300 my-6" />
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-3 text-green-800">
            <FaEnvelope className="text-orange-400 text-3xl" />
            <span>Envoyez-nous un email</span>
          </h3>
          <p className="text-gray-600 mt-2 text-lg">
            Remplissez le formulaire ci-dessous, et nous vous répondrons sous 24 heures.
          </p>
          <p className="text-gray-800 font-medium mt-4 text-lg">
            ✉️ contact@fruitssecs.com
          </p>
          <p className="text-gray-800 font-medium">✉️ support@fruitssecs.com</p>
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="bg-white shadow-xl rounded-xl p-8 lg:w-2/3 border-l-4 border-green-500"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
      >
        <form className="space-y-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.input
              type="text"
              placeholder="Votre Nom *"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
              required
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input
              type="email"
              placeholder="Votre Email *"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
              required
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input
              type="tel"
              placeholder="Votre Téléphone *"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
              required
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
          <motion.textarea
            placeholder="Votre Message"
            rows="5"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
            whileFocus={{ scale: 1.02 }}
          ></motion.textarea>
          <motion.button
            type="submit"
            className="w-full md:w-auto bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-500 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Envoyer le Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;
