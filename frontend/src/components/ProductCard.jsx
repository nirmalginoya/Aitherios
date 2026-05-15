import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { motion } from "framer-motion";

const ProductCard = ({ product, index = 0 }) => {
  const { wishlist, toggleWishlist } = useStore();
  const wished = wishlist.includes(product.id);
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.65, 0, 0.35, 1] }}
      className="group relative flex flex-col"
      data-testid={`product-card-${product.id}`}
    >
      <Link to={`/product/${product.id}`} className="relative block aspect-[3/4] overflow-hidden bg-[#121212]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
        <img
          src={product.images[1] || product.images[0]}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {product.new && (
          <span className="absolute left-4 top-4 bg-[#FF0000] px-2 py-1 font-mono-t text-[10px] uppercase tracking-widest text-white">
            New
          </span>
        )}
        {product.stock <= 5 && (
          <span className="absolute right-4 top-4 border border-white/40 bg-black/60 px-2 py-1 font-mono-t text-[10px] uppercase tracking-widest text-white backdrop-blur">
            Low Stock
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute right-4 bottom-4 grid h-10 w-10 place-items-center border border-white/30 bg-black/40 text-white backdrop-blur transition hover:border-[#FF0000] hover:text-[#FF0000]"
          aria-label="Toggle wishlist"
          data-testid={`wishlist-toggle-${product.id}`}
        >
          <Heart size={16} fill={wished ? "#FF0000" : "transparent"} stroke={wished ? "#FF0000" : "currentColor"} />
        </button>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono-t text-[10px] uppercase tracking-[0.2em] text-[#A3A3A3]">{product.drop}</p>
          <Link to={`/product/${product.id}`} className="link-underline mt-1 inline-block font-display text-lg uppercase tracking-wide">
            {product.name}
          </Link>
        </div>
        <p className="font-mono-t text-sm">${product.price}</p>
      </div>
    </motion.article>
  );
};

export default ProductCard;
