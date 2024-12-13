import React, { useState, useEffect } from "react";

const Notification = ({ message, type = "info", onClose }) => {
  const [visible, setVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  // Close notification automatically after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true); // Trigger closing transition
      setTimeout(() => {
        setVisible(false); // Remove from DOM after transition
        if (onClose) onClose();
      }, 500); // Wait for the transition to finish before removing from DOM
    }, 1000); // 10 seconds

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  const typeStyles = {
    success: "bg-green-100 text-green-700 border-green-500",
    error: "bg-red-100 text-red-700 border-red-500",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-500",
    info: "bg-blue-100 text-blue-700 border-blue-500",
  };

  return (
    <div
      className={` w-100 p-2 rounded-lg shadow-lg border-l-4 ${
        typeStyles[type]
      } transition-all duration-500 ${
        isClosing ? "opacity-0 translate-x-10" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          className="text-xl font-bold text-gray-700 hover:text-gray-900"
          onClick={() => {
            setIsClosing(true); // Trigger closing transition when clicked
            setTimeout(() => {
              setVisible(false);
              if (onClose) onClose();
            }, 800); // Wait for the transition to finish before removing from DOM
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
