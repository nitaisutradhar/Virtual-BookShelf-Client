// src/components/Footer.jsx
import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-base-100 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Name */}
        <div>
          <Link to="/" className="text-2xl font-bold tracking-tight text-base-100">
            📚 Virtual Bookshelf
          </Link>
          <p className="mt-2 text-sm">
            Organize your reading life beautifully.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-3 text-base-100">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-info">Home</Link></li>
            <li><Link to="/bookshelf" className="hover:text-info">Bookshelf</Link></li>
            <li><Link to="/add-book" className="hover:text-info">Add Book</Link></li>
            <li><Link to="/my-books" className="hover:text-info">My Books</Link></li>
            <li><Link to="/profile" className="hover:text-info">Profile</Link></li>
            <li><Link to="/terms" className="hover:text-info">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold mb-3 text-base-100">Contact</h3>
          <p className="text-sm flex items-center gap-2">
            <Mail size={16} /> support@virtualbookshelf.dev
          </p>
          <div className="flex gap-4 mt-4">
            <Link target='_blank' to="https://www.facebook.com/" className="hover:text-info"><Facebook /></Link>
            <Link target='_blank' to="https://x.com/" className="hover:text-info"><Twitter /></Link>
            <Link target='_blank' to="https://www.instagram.com/" className="hover:text-info"><Instagram /></Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm border-t border-base-300 pt-4 text-base-300">
        © {new Date().getFullYear()} Virtual Bookshelf. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
