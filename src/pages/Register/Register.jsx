import { useState } from "react";
import { useNavigate, Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, Lock, SmilePlus, Image, UserPlus, EyeOff, Eye } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { createUser, setUser, updateUser } = useAuth();
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLong = password.length >= 6;

    if (!hasUpper) {
      showToast("Password must include an uppercase letter", "warning");
      return false;
    }
    if (!hasLower) {
      showToast("Password must include a lowercase letter", "warning");
      return false;
    }
    if (!isLong) {
      showToast("Password must be at least 6 characters", "warning");
      return false;
    }
    return true;
  };

  const showToast = (msg, icon = "error") => {
    Swal.fire({
      toast: true,
      icon,
      title: msg,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: "#F1F5F9",
      color: "#1E293B",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;
    if (!validatePassword(formData.password)) return;

    // Firebase Authentication
    createUser(email, password).then(() => {
      updateUser({ displayName: name, photoURL: photoURL }).then(() => {
        setUser({ ...name, displayName: name, photoURL: photoURL });
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: `Welcome, ${formData.name}!`,
          confirmButtonColor: "#06B6D4",
        }).then(() => navigate("/login"));
      })
      .catch((error) => {
        showToast(error.message, "error");
      });
    })
    .catch((error) => {
      showToast(error.message, "error")
    });
  };

  const handleGoogleSignUp = () => {
    showToast("Google Sign Up coming soon!", "info");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center my-5 min-h-[85vh] bg-background"
    >
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <div className="text-center">
            <SmilePlus size={48} className="text-primary mb-2" />
            <h2 className="text-2xl font-bold text-primary">Create Account</h2>
            <p className="text-sm text-gray-500">
              Join Virtual Bookshelf today!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6 text-neutral">
            {/* Name */}
            <div className="form-control">
              <label className="label text-sm font-medium">Name</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className="border border-base-300 rounded input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label text-sm font-medium">Email</label>
              <div className="flex items-center border rounded px-3 py-2 bg-background border-base-300">
                <Mail className="w-5 h-5 text-secondary mr-2" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="bg-transparent flex-1 outline-none"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label text-sm font-medium">Photo URL</label>
              <div className="flex items-center border rounded px-3 py-2 bg-background border-base-300">
                <Image className="w-5 h-5 text-secondary mr-2" />
                <input
                  name="photo"
                  type="url"
                  placeholder="https://your-avatar.jpg"
                  className="bg-transparent flex-1 outline-none"
                  value={formData.photo}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label text-sm font-medium">Password</label>
              <div className="relative flex items-center border rounded px-3 py-2 bg-background border-base-300">
                <Lock className="w-5 h-5 text-secondary mr-2" />
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="Your password"
                  className="bg-transparent flex-1 outline-none"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              </div>
              <small className="text-xs text-gray-500 mt-1">
                Must be at least 6 characters, include uppercase & lowercase.
              </small>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full">
              <UserPlus className="w-4 h-4 mr-2" /> Register
            </button>
          </form>

          <div className="divider text-neutral">OR</div>

          {/* Google Button */}
          <button
            onClick={handleGoogleSignUp}
            className="btn btn-outline w-full text-secondary border-secondary hover:bg-secondary hover:text-white transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign Up with Google
          </button>

          <p className="mt-4 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-info hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
