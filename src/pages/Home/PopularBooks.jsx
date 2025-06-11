import { useEffect, useState } from "react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import Loading from "../Shared/Loading";

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/popular-books`)
      .then((res) => res.json())
      .then((data) => {setBooks(data)
        setLoading(false)
      });
  }, []);
  if(loading) return <Loading />

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 py-10 text-textDark"
    >
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-primary">
        <Flame className="text-secondary" /> Popular Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {books.map((book) => (
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
    </motion.div>
  );
};

export default PopularBooks;
