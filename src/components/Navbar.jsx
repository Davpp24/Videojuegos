import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#282828] rounded-md mb-2 flex items-center justify-between p-4">
      {/* Logo */}
      <img src="logo.png" className="h-12 w-12" alt="Logo" />
      <span className="self-center text-4xl font-semibold text-gray-200 whitespace-nowrap">Videojuegos Project</span>

      {/* Links de navegación */}
      <div className="flex items-center space-x-6">
        <NavLink
          to="/" className={({ isActive }) => `text-2xl font-semibold ${isActive ? "text-gray-400" : "text-gray-200"} hover:text-gray-400 transition`
          }>
          Home
        </NavLink>

        <NavLink
          to="/Games" className={({ isActive }) =>`text-2xl font-semibold ${isActive ? "text-gray-400" : "text-gray-200"} hover:text-gray-400 transition`
          }>
          VideoJuegos
        </NavLink>
        
      </div>
    </nav>
  );
};

export default Navbar;


