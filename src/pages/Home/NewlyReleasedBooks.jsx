// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "../Shared/Loading";
import axios from "axios";

const NewlyReleasedBooks = () => {
     const [loading,setLoading] = useState(true)
    const [books,setBooks] = useState([])
    
        useEffect(() => {
            axios(`${import.meta.env.VITE_API_URL}/books`).then(res=> {setBooks(res.data)
                setLoading(false)})
        },[])
  // Sort by date assuming `createdAt` is an ISO string or Date
  const sortedBooks = [...books].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const recentBooks = sortedBooks.slice(0, 5);

  if(loading) return <Loading />
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <h2 className="text-3xl font-bold mb-8 text-primary text-left flex items-center justify-start gap-2">
        <CalendarDays className="text-secondary" size={28} /> Newly Released Books
      </h2>

      {recentBooks.length === 0 ? (
        <p className="text-center text-muted">No new books added recently.</p>
      ) : (
        <div className="grid justify-center sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {recentBooks.map((book) => (
            <motion.div
              key={book._id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex flex-col justify-between card bg-base-100 shadow-md border border-base-200 p-4 rounded-lg"
            >
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold text-primary">{book.book_title}</h3>
              <p className="text-sm text-muted text-gray-500">by {book.book_author}</p>
              <p className="text-xs text-gray-500">Category: {book.book_category}</p>
              <span className="badge badge-accent mt-2">🆕 Released</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default NewlyReleasedBooks;
