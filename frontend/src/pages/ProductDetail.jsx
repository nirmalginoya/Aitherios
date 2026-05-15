import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Truck, RefreshCcw, Shield, Star } from "lucide-react";
import { products as productApi } from "../lib/api";
import { REVIEWS } from "../lib/mockData";
import ProductCard from "../components/ProductCard";
import { useStore } from "../context/StoreContext";
import NotFound from "./NotFound";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState("details");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const res = await productApi.getById(id);
        setProduct(res.data);
        setColor(res.data.colors[0]);
        
        // Fetch related products (simulated by fetching all and filtering for now)
        const allRes = await productApi.getAll();
        const similar = allRes.data.filter((p) => p.category === res.data.category && p.id !== res.data.id).slice(0, 4);
        setRelated(similar);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center font-mono-t text-xs uppercase tracking-widest">Accessing Archive...</div>;
  if (!product) return <NotFound />;
  const wished = wishlist.includes(product.id);

  const handleAdd = () => {
    if (!size) return alert("Pick a size first.");
    addToCart(product, size, color);
  };

  return (
    <div className="pt-24" data-testid="product-page">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1">
        {/* Gallery */}
        <div className="md:sticky md:top-20 md:h-[calc(100vh-5rem)] flex flex-col gap-1">
          <div className="flex-1 overflow-hidden bg-[#121212]">
            <motion.img
              key={active}
              src={product.images[active]}
              alt={product.name}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-1">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`aspect-square overflow-hidden border ${active === i ? "border-[#FF0000]" : "border-[#262626]"}`}
                data-testid={`thumb-${i}`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="px-6 md:px-12 py-10 md:py-16">
          <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">{product.drop}</p>
          <h1 className="mt-2 font-display text-5xl md:text-7xl uppercase leading-[0.9]">{product.name}</h1>
          <div className="mt-4 flex items-center gap-4">
            <p className="font-mono-t text-xl">${product.price}</p>
            <span className="text-[#A3A3A3] font-mono-t text-[11px] uppercase tracking-[0.22em]">SKU {product.sku}</span>
          </div>
          <p className="mt-6 text-[#A3A3A3] max-w-prose">{product.description}</p>

          <div className="mt-8 space-y-6">
            <div>
              <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] mb-3">Color — {color}</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`h-10 px-4 border font-mono-t text-[11px] uppercase tracking-[0.22em] transition ${
                      color === c ? "bg-white text-black border-white" : "border-[#262626] hover:border-white"
                    }`}
                    data-testid={`color-${c}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono-t text-[11px] uppercase tracking-[0.25em]">Size</p>
                <button className="link-underline font-mono-t text-[10px] uppercase tracking-[0.22em] text-[#A3A3A3]">Size Guide</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-11 border font-mono-t text-xs transition ${
                      size === s ? "bg-[#FF0000] border-[#FF0000] text-white" : "border-[#262626] hover:border-white"
                    }`}
                    data-testid={`size-${s}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button onClick={handleAdd} className="btn-primary solid w-full" data-testid="add-to-cart">
              Add to Bag — ${product.price}
            </button>
            <button onClick={() => toggleWishlist(product.id)} className="btn-primary" data-testid="add-to-wishlist">
              <Heart size={14} fill={wished ? "#FF0000" : "transparent"} stroke={wished ? "#FF0000" : "currentColor"} />
              {wished ? "Saved" : "Save"}
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#262626] pt-8">
            <Perk icon={<Truck size={18} />} title="Free Ship" sub="Over $200" />
            <Perk icon={<RefreshCcw size={18} />} title="30 Day" sub="Returns" />
            <Perk icon={<Shield size={18} />} title="Authentic" sub="Guaranteed" />
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <div className="flex gap-6 border-b border-[#262626]">
              {["details", "fabric", "reviews"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-3 font-mono-t text-[11px] uppercase tracking-[0.22em] border-b-2 transition ${
                    tab === t ? "border-[#FF0000] text-white" : "border-transparent text-[#A3A3A3] hover:text-white"
                  }`}
                  data-testid={`tab-${t}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="py-6 text-sm text-[#A3A3A3] space-y-3">
              {tab === "details" && (
                <ul className="space-y-2">
                  <li>• {product.description}</li>
                  <li>• Fit: {product.fit}</li>
                  <li>• Stock: {product.stock} units</li>
                  <li>• Made in micro-batches</li>
                </ul>
              )}
              {tab === "fabric" && <p>{product.fabric}. Garment-dyed in a closed-loop facility. Hand-finished and inspected before shipping.</p>}
              {tab === "reviews" && (
                <div className="space-y-4">
                  {REVIEWS.map((r, i) => (
                    <div key={i} className="border border-[#262626] p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-mono-t text-[11px] uppercase tracking-[0.22em] text-white">{r.user}</p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={12} fill="#FF0000" stroke="#FF0000" />)}
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{r.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// You may also like</p>
        <h3 className="font-display text-4xl md:text-5xl uppercase mt-2 mb-10">Pair It With</h3>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </div>
  );
};

const Perk = ({ icon, title, sub }) => (
  <div className="flex flex-col items-start">
    <div className="text-[#FF0000]">{icon}</div>
    <p className="font-mono-t text-xs uppercase tracking-[0.22em] mt-2">{title}</p>
    <p className="font-mono-t text-[10px] uppercase tracking-[0.22em] text-[#A3A3A3]">{sub}</p>
  </div>
);

export default ProductDetail;
