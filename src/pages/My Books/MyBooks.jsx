import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Pencil, Trash2 } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Loading from "../Shared/Loading";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBooks = () => {
  const { user } = useAuth();
  const userEmail = user.email;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate()
  const axiosSecure = useAxiosSecure()

  // Fetch books for this user
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        axiosSecure(`/my-books/${userEmail}`)
          .then((res) => {
            setBooks(res.data);
      setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [userEmail,axiosSecure]);

  if (loading) {
    return <Loading />;
  }

  // Delete Book Handler
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the book.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res =await axiosSecure.delete(`/books/${id}`);
        console.log(res);
        if (res.data.deletedCount > 0) {
          setBooks(books.filter((book) => book._id !== id));
          Swal.fire("Deleted!", "The book has been removed.", "success");
        } else {
          throw new Error(res.data.message || "Failed to delete.");
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  // Update handler placeholder
  const handleUpdate = (id) => {
    Swal.fire("Redirecting", "This will go to update form.", "info");
   Navigate(`/update-book/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto py-10 px-4"
    >
      <h2 className="text-3xl font-bold text-primary mb-6">📚 My Books</h2>

      {books.length === 0 ? (
        <p className="text-gray-500">You haven’t added any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <motion.div
              key={book._id}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="card bg-base-100 shadow-md border border-base-200 hover:shadow-xl"
            >
              <figure>
                <img
                  src={book.cover_photo}
                  alt={book.book_title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-xl font-bold text-primary">
                  {book.book_title}
                </h3>
                <p className="text-sm text-gray-500">{book.book_author}</p>
                <div className="badge badge-secondary">
                  {book.book_category}
                </div>
                <div className="badge badge-outline text-gray-600">{book.reading_status}</div>
                <p className="mt-2 text-sm text-gray-600">
                  {book.book_overview}
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleUpdate(book._id)}
                    className="btn btn-sm btn-outline btn-info flex items-center gap-1"
                  >
                    <Pencil size={16} /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyBooks;
