import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";


const FeatureBook = ({filteredBooks}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredBooks.map((book) => (
        <motion.div
            key={book._id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="card bg-base-100 shadow border border-base-200"
          >
            <figure>
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body text-base-200">
              <h3 className="card-title text-lg font-bold">
                {book.book_title}
              </h3>
              <p className="text-sm text-gray-500">{book.book_author}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="badge badge-secondary">{book.book_category}</div>
                <div className="badge badge-outline">🔥 {book.upvote}</div>
              </div>
            </div>
          </motion.div>
      ))}
    </div>
    );
};

export default FeatureBook;