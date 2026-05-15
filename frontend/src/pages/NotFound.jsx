import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="pt-28 pb-24 px-6 md:px-12 min-h-[80vh] flex flex-col justify-center" data-testid="not-found">
    <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#FF0000]">// Error 404</p>
    <h1 className="font-display text-[28vw] md:text-[18vw] leading-[0.86] uppercase mt-2">
      <span className="glitch" data-text="404">404</span>
    </h1>
    <p className="mt-6 max-w-md text-[#A3A3A3]">This page slipped through the cracks. Try the shop or head back home.</p>
    <div className="mt-8 flex gap-4">
      <Link to="/" className="btn-primary solid">Home</Link>
      <Link to="/shop" className="btn-primary">Shop</Link>
    </div>
  </div>
);

export default NotFound;
