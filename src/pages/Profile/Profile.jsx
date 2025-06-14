import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { UserCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const COLORS = ["#6366F1", "#22D3EE", "#F59E0B", "#EF4444", "#10B981"];

const Profile = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    if (user?.email) {
      axiosSecure(`/my-books/${user.email}`)
          .then((res) => {
            setBooks(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, [user?.email,axiosSecure]);

  const categoryCounts = books.reduce((acc, book) => {
    acc[book.book_category] = (acc[book.book_category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
  }));

  console.log(chartData)
    // Total upvotes
  const totalUpvotes = books.reduce((sum, book) => sum + (book.upvote || 0), 0);

  // Most upvoted book
  const mostUpvotedBook = books.reduce((prev, current) =>
    (current.upvote || 0) > (prev.upvote || 0) ? current : prev,
    { upvote: 0 }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-4 py-12"
    >
      {/* User Info Section */}
      <div className="bg-base-100 shadow-md p-6 rounded-xl flex items-center gap-6 mb-10">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-secondary"
          />
        ) : (
          <UserCircle size={80} className="text-secondary" />
        )}

        <div className="text-base-200">
          <h2 className="text-2xl font-bold text-primary">{user?.displayName}</h2>
          <p className="text-sm text-textDark">{user?.email}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-base-100 p-6 shadow-md rounded-xl">
          <h3 className="text-xl font-semibold text-primary mb-4">Books by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Book Summary */}
        <div className="bg-base-100 p-6 shadow-md rounded-xl text-base-200">
          <h3 className="text-xl font-semibold text-primary mb-4">Bookshelf Summary</h3>
          <p className="text-lg font-medium">📚 Total Books: {books.length}</p>
          <p className="text-lg font-medium mt-2">👍 Total Upvotes: {totalUpvotes}</p>

          {mostUpvotedBook?.book_title && (
            <div className="mt-4 p-4 bg-base-200 text-base-content rounded-lg text-sm">
              🌟 <strong>Most Upvoted Book:</strong>
              <p className="mt-1">
                <span className="font-semibold">{mostUpvotedBook.book_title}</span> with{" "}
                <span className="text-secondary font-semibold">{mostUpvotedBook.upvote}</span>{" "}
                upvotes
              </p>
            </div>
          )}

          <div className="mt-4 space-y-2">
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <div key={cat} className="flex justify-between border-b py-1">
                <span className="capitalize">{cat}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
