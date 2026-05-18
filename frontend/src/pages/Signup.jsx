import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { toast } from "sonner";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
  const [data, setData] = useState({ email: "", name: "", pwd: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useStore();
  const nav = useNavigate();
  
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.pwd || !data.name) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const nameParts = data.name.trim().split(" ");
      const firstName = nameParts[0] || "User";
      const lastName = nameParts.slice(1).join(" ") || "Member";
      
      const res = await register({ 
        email: data.email, 
        password: data.pwd, 
        firstName, 
        lastName 
      });

      if (res) {
        toast.success("Welcome to Aitherios!");
        nav("/account");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#050505] overflow-hidden" data-testid="signup-page">
      {/* Dynamic Background Effects */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl uppercase tracking-wider text-white">Create Account</h1>
            <p className="text-gray-400 mt-2 text-sm font-medium tracking-wide">Join the exclusive collective</p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-medium ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text"
                  className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-white/20 focus:bg-[#222] transition-all placeholder:text-gray-600"
                  placeholder="John Doe"
                  value={data.name} 
                  onChange={set("name")} 
                  data-testid="signup-name"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-medium ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email"
                  className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-white/20 focus:bg-[#222] transition-all placeholder:text-gray-600"
                  placeholder="name@example.com"
                  value={data.email} 
                  onChange={set("email")} 
                  data-testid="signup-email"
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
                  value={data.pwd} 
                  onChange={set("pwd")} 
                  data-testid="signup-password"
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                disabled={isLoading}
                className="w-full bg-white text-black font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 group"
                data-testid="signup-submit"
              >
                {isLoading ? "Creating..." : "Create Account"}
                {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500 font-medium">
            Already a member?{" "}
            <Link to="/login" className="text-white hover:text-gray-300 transition-colors underline decoration-white/30 underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
