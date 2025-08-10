import { useEffect, useState } from "react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import Loading from "../Shared/Loading";

const Bookshelf = () => {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}

const debouncedSearch = useDebounce(searchText);

  // Fetch all books once
  useEffect(() => {
  setLoading(true);
  const params = new URLSearchParams();
  if (debouncedSearch) params.append("search", debouncedSearch);
  if (statusFilter) params.append("status", statusFilter);

  fetch(`${import.meta.env.VITE_API_URL}/books?${params.toString()}`)
    .then((res) => res.json())
    .then((data) => {
      setBooks(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching books:", err);
      setLoading(false);
    });
}, [debouncedSearch, statusFilter]);


  if(loading) return <Loading />

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
  <label className="relative w-full md:w-1/2">
  {/* Search Icon */}
  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
    <Search className="text-secondary z-20" size={20} />
  </span>

  {/* Input Field */}
  <input
    type="text"
    placeholder="Search by title or author"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    className="input input-bordered w-full pl-10 bg-white text-base-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
  />
</label>



        {/* Dropdown Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-bordered w-full md:w-60 bg-white text-base-200 placeholder-gray-400"
        >
          <option value="">All Reading Status</option>
          <option>Read</option>
          <option>Reading</option>
          <option>Want-to-Read</option>
        </select>
      </div>

      {/* Book Cards Grid */}
      {books.length === 0 ? (
        <p className="text-base-200">No books matched your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
              <div className="card-body">
                <h3 className="card-title text-primary text-lg font-bold">{book.book_title}</h3>
                <p className="text-sm text-gray-600">by {book.book_author}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="badge badge-secondary">{book.book_category}</div>
                  <div className="badge badge-outline text-gray-600">{book.reading_status}</div>
                </div>
                  <div className="badge badge-outline text-gray-600">Upvotes: {book.upvote || 0}</div>
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
