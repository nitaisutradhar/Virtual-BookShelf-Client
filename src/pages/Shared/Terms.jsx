/* eslint-disable no-unused-vars */
// src/pages/Terms.jsx
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-4xl mx-auto px-4 py-12 text-textDark"
    >
      {/* Header */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-center mb-10"
      >
        <div className="flex justify-center mb-4">
          <ShieldCheck className="text-secondary" size={48} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Terms & Conditions</h1>
        <p className="mt-2 text-gray-600 text-sm">
          Last updated: June 5, 2025
        </p>
      </motion.div>

      {/* Body Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-6 text-sm leading-relaxed text-neutral"
      >
        <p>
          Welcome to Virtual Bookshelf. By accessing or using our website, you agree to be bound by the following Terms and Conditions. If you do not agree with any part of these terms, please do not use our service.
        </p>

        <h2 className="text-lg font-semibold text-secondary">1. User Accounts</h2>
        <p>
          To use certain features of the platform, you must create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
        </p>

        <h2 className="text-lg font-semibold text-secondary">2. Content Policy</h2>
        <p>
          Users are allowed to add books, write reviews, and vote on content. All submitted content must be respectful, non-infringing, and appropriate. We reserve the right to remove any content that violates these standards.
        </p>

        <h2 className="text-lg font-semibold text-secondary">3. Intellectual Property</h2>
        <p>
          All content provided on Virtual Bookshelf, including logos, text, and design, is the intellectual property of Virtual Bookshelf unless otherwise stated. Unauthorized use of our materials is strictly prohibited.
        </p>

        <h2 className="text-lg font-semibold text-secondary">4. Restrictions</h2>
        <ul className="list-disc pl-6">
          <li>Do not impersonate others or misrepresent your identity.</li>
          <li>Do not attempt to harm or exploit other users.</li>
          <li>Do not upload harmful, malicious, or offensive content.</li>
          <li>Do not use bots, scrapers, or automated tools on our platform.</li>
        </ul>

        <h2 className="text-lg font-semibold text-secondary">5. Termination</h2>
        <p>
          We may suspend or terminate your account at any time without notice if we believe you have violated our terms. You may also close your account at any time.
        </p>

        <h2 className="text-lg font-semibold text-secondary">6. Modifications</h2>
        <p>
          We reserve the right to update or change these Terms at any time. Continued use of the platform after changes are posted constitutes your acceptance of those changes.
        </p>

        <h2 className="text-lg font-semibold text-secondary">7. Contact Us</h2>
        <p>
          If you have any questions about these Terms & Conditions, please contact us at:
          <br />
          📧 <a href="mailto:support@virtualbookshelf.dev" className="text-info hover:underline">support@virtualbookshelf.dev</a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Terms;
