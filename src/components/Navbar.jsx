import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat" },
    { name: "Notes", path: "/notes" },
    // { name: "About", path: "/about" },
  ];

  const linkClasses = (path) =>
    `relative px-5 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all duration-300 
     ${
       location.pathname === path
         ? "text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 shadow-lg scale-105"
         : "text-purple-700 hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.8)] hover:bg-gradient-to-r hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400"
     }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-b border-purple-100 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-fuchsia-600 via-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-md cursor-pointer transition-transform duration-300 hover:scale-110">
            FitGuru 🌈
          </h1>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4">
            {links.map((link) => (
              <Link key={link.path} to={link.path} className={linkClasses(link.path)}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-4xl text-purple-700 hover:text-fuchsia-600 transition-transform transform hover:scale-110 focus:outline-none"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 shadow-inner ${
          menuOpen ? "max-h-80 opacity-100 py-3" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col px-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${linkClasses(link.path)} text-center`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
