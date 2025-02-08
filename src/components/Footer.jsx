import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg mt-4 rounded-t-lg text-white">
      <div className="w-full mx-auto p-6 md:py-8 text-center">
        <hr className="my-6 border-gray-600 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-400">© 2023 Videojuego Project. Todos los derechos reservados.</span>
        <div className="mt-4">
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Política de Privacidad</a> | 
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 ml-2">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;