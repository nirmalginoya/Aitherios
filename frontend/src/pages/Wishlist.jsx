import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { products as productApi } from "../lib/api";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { wishlist } = useStore();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await productApi.getAll();
        const saved = res.data.filter((p) => wishlist.includes(p.id));
        setItems(saved);
      } catch (err) {
        console.error("Failed to fetch wishlist items", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [wishlist]);

  if (loading) return <div className="pt-28 px-6 md:px-12 font-mono-t text-xs uppercase tracking-widest text-[#A3A3A3]">Accessing Saved Files...</div>;
  return (
    <div className="pt-28 pb-24 px-6 md:px-12" data-testid="wishlist-page">
      <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// Saved</p>
      <h1 className="font-display text-6xl md:text-[10vw] leading-[0.9] uppercase mt-2">Wishlist</h1>

      {items.length === 0 ? (
        <div className="mt-16 border border-[#262626] py-24 text-center">
          <p className="font-display text-4xl uppercase">Empty.</p>
          <p className="text-[#A3A3A3] mt-2">Tap the heart on any product to save it.</p>
          <Link to="/shop" className="btn-primary solid mt-8 inline-flex">Browse Shop</Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
