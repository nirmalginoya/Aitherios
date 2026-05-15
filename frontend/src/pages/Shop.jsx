import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { products as productApi } from "../lib/api";
import { CATEGORIES as MOCK_CATEGORIES, SIZES, COLORS } from "../lib/mockData";
import ProductCard from "../components/ProductCard";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "Newest" },
  { id: "price-asc", label: "Price: Low → High" },
  { id: "price-desc", label: "Price: High → Low" },
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(MOCK_CATEGORIES); // Default to mock, override if API exists
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState("all");
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(500);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productApi.getAll();
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let out = [...products];
    if (cat !== "all") out = out.filter((p) => p.category === cat);
    if (size) out = out.filter((p) => p.sizes.includes(size));
    if (color) out = out.filter((p) => p.colors.includes(color));
    out = out.filter((p) => p.price <= maxPrice);
    if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
    if (sort === "new") out.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
    return out;
  }, [products, cat, size, color, sort, maxPrice]);

  return (
    <div className="pt-28" data-testid="shop-page">
      <header className="px-6 md:px-12 pb-10 border-b border-[#262626]">
        <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// Collection</p>
        <h1 className="font-display text-6xl md:text-[10vw] leading-[0.9] uppercase mt-2">All Pieces</h1>
        <p className="mt-4 text-sm text-[#A3A3A3]">{filtered.length} products</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-0">
        {/* Filters */}
        <aside className="border-b md:border-b-0 md:border-r border-[#262626] p-6 md:p-8 sticky md:top-20 md:h-fit space-y-8" data-testid="shop-filters">
          <Group title="Category">
            <div className="flex flex-wrap md:flex-col gap-2">
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCat(c.slug)}
                  className={`text-left font-mono-t text-[11px] uppercase tracking-[0.22em] py-2 px-3 border border-[#262626] transition ${
                    cat === c.slug ? "bg-[#FF0000] border-[#FF0000] text-white" : "hover:border-white"
                  }`}
                  data-testid={`filter-cat-${c.slug}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </Group>
          <Group title="Size">
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(size === s ? null : s)}
                  className={`h-9 w-9 border text-xs font-mono-t transition ${
                    size === s ? "bg-white text-black border-white" : "border-[#262626] hover:border-white"
                  }`}
                  data-testid={`filter-size-${s}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Group>
          <Group title="Color">
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(color === c.name ? null : c.name)}
                  className={`relative h-9 w-9 border-2 transition ${
                    color === c.name ? "border-white" : "border-[#262626]"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  data-testid={`filter-color-${c.name.toLowerCase()}`}
                />
              ))}
            </div>
          </Group>
          <Group title={`Max Price: $${maxPrice}`}>
            <input
              type="range" min="40" max="200" value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
              className="w-full accent-[#FF0000]"
              data-testid="filter-price"
            />
          </Group>
          <button
            onClick={() => { setCat("all"); setSize(null); setColor(null); setMaxPrice(200); }}
            className="font-mono-t text-[11px] uppercase tracking-[0.22em] text-[#A3A3A3] hover:text-[#FF0000]"
            data-testid="filter-reset"
          >
            Reset filters
          </button>
        </aside>

        {/* Grid */}
        <div className="p-6 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <p className="font-mono-t text-[11px] uppercase tracking-[0.22em] text-[#A3A3A3]">
              Showing {filtered.length} items
            </p>
            <div className="relative">
              <select
                value={sort} onChange={(e) => setSort(e.target.value)}
                className="appearance-none border border-[#262626] bg-transparent pr-8 pl-4 py-2 font-mono-t text-[11px] uppercase tracking-[0.22em] hover:border-white"
                data-testid="shop-sort"
              >
                {SORTS.map((s) => <option key={s.id} value={s.id} className="bg-black">{s.label}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-display text-4xl uppercase">No matches.</p>
              <p className="text-[#A3A3A3] mt-2">Try adjusting your filters.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const Group = ({ title, children }) => (
  <div>
    <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-white mb-4">{title}</p>
    {children}
  </div>
);

export default Shop;
