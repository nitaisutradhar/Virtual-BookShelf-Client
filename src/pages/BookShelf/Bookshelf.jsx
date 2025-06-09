import { useEffect, useState } from "react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";

const Bookshelf = () => {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch all books once
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  // Apply search + filter
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.book_title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.book_author.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      !statusFilter || book.reading_status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  console.log(filteredBooks);


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto bg-base-100 py-10 px-4"
    >
      <h2 className="text-3xl font-bold text-primary mb-6">📚 All Books</h2>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search Input */}
        <label className="input input-bordered flex items-center gap-2 w-full md:w-1/2">
          <Search className="text-secondary" size={18} />
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-transparent outline-none text-black"
          />
        </label>

        {/* Dropdown Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-bordered w-full md:w-60 bg-white text-gray-800"
        >
          <option value="">All Reading Status</option>
          <option>Read</option>
          <option>Reading</option>
          <option>Want-to-Read</option>
        </select>
      </div>

      {/* Book Cards Grid */}
      {filteredBooks.length === 0 ? (
        <p className="text-gray-500">No books matched your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
              <div className="card-body">
                <h3 className="card-title text-gray-600 text-lg font-bold">{book.book_title}</h3>
                <p className="text-sm text-gray-500">by {book.book_author}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="badge badge-secondary">{book.book_category}</div>
                  <div className="badge badge-outline">{book.reading_status}</div>
                  <div className="badge badge-outline text-gray-500">Upvotes: {book.upvote || 0}</div>
                </div>
                <Link
                  to={`/bookshelf/${book._id}`}
                  className="btn btn-sm btn-outline btn-info mt-4 w-full flex items-center justify-center gap-1"
                >
                  View Details <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Bookshelf;
