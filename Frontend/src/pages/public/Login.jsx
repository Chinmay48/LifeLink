import { useState } from "react";
import { motion, AnimatePresence, time } from "framer-motion";
import img1 from "../../assets/images/login-img1.png";
import img2 from "../../assets/images/login-img2.png";
import img3 from "../../assets/images/login-img3.png";
import { useEffect } from "react";
import { HeartHandshake, Hospital, FolderCode } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
const images = [img1, img2, img3];

const icons = [HeartHandshake, Hospital, FolderCode];

const Login = () => {
  const [index, setIndex] = useState(0);
  const { handleLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex min-h-screen bg-white font-sans selection:bg-orange-100">
      {/* LEFT SIDE: Visual / Story (60%) */}
      <div className="relative hidden w-[60%] lg:flex flex-col overflow-hidden bg-gray-950">
        {/* The Moving Gallery */}
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="relative z-10 flex h-full flex-col justify-between p-16 text-white">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl font-extrabold leading-[1.1] tracking-tight">
                Connecting Donors. <br />
                <span className="text-orange-500 italic">Saving Lives.</span>
              </h1>
              <div className="mt-8 space-y-4 text-xl text-gray-300">
                <p className="font-semibold text-orange-400">
                  Every second matters.
                </p>
                <p className="leading-relaxed">
                  Your contribution can give someone a second chance. Join our
                  community of heroes today.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Impact Stats Section */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { text: "12,000+ lives impacted", delay: 0.2 },
              { text: "300+ hospitals connected", delay: 0.4 },
              { text: "Real-time matching system", delay: 0.6 },
            ].map((stat, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: stat.delay }}
                  className="flex items-center space-x-3 group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 border border-orange-500/50 group-hover:bg-orange-500 transition-colors duration-300">
                    <span className="text-orange-500 hover:text-white group-hover:text-white text-sm">
                      {" "}
                      {<Icon />}{" "}
                    </span>
                  </div>
                  <span className="text-sm font-medium tracking-wide uppercase">
                    {stat.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form (40%) */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-[40%] xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Please sign in to your dashboard
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 outline-none"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-gray-600 group-hover:text-gray-900 transition-colors">
                  Keep me signed in
                </span>
              </label>
              <a
                href="#"
                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Forgot?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full rounded-lg bg-orange-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-600 hover:shadow-orange-300 transition-all focus:ring-4 focus:ring-orange-500/30"
            >
              Sign In to Account
            </motion.button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              Not a member yet?{" "}
              <a
                href="#"
                className="font-bold text-orange-600 hover:underline decoration-2 underline-offset-4"
              >
                Register now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
