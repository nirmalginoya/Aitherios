import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import SearchOverlay from "./SearchOverlay";
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
  const location = useLocation();
  return (
    <div className="grain min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
    </div>
  );
};

export default Layout;
