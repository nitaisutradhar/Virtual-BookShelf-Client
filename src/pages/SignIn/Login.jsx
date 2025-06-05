// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Smile } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Placeholder login logic (replace with Firebase later)
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "test@email.com" && password === "Test123") {
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back to Virtual Bookshelf 📚",
        confirmButtonColor: "#06B6D4",
      }).then(() => navigate("/"));
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password.",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  const handleGoogleLogin = () => {
    Swal.fire({
      icon: "info",
      title: "Google Login",
      text: "Google Login integration coming soon...",
      confirmButtonColor: "#38BDF8",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[85vh] bg-background"
    >
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <div className="text-center">
            <Smile size={48} className="text-primary mb-2" />
            <h2 className="text-2xl font-bold text-primary">Login to Your Shelf</h2>
            <p className="text-sm text-gray-500">Welcome back! Please enter your credentials.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 mt-6">
            {/* Email */}
            <div className="form-control">
              <label className="label text-sm font-medium text-textDark">Email</label>
              <div className="flex items-center border rounded px-3 py-2 bg-background border-base-300">
                <Mail className="w-5 h-5 text-secondary mr-2" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="bg-transparent flex-1 outline-none text-gray-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label text-sm font-medium text-textDark">Password</label>
              <div className="flex items-center border rounded px-3 py-2 bg-background border-base-300">
                <Lock className="w-5 h-5 text-secondary mr-2" />
                <input
                  type="password"
                  required
                  placeholder="Your password"
                  className="bg-transparent flex-1 outline-none text-gray-900"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full">
              <LogIn className="w-4 h-4 mr-2" /> Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-gray-800">OR</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full text-secondary border-secondary hover:bg-secondary hover:text-white transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="mt-4 text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-info hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
