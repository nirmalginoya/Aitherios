import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useStore();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !pwd) {
      toast.error("Please enter email and password");
      return;
    }
    setIsLoading(true);
    try {
      const res = await login({ email, password: pwd });
      if (res) {
        toast.success("Signed in successfully");
        nav("/account");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#050505] overflow-hidden" data-testid="login-page">
      {/* Dynamic Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl uppercase tracking-wider text-white">Welcome Back</h1>
            <p className="text-gray-400 mt-2 text-sm font-medium tracking-wide">Enter your credentials to continue</p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-medium ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email"
                  className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-white/20 focus:bg-[#222] transition-all placeholder:text-gray-600"
                  placeholder="name@example.com"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  data-testid="login-email"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-medium ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="password"
                  className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-white/20 focus:bg-[#222] transition-all placeholder:text-gray-600"
                  placeholder="••••••••"
                  value={pwd} 
                  onChange={(e) => setPwd(e.target.value)} 
                  data-testid="login-password"
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                disabled={isLoading}
                className="w-full bg-white text-black font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 group"
                data-testid="login-submit"
              >
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500 font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="text-white hover:text-gray-300 transition-colors underline decoration-white/30 underline-offset-4">
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
