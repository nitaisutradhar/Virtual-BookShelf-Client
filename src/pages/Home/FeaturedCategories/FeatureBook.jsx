import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from 'react-router';

const FeatureBook = ({ filteredBooks }) => {
  const [showAll, setShowAll] = useState(false);

  const booksToShow = showAll ? filteredBooks : filteredBooks.slice(0, 8);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {booksToShow.map((book) => (
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
              <h3 className="card-title text-primary text-lg font-bold">
                {book.book_title}
              </h3>
              <p className="text-sm text-gray-500">{book.book_author}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="badge badge-secondary">{book.book_category}</div>
                <div className="badge badge-outline">🔥 {book.upvote}</div>
              </div>
              <Link
                to={`/bookshelf/${book._id}`}
                className="btn btn-sm btn-outline btn-info mt-4 w-full"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* See More / See Less Button */}
      {filteredBooks.length > 8 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn btn-outline btn-primary"
          >
            {showAll ? 'See Less Books' : 'See More Books'}
          </button>
        </div>
      )}
    </>
  );
};

export default FeatureBook;
