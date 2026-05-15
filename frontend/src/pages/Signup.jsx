import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const Signup = () => {
  const [data, setData] = useState({ email: "", name: "", pwd: "" });
  const { register } = useStore();
  const nav = useNavigate();
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.pwd) return;
    try {
      const nameParts = data.name.trim().split(" ");
      const firstName = nameParts[0] || "User";
      const lastName = nameParts.slice(1).join(" ") || "Member";
      
      await register({ 
        email: data.email, 
        password: data.pwd, 
        firstName, 
        lastName 
      });
      nav("/account");
    } catch (err) {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="pt-28 pb-24 grid md:grid-cols-2 min-h-[80vh]" data-testid="signup-page">
      <div className="px-6 md:px-16 py-12 max-w-xl">
        <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// New Member</p>
        <h1 className="font-display text-5xl uppercase mt-2">Sign Up</h1>
        <form onSubmit={submit} className="mt-10 space-y-4">
          <input className="fld-input" placeholder="Full Name" value={data.name} onChange={set("name")} data-testid="signup-name" />
          <input className="fld-input" placeholder="Email" value={data.email} onChange={set("email")} data-testid="signup-email" />
          <input type="password" className="fld-input" placeholder="Password" value={data.pwd} onChange={set("pwd")} data-testid="signup-password" />
          <button className="btn-primary solid w-full" data-testid="signup-submit">Create Account</button>
        </form>
        <p className="mt-8 text-sm text-[#A3A3A3]">
          Already a member? <Link to="/login" className="link-underline text-white">Sign in</Link>
        </p>
      </div>
      <div className="hidden md:block bg-[#0E0E0E] relative overflow-hidden">
        <img src="https://images.pexels.com/photos/16376546/pexels-photo-16376546.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/30 to-transparent" />
        <div className="absolute bottom-12 right-12 text-right">
          <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// Members get</p>
          <h2 className="font-display text-6xl uppercase leading-[0.9] mt-2">Early<br/>Access.</h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
