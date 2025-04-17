// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from '../assets/FinTrack.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-white opacity-95 shadow-lg sticky top-0 z-50 p-4 px-8">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-3xl font-bold text-orange-500 hover:scale-105 transition-transform"
        >
          <img src={logo} alt="FinTrack Logo" className="h-12 w-auto mr-3" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="hover:text-orange-400 transition-colors relative group text-lg"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link
            to="/predictor"
            className="hover:text-orange-400 transition-colors relative group text-lg"
          >
            Predictor
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link
            to="/chatbot"
            className="hover:text-orange-400 transition-colors relative group text-lg"
          >
            ChatBot
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>

          <Link
            to="/docs"
            className="hover:text-orange-400 transition-colors relative group text-lg"
          >
            Docs
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none transition-transform transform hover:scale-110"
        >
          {isOpen ? (
            <FaTimes className="w-6 h-6 text-orange-500" />
          ) : (
            <FaBars className="w-6 h-6 text-orange-500" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-200 ease-in-out">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block py-2 text-lg text-gray-300 hover:text-orange-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/predictor"
            onClick={toggleMenu}
            className="block py-2 text-lg text-gray-300 hover:text-orange-400 transition-colors"
          >
            Predictor
          </Link>
          <Link
            to="/chatbot"
            onClick={toggleMenu}
            className="block py-2 text-lg text-gray-300 hover:text-orange-400 transition-colors"
          >
            ChatBot
          </Link>

          <Link
            to="/docs"
            onClick={toggleMenu}
            className="block py-2 text-lg text-gray-300 hover:text-orange-400 transition-colors"
          >
            Documentation
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
