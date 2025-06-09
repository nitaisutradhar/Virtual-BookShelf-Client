import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { NotebookPen } from "lucide-react";
import axios from "axios";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  // Fetch the book to update
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/my-book/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error loading book", err));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  // Handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _id, ...payload } = book;
    try {
      axios
        .put(`${import.meta.env.VITE_API_URL}/update-book/${id}`, payload)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              icon: "success",
              title: "Book Updated!",
              confirmButtonColor: "#06B6D4",
            });
            navigate("/my-books");
          } else {
            throw new Error("Update failed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to update",
        text: err.message,
      });
    }
  };

  if (!book) return <p className="text-center py-20">Loading book data...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto py-10 my-8 px-4 bg-base-100 shadow-md rounded-md"
    >
      <div className="text-center mb-6">
        <NotebookPen size={40} className="text-primary mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-primary">Update Book</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="book_title"
            value={book.book_title}
            onChange={handleChange}
            placeholder="Book Title"
            className="input input-bordered w-full bg-white text-black placeholder-gray-400"
          />

          <input
            type="text"
            name="cover_photo"
            value={book.cover_photo}
            onChange={handleChange}
            placeholder="Cover Photo URL"
            className="input input-bordered w-full bg-white text-black placeholder-gray-400"
          />

          <input
            type="text"
            name="book_author"
            value={book.book_author}
            onChange={handleChange}
            placeholder="Author"
            className="input input-bordered w-full bg-white text-black placeholder-gray-400"
          />

          <input
            type="number"
            name="total_page"
            value={book.total_page}
            onChange={handleChange}
            placeholder="Total Pages"
            className="input input-bordered w-full bg-white text-black placeholder-gray-400"
          />

          <select
            name="book_category"
            value={book.book_category}
            onChange={handleChange}
            className="select select-bordered w-full bg-white text-black placeholder-gray-400"
          >
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Fantasy</option>
          </select>

          <select
            name="reading_status"
            value={book.reading_status}
            onChange={handleChange}
            className="select select-bordered w-full bg-white text-black placeholder-gray-400"
          >
            <option>Read</option>
            <option>Reading</option>
            <option>Want-to-Read</option>
          </select>
        </div>

        <textarea
          name="book_overview"
          value={book.book_overview}
          onChange={handleChange}
          placeholder="Short overview or review"
          className="textarea textarea-bordered w-full bg-white text-black placeholder-gray-400"
          rows={4}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={book.user_name}
            readOnly
            className="input input-bordered w-full bg-gray-200 text-black placeholder-gray-400 cursor-not-allowed"
            title="Read only"
          />
          <input
            type="email"
            value={book.user_email}
            readOnly
            className="input input-bordered w-full bg-gray-200 text-black placeholder-gray-400 cursor-not-allowed"
            title="Read only"
          />
          <input
            type="number"
            value="0"
            readOnly
            className="input input-bordered w-full bg-gray-200 text-black placeholder-gray-400 cursor-not-allowed"
            title="Read only"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Book
        </button>
      </form>
    </motion.div>
  );
};

export default UpdateBook;
