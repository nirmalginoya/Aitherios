import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/drops", label: "Drops" },
  { to: "/lookbook", label: "Lookbook" },
];

const Navbar = () => {
  const { totals, setCartOpen, setSearchOpen, wishlist, user } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/70 backdrop-blur-xl border-b border-[#262626]" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <button
          className="md:hidden text-white"
          onClick={() => setMobile(true)}
          aria-label="Menu"
          data-testid="nav-mobile-open"
        >
          <Menu size={22} />
        </button>
        <Link to="/" className="font-display text-2xl md:text-3xl uppercase tracking-[0.18em]" data-testid="nav-logo">
          Aitherios
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={`nav-${n.label.toLowerCase()}`}
              className={({ isActive }) =>
                `link-underline font-mono-t text-xs uppercase tracking-[0.22em] transition-colors ${
                  isActive ? "text-white" : "text-[#A3A3A3] hover:text-white"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4 md:gap-5">
          <button onClick={() => setSearchOpen(true)} aria-label="Search" data-testid="nav-search" className="text-white/80 hover:text-white">
            <Search size={18} />
          </button>
          <Link to="/wishlist" aria-label="Wishlist" data-testid="nav-wishlist" className="relative text-white/80 hover:text-white">
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center bg-[#FF0000] font-mono-t text-[9px] text-white">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to={user ? "/account" : "/login"} aria-label="Account" data-testid="nav-account" className="text-white/80 hover:text-white">
            <User size={18} />
          </Link>
          <button onClick={() => setCartOpen(true)} aria-label="Cart" data-testid="nav-cart" className="relative text-white/80 hover:text-white">
            <ShoppingBag size={18} />
            {totals.count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center bg-[#FF0000] font-mono-t text-[9px] text-white">
                {totals.count}
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black"
            data-testid="mobile-menu"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626]">
              <span className="font-display text-2xl uppercase tracking-[0.18em]">Aitherios</span>
              <button onClick={() => setMobile(false)} aria-label="Close" data-testid="nav-mobile-close"><X /></button>
            </div>
            <div className="flex flex-col gap-6 px-6 py-10">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <NavLink onClick={() => setMobile(false)} to={n.to} className="font-display text-5xl uppercase">
                    {n.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
