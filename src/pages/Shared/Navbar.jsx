/* eslint-disable no-unused-vars */

// src/components/Navbar.jsx
import { Link, NavLink } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

//import { motion } from "motion/react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = false; // 🔒 Replace later with actual auth state
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-hoverAccent duration-300">Home</NavLink>
      </li>
      <li>
        <NavLink to="/bookshelf" className="hover:text-hoverAccent duration-300">Bookshelf</NavLink>
      </li>
      {isLoggedIn && (
        <>
          <li><NavLink to="/add-book" className="hover:text-hoverAccent duration-300">Add Book</NavLink></li>
          <li><NavLink to="/my-books" className="hover:text-hoverAccent duration-300">My Books</NavLink></li>
          <li><NavLink to="/profile" className="hover:text-hoverAccent duration-300">Profile</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-primary text-lightText shadow-md sticky top-0 z-50"
    >
      <div className="navbar max-w-7xl mx-auto px-4 py-3">
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold tracking-tight hover:text-hoverAccent duration-300">
            📚 Virtual Bookshelf
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">{navLinks}</ul>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex gap-2">
          {isLoggedIn ? (
            <button className="btn btn-sm bg-secondary text-white hover:bg-hoverAccent duration-300">Logout</button>
          ) : (
            <Link to="/login" className="btn btn-sm btn-outline text-lightText border-lightText hover:text-hoverAccent hover:border-hoverAccent duration-300">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden bg-primary px-4 pb-4"
        >
          <ul className="menu menu-vertical space-y-2">{navLinks}</ul>
          <div className="mt-2">
            {isLoggedIn ? (
              <button className="btn btn-sm bg-secondary text-white w-full hover:bg-hoverAccent duration-300">
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-sm btn-outline text-lightText border-lightText w-full hover:text-hoverAccent hover:border-hoverAccent duration-300">
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
