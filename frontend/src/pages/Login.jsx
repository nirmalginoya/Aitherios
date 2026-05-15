import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { login } = useStore();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !pwd) return;
    try {
      await login({ email, password: pwd });
      nav("/account");
    } catch (err) {
      alert("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="pt-28 pb-24 grid md:grid-cols-2 min-h-[80vh]" data-testid="login-page">
      <div className="hidden md:block bg-[#0E0E0E] relative overflow-hidden">
        <img src="https://static.prod-images.emergentagent.com/jobs/26a36313-2740-4e70-83dd-9e41e39ac3a9/images/43e52943e50bf42a07a2701952455f614a7d35e5b526a5d537bcee1981fcd07c.png" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
        <div className="absolute bottom-12 left-12">
          <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// Members</p>
          <h2 className="font-display text-7xl uppercase leading-[0.9] mt-2">Welcome<br/>Back.</h2>
        </div>
      </div>
      <div className="px-6 md:px-16 py-12 max-w-xl">
        <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// Sign In</p>
        <h1 className="font-display text-5xl uppercase mt-2">Login</h1>
        <form onSubmit={submit} className="mt-10 space-y-4">
          <input className="fld-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="login-email" />
          <input type="password" className="fld-input" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} data-testid="login-password" />
          <button className="btn-primary solid w-full" data-testid="login-submit">Sign In</button>
        </form>
        <p className="mt-8 text-sm text-[#A3A3A3]">
          New here? <Link to="/signup" className="link-underline text-white">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
