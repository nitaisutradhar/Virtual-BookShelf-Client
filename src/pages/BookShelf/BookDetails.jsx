import { useEffect, useState } from "react";
import { useParams } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { ThumbsUp, MessageSquare, Pencil, Trash2 } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Loading from "../Shared/Loading";
import axios from "axios";

const statusSteps = ["Want-to-Read", "Reading", "Read"];

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [loading, setLoading] = useState(true);

const {user } = useAuth();
const currentUser = {
  email: user?.email,
  name: user?.displayName,
};

  // Fetch book data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/my-book/${id}`)
      .then((res) => res.json())
      .then((data) => {setBook(data)
        setLoading(false);
      });
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/reviews?book_id=${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  // Upvote handler
  const handleUpvote = async () => {
    if (!currentUser.email) {
      return Swal.fire({
        toast: true,
        icon: "error",
        title: "You need to login first",
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: "#F1F5F9",
        color: "#1E293B",
      });
    }

    if (currentUser.email === book.user_email) {
      return Swal.fire("Denied", "You cannot upvote your own book.", "warning");
    }


    const res = await fetch(`${import.meta.env.VITE_API_URL}/book/${id}/upvote`, {
      method: "PATCH",
    });
    const result = await res.json();

    if (res.ok) {
      setBook({ ...book, upvote: result.upvote });
    }
  };

  // Submit or update review
  const handleSubmitReview = async () => {
    if (!currentUser.email) {
      return Swal.fire({
        toast: true,
        icon: "error",
        title: "You need to login first",
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: "#F1F5F9",
        color: "#1E293B",
      });
    }

    if (!reviewText.trim()) return;

    const body = {
      book_id: id,
      user_email: currentUser.email,
      review_text: reviewText,
    };

    const endpoint = editingReviewId
      ? `${import.meta.env.VITE_API_URL}/reviews/${editingReviewId}`
      : `${import.meta.env.VITE_API_URL}/reviews`;

    const method = editingReviewId ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const updated = await res.json();
    if (updated.error)
     return Swal.fire({
          toast: true,
          icon: "error",
          title: updated.error,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          background: "#F1F5F9",
          color: "#1E293B",
        });

    if (res.ok) {
      setReviewText("");
      setEditingReviewId(null);
      // Re-fetch reviews
      fetch(`${import.meta.env.VITE_API_URL}/reviews?book_id=${id}`)
        .then((res) => res.json())
        .then((data) => setReviews(data));
      Swal.fire("Success", "Review saved", "success");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
    });

    if (confirm.isConfirmed) {
      await fetch(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`, {
        method: "DELETE",
      });
      setReviews(reviews.filter((r) => r._id !== reviewId));
    }
  };

  const handleStatusUpdate = async () => {
    if (!book ) return;
    if (book.user_email !== currentUser.email){
      return Swal.fire({
        toast: true,
        icon: "error",
        title: "You are not the owner of this book",
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: "#F1F5F9",
        color: "#1E293B",
    })
  }
    const currentIndex = statusSteps.indexOf(book.reading_status);
    if (currentIndex < 0 || currentIndex >= statusSteps.length - 1) return;

    const newStatus = statusSteps[currentIndex + 1];

    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/books/${id}/reading-status`, {
        reading_status: newStatus,
      });


      if (res.data.modifiedCount > 0) {
        setBook((prev) => ({ ...prev, reading_status: newStatus }));
        Swal.fire("Updated", `Reading status set to ${newStatus}`, "success");
      }
    } catch (error) {
      Swal.fire("Error", `Failed to update status: ${error}` , "error");
    }
  };

  if(loading) return <Loading />
  if (!book) return <p className="text-center py-20">Loading book...</p>;

  const currentStatusIndex = statusSteps.indexOf(book.reading_status);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto py-10 px-4 text-base-300"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={book.cover_photo}
          alt={book.book_title}
          className="w-full h-96 object-cover rounded-lg shadow"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{book.book_title}</h2>
          <p className="text-sm text-base-200">by {book.book_author}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="badge badge-secondary">{book.book_category}</span>
            <span className="badge badge-outline">{book.reading_status}</span>
            <span className="badge badge-outline">📄 {book.total_page} pages</span>
          </div>
          <p className="mt-4 text-sm">{book.book_overview}</p>
          <div className="mt-4 text-sm">
            <p>📧 <b>{book.user_email}</b></p>
            <p>👤 <b>{book.user_name}</b></p>
          </div>

          {/* Upvote */}
          <button
            onClick={handleUpvote}
            className="btn btn-outline btn-info mt-6"
          >
            <ThumbsUp size={18} /> Upvote ({book.upvote})
          </button>
           {/* Reading Tracker */}
        <div className="my-6">
          <h3 className="text-lg font-semibold mb-2">📖 Reading Tracker</h3>
          <div className="flex items-center gap-4">
            {statusSteps.map((status, idx) => (
              <div key={status} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full ${
                    idx <= currentStatusIndex
                      ? "bg-secondary"
                      : "bg-base-300"
                  }`}
                ></div>
                <span
                  className={`text-sm ${
                    idx === currentStatusIndex ? "font-semibold text-primary" : "text-base-200"
                  }`}
                >
                  {status}
                </span>
                {idx < statusSteps.length - 1 && <span className="text-base-200">→</span>}
              </div>
            ))}
          </div>

          {/* Button to advance status */}
          {currentStatusIndex < statusSteps.length - 1 && (
              <button
                onClick={handleStatusUpdate}
                className="btn btn-sm btn-outline btn-primary mt-4"
              >
                Mark as {statusSteps[currentStatusIndex + 1]}
              </button>
            )}
        </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12 text-base-200">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare /> Reviews
        </h3>

        {/* Add / Edit */}
        <div className="mb-6">
          <textarea
            className="textarea textarea-bordered w-full bg-white text-base-200"
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
          />
          <button onClick={handleSubmitReview} className="btn btn-secondary mt-2">
            {editingReviewId ? "Update Review" : "Submit Review"}
          </button>
        </div>

        {/* Show all reviews */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-gray-200 p-4 rounded-md text-sm text-gray-800"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{review.user_email}</span>
                <span className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p>{review.review_text}</p>

              {/* Edit/Delete for own reviews */}
              {review.user_email === currentUser.email && (
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setReviewText(review.review_text);
                      setEditingReviewId(review._id);
                    }}
                    className="btn btn-xs btn-outline btn-info flex items-center gap-1"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="btn btn-xs btn-outline btn-error flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BookDetails;
