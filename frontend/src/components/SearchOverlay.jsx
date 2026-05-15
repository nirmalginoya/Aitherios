import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { X, Search as SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../context/StoreContext";
import { products as productApi } from "../lib/api";

const SearchOverlay = () => {
  const { searchOpen, setSearchOpen } = useStore();
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (searchOpen) {
      const fetchProducts = async () => {
        try {
          const res = await productApi.getAll();
          setProducts(res.data);
        } catch (err) {
          console.error("Failed to fetch search products", err);
        }
      };
      fetchProducts();
    }
  }, [searchOpen]);

  const results = useMemo(() => {
    if (!q.trim()) return products.slice(0, 4);
    const k = q.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(k) || p.drop?.toLowerCase().includes(k) || p.category?.includes(k)
    ).slice(0, 6);
  }, [q, products]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] bg-black/95 backdrop-blur-xl"
          data-testid="search-overlay"
        >
          <div className="flex items-center justify-between border-b border-[#262626] px-6 md:px-12 py-5">
            <div className="flex flex-1 items-center gap-4">
              <SearchIcon size={20} className="text-[#A3A3A3]" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products, drops..."
                className="w-full bg-transparent text-2xl md:text-4xl font-display uppercase tracking-wide outline-none placeholder:text-[#444]"
                data-testid="search-input"
              />
            </div>
            <button onClick={() => setSearchOpen(false)} data-testid="search-close" aria-label="Close"><X /></button>
          </div>
          <div className="px-6 md:px-12 py-10">
            <p className="font-mono-t text-[11px] uppercase tracking-[0.22em] text-[#A3A3A3]">
              {q ? `${results.length} Results` : "Featured"}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
              {results.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  onClick={() => setSearchOpen(false)}
                  className="group block"
                  data-testid={`search-result-${p.id}`}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-[#121212]">
                    <img src={p.images[0]} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-3 font-display text-sm md:text-base uppercase">{p.name}</p>
                  <p className="font-mono-t text-xs text-[#A3A3A3]">${p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
