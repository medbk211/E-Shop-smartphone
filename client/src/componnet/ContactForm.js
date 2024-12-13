import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactForm = () => {
  return (
    <div className="mt-20 flex flex-col lg:flex-row items-start lg:items-center justify-center lg:justify-between bg-gray-50 p-6 lg:p-12 space-y-8 lg:space-y-0 lg:space-x-12">
      {/* Left Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 lg:w-1/3">
        <div className="mb-6">
          <h3 className="text-xl font-semibold flex items-center space-x-2 text-gray-800">
            <FaPhoneAlt className="text-yellow-400 text-2xl" />
            <span>Call To Us</span>
          </h3>
          <p className="text-gray-600 mt-2">We are available 24/7, 7 days a week.</p>
          <p className="text-gray-800 font-medium mt-1">Phone: +8801611112222</p>
        </div>
        <hr className="border-yellow-400 my-4" />
        <div>
          <h3 className="text-xl font-semibold flex items-center space-x-2 text-gray-800">
            <FaEnvelope className="text-yellow-400 text-2xl" />
            <span>Write To Us</span>
          </h3>
          <p className="text-gray-600 mt-2">Fill out our form and we will contact you within 24 hours.</p>
          <p className="text-gray-800 font-medium mt-1">Emails: customer@exclusive.com</p>
          <p className="text-gray-800 font-medium">support@exclusive.com</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 lg:w-2/3 border-2 border-yellow-400">
        <form className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Your Name *"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <input
              type="email"
              placeholder="Your Email *"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <input
              type="tel"
              placeholder="Your Phone *"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
          <button
            type="submit"
            className="w-full lg:w-auto bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-400 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
