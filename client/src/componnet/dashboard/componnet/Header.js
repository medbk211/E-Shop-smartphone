import React from 'react';

const Header = () => {
  return (
    <div className="bg-white shadow p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Rechercher..."
          className="border border-gray-300 rounded-lg p-2"
        />
      </div>
    </div>
  );
};

export default Header;
