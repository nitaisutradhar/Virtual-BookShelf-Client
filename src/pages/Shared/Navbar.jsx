/* eslint-disable no-unused-vars */

import { Link, NavLink } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import ActiveLink from "../../routes/ActiveLink";

//import { motion } from "motion/react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logOut } = useAuth();
  // firebase logout
  const handleLogOut = () => {
    setIsOpen(!isOpen);
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "See you again soon!",
          confirmButtonText: "OK",
          confirmButtonColor: "#6366F1",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = (
  <>
    <li>
      <ActiveLink to="/">Home</ActiveLink>
    </li>
    <li>
      <ActiveLink to="/bookshelf">Bookshelf</ActiveLink>
    </li>
    <li>
      <ActiveLink to="/add-book">Add Book</ActiveLink>
    </li>
    <li>
      <ActiveLink to="/my-books">My Books</ActiveLink>
    </li>
    <li>
      <ActiveLink to="/profile">Profile</ActiveLink>
    </li>
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
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight hover:text-hoverAccent duration-300"
          >
            📚 Virtual Bookshelf
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">{navLinks}</ul>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex gap-2">
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-sm bg-secondary text-white hover:bg-hoverAccent duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm btn-outline text-lightText border-lightText hover:text-hoverAccent hover:border-hoverAccent duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden duration-500">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <X className="text-white cursor-pointer" />
            ) : (
              <Menu className="text-white cursor-pointer" />
            )}
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
          <ul onClick={toggleMenu} className="menu menu-vertical space-y-2">
            {navLinks}
          </ul>
          <div className="mt-2">
            {user ? (
              <button
                onClick={handleLogOut}
                className="btn btn-sm bg-secondary text-white w-full hover:bg-hoverAccent duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                onClick={toggleMenu}
                to="/login"
                className="btn btn-sm btn-outline text-lightText border-lightText w-full hover:text-hoverAccent hover:border-hoverAccent duration-300"
              >
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
