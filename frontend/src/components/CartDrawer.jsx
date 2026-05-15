import React from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = () => {
  const { cartOpen, setCartOpen, cart, removeFromCart, updateQty, totals } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.65, 0, 0.35, 1], duration: 0.55 }}
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col border-l border-[#262626] bg-[#0A0A0A]"
            data-testid="cart-drawer"
          >
            <div className="flex items-center justify-between border-b border-[#262626] px-6 py-5">
              <div>
                <p className="font-mono-t text-[11px] uppercase tracking-[0.22em] text-[#A3A3A3]">Bag</p>
                <h2 className="font-display text-2xl uppercase">{totals.count} Items</h2>
              </div>
              <button onClick={() => setCartOpen(false)} aria-label="Close" data-testid="cart-close"><X /></button>
            </div>

            <div className="flex-1 overflow-y-auto divider-y">
              {cart.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                  <p className="font-display text-3xl uppercase">Empty.</p>
                  <p className="text-sm text-[#A3A3A3]">Nothing in your bag yet.</p>
                  <Link to="/shop" onClick={() => setCartOpen(false)} className="btn-primary solid mt-4">
                    Start Shopping
                  </Link>
                </div>
              )}
              {cart.map((i) => (
                <div key={i.key} className="flex gap-4 p-5" data-testid={`cart-item-${i.id}`}>
                  <img src={i.image} alt={i.name} className="h-28 w-24 object-cover" />
                  <div className="flex-1">
                    <p className="font-display text-base uppercase">{i.name}</p>
                    <p className="font-mono-t text-[11px] uppercase tracking-widest text-[#A3A3A3] mt-1">
                      {i.size} / {i.color}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <button onClick={() => updateQty(i.key, i.qty - 1)} className="grid h-7 w-7 place-items-center border border-[#262626] hover:border-white" aria-label="Decrease"><Minus size={12} /></button>
                      <span className="font-mono-t text-sm">{i.qty}</span>
                      <button onClick={() => updateQty(i.key, i.qty + 1)} className="grid h-7 w-7 place-items-center border border-[#262626] hover:border-white" aria-label="Increase"><Plus size={12} /></button>
                      <button onClick={() => removeFromCart(i.key)} className="ml-auto text-[#A3A3A3] hover:text-[#FF0000]" aria-label="Remove"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <p className="font-mono-t text-sm">${(i.price * i.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#262626] p-6 space-y-3">
                <Row label="Subtotal" value={`$${totals.subtotal.toFixed(2)}`} />
                <Row label="Shipping" value={totals.shipping ? `$${totals.shipping}` : "Free"} />
                <Row label="Tax" value={`$${totals.tax.toFixed(2)}`} />
                <div className="flex items-baseline justify-between border-t border-[#262626] pt-4">
                  <p className="font-display text-2xl uppercase">Total</p>
                  <p className="font-display text-2xl">${totals.total.toFixed(2)}</p>
                </div>
                <Link to="/checkout" onClick={() => setCartOpen(false)} className="btn-primary solid w-full mt-4" data-testid="cart-checkout">
                  Checkout
                </Link>
                <Link to="/cart" onClick={() => setCartOpen(false)} className="btn-primary w-full" data-testid="cart-view">
                  View Cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

const Row = ({ label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-[#A3A3A3] font-mono-t text-xs uppercase tracking-[0.2em]">{label}</span>
    <span className="font-mono-t">{value}</span>
  </div>
);

export default CartDrawer;
