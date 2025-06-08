import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { BookPlus } from "lucide-react";

const AddBook = () => {
  // 🔐 Replace with auth context later
  const userEmail = "user@example.com";
  const userName = "John Doe";

  const [formData, setFormData] = useState({
    book_title: "",
    cover_photo: "",
    total_page: "",
    book_author: "",
    book_category: "Fiction",
    reading_status: "Want-to-Read",
    book_overview: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      ...formData,
      user_email: userEmail,
      user_name: userName,
      upvote: 0,
    };

    try {
      const res = await fetch("https://your-api-url.com/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      const data = await res.json();

      if (data.insertedId || res.ok) {
        Swal.fire({
          icon: "success",
          title: "Book Added!",
          text: `${formData.book_title} was added to your bookshelf.`,
          confirmButtonColor: "#06B6D4",
        });
        setFormData({
          book_title: "",
          cover_photo: "",
          total_page: "",
          book_author: "",
          book_category: "Fiction",
          reading_status: "Want-to-Read",
          book_overview: "",
        });
      } else {
        throw new Error(data.message || "Failed to add book.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message,
        confirmButtonColor: "#EF4444",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto py-10 my-8 px-4 bg-base-100 shadow-md rounded-md"
    >
      <div className="text-center mb-6">
        <BookPlus size={40} className="text-primary mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-primary">Add a New Book</h2>
        <p className="text-sm text-gray-500">Fill the form below to submit your book</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="book_title"
            value={formData.book_title}
            onChange={handleChange}
            placeholder="Book Title"
            required
            className="input input-bordered w-full bg-white text-black placeholder-gray-400"
          />

          <input
            type="text"
            name="cover_photo"
            value={formData.cover_photo}
            onChange={handleChange}
            placeholder="Cover Photo URL"
            required
            className="input input-bordered w-full bg-white text-black placeholder-gray-400"
          />

          <input
            type="text"
            name="book_author"
            value={formData.book_author}
            onChange={handleChange}
            placeholder="Author"
            required
            className="input input-bordered w-full bg-white text-black placeholder-gray-400"
          />

          <input
            type="number"
            name="total_page"
            value={formData.total_page}
            onChange={handleChange}
            placeholder="Total Pages"
            required
            className="input input-bordered w-full bg-white text-black placeholder-gray-400"
          />

          <select
            name="book_category"
            value={formData.book_category}
            onChange={handleChange}
            className="select select-bordered w-full bg-white text-black placeholder-gray-400"
          >
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Fantasy</option>
          </select>

          <select
            name="reading_status"
            value={formData.reading_status}
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
          value={formData.book_overview}
          onChange={handleChange}
          placeholder="Short overview or review"
          className="textarea textarea-bordered w-full bg-white text-black placeholder-gray-400"
          rows={4}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={userName}
            readOnly
            className="input input-bordered w-full bg-gray-200 text-black placeholder-gray-400 cursor-not-allowed"
            title="Read only"
          />
          <input
            type="email"
            value={userEmail}
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
          Submit Book
        </button>
      </form>
    </motion.div>
  );
};

export default AddBook;
