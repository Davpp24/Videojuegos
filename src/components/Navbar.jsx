import React from "react";

const links = [
  { name: "Home", path: "/" },
  { name: "videojuegos", path: "/films" },
];

const Navbar = () => {
  return (
    <>
  <nav className="bg-[#282828] rounded-md mb-2 flex items-center justify-between p-4">

  <img src="logo.png" className="h-12 w-12" alt="Logo" />

  <div className="flex items-center space-x-3 rtl:space-x-reverse">
    <span className="self-center text-2xl font-semibold text-gray-200 whitespace-nowrap">Home</span>
    <span  className="self-center text-2xl font-semibold text-gray-200 whitespace-nowrap">VideoGames</span>
  </div>
</nav>


    </>
  );
};

export default Navbar;
