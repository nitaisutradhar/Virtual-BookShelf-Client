/* eslint-disable no-unused-vars */
// src/pages/NotFound.jsx
import { Link } from "react-router";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 bg-background text-textDark"
    >
      {/* Custom Floating SVG Ghost */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="160"
          height="160"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M40 150c0 0 5-30 60-30s60 30 60 30v30H40v-30z"
            fill="#0EA5E9"
            opacity="0.1"
          />
          <path
            d="M100 20c-33 0-60 27-60 60v70c0 5 6 7 10 3s10-6 15 0 10 6 15 0 10-6 15 0 10 6 15 0 10-6 15 0 10 6 15 0 10-6 10-3V80c0-33-27-60-60-60z"
            fill="#06B6D4"
          />
          <circle cx="75" cy="85" r="8" fill="#fff" />
          <circle cx="125" cy="85" r="8" fill="#fff" />
          <circle cx="75" cy="85" r="4" fill="#0F172A" />
          <circle cx="125" cy="85" r="4" fill="#0F172A" />
          <path
            d="M80 115c6 5 14 5 20 0"
            stroke="#0F172A"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* 404 Text */}
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-6xl md:text-7xl font-bold text-primary"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-2 text-lg md:text-xl text-secondary"
      >
        Oops! Ghosted the page 😵‍💫
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-2 text-sm text-gray-500 max-w-md"
      >
        The page you're looking for doesn't exist or has been moved. Let’s take you back to safety.
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6"
      >
        <Link
          to="/"
          className="btn btn-primary text-white px-6 py-2 hover:bg-accent transition duration-300"
        >
          ← Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
