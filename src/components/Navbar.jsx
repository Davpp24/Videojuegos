import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <img
              src="/logo.png"
              className="h-16 w-16 rounded-full transform hover:scale-110 transition-transform duration-300"
              alt="Logo"
            />
          </div>
          <div className="flex items-center space-x-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xl font-medium px-4 py-3 transition-all duration-300 ease-in-out rounded-md ${
                  isActive ? "bg-yellow-500 text-gray-900" : "text-yellow-400 hover:bg-yellow-500 hover:text-gray-900"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/Games"
              className={({ isActive }) =>
                `text-xl font-medium px-4 py-3 transition-all duration-300 ease-in-out rounded-md ${
                  isActive ? "bg-yellow-500 text-gray-900" : "text-yellow-400 hover:bg-yellow-500 hover:text-gray-900"
                }`
              }
            >
              Videojuegos
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
