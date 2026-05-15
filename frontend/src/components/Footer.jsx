import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-[#262626] bg-black text-white" data-testid="footer">
      <div className="grid grid-cols-1 gap-12 px-6 md:px-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-5xl md:text-7xl uppercase tracking-tight leading-[0.9]">
            Subscribe.<br/>Or get left.
          </h3>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex max-w-md items-center border-b border-white"
          >
            <input
              type="email"
              placeholder="your@email"
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-[#666] uppercase tracking-[0.18em]"
              data-testid="newsletter-input"
            />
            <button type="submit" className="font-mono-t text-xs uppercase tracking-[0.22em] py-3 pl-4 hover:text-[#FF0000]" data-testid="newsletter-submit">
              Submit
            </button>
          </form>
        </div>
        <div>
          <p className="font-mono-t text-xs uppercase tracking-[0.22em] text-[#A3A3A3]">Shop</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/shop" className="link-underline">All Products</Link></li>
            <li><Link to="/drops" className="link-underline">Drops</Link></li>
            <li><Link to="/lookbook" className="link-underline">Lookbook</Link></li>
            <li><Link to="/wishlist" className="link-underline">Wishlist</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono-t text-xs uppercase tracking-[0.22em] text-[#A3A3A3]">Support</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a className="link-underline" href="#shipping">Shipping</a></li>
            <li><a className="link-underline" href="#returns">Returns</a></li>
            <li><a className="link-underline" href="#sizing">Sizing</a></li>
            <li><a className="link-underline" href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t border-[#262626] px-6 md:px-12 py-6 md:flex-row md:items-center md:justify-between">
        <p className="font-mono-t text-[11px] uppercase tracking-[0.22em] text-[#A3A3A3]">
          © {new Date().getFullYear()} Aitherios. Built for the after-hours.
        </p>
        <div className="flex items-center gap-6 text-[#A3A3A3]">
          <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={16} /></a>
          <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter size={16} /></a>
          <a href="#" aria-label="Youtube" className="hover:text-white"><Youtube size={16} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
