/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-background">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Book Icon Animation */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className="text-primary"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m0-12c-2.667-1-6-1-9 1v12c3-2 6.333-2 9-1m0-12c2.667-1 6-1 9 1v12c-3-2-6.333-2-9-1"
          />
        </motion.svg>

        {/* Loading Text Animation */}
        <motion.p
          className="mt-4 text-secondary font-medium text-lg tracking-wide"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading your bookshelf...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loading;
