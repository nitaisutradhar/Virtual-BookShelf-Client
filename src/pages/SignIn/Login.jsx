import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Smile, EyeOff, Eye } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Firebase Login
  const { signIn, googleSignIn } = use(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back to Virtual Bookshelf 📚",
          confirmButtonColor: "#06B6D4",
        }).then(() => navigate(`${location.state ? location.state : "/"}`));
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: `Invalid email or password - ${errorMessage}`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
        .then(() => {
          Swal.fire({
              icon: 'info',
          title: 'Login Successful!',
          text: 'Google Login integration coming soon...',
          showConfirmButton: false,
          timer: 2000,
            });
    
          navigate(`${location.state ? location.state : "/"}`)
      })
      .catch(error=>{
        Swal.fire({
              toast: true,
              icon : "error",
              title: error,
              position: "top-end",
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
              background: "#F1F5F9",
              color: "#1E293B",
            });
      })
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
            <h2 className="text-2xl font-bold text-primary">
              Login to Your Shelf
            </h2>
            <p className="text-sm text-gray-500">
              Welcome back! Please enter your credentials.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 mt-6">
            {/* Email */}
            <div className="form-control">
              <label className="label text-sm font-medium text-textDark">
                Email
              </label>
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
              <label className="label text-sm font-medium text-textDark">
                Password
              </label>
              <div className="relative flex items-center border rounded px-3 py-2 bg-background border-base-300">
                <Lock className="w-5 h-5 text-secondary mr-2" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="Your password"
                  className="bg-transparent flex-1 outline-none text-gray-900"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
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
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
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
