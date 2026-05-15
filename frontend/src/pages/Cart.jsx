import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "../context/StoreContext";

const Cart = () => {
  const { cart, removeFromCart, updateQty, totals } = useStore();
  return (
    <div className="pt-28 pb-24 px-6 md:px-12" data-testid="cart-page">
      <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// Your Bag</p>
      <h1 className="font-display text-6xl md:text-[8vw] leading-[0.9] uppercase mt-2">Bag</h1>

      {cart.length === 0 ? (
        <div className="py-32 text-center border border-[#262626] mt-12">
          <p className="font-display text-4xl uppercase">Nothing here.</p>
          <p className="text-[#A3A3A3] mt-2">Start adding pieces.</p>
          <Link to="/shop" className="btn-primary solid mt-8 inline-flex">Browse Shop</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-12 mt-12">
          <div className="divider-y border-y border-[#262626]">
            {cart.map((i) => (
              <div key={i.key} className="grid grid-cols-[120px_1fr_auto] gap-6 py-6" data-testid={`cart-row-${i.id}`}>
                <img src={i.image} className="h-40 w-32 object-cover" alt={i.name} />
                <div>
                  <p className="font-display text-2xl uppercase">{i.name}</p>
                  <p className="font-mono-t text-[11px] uppercase tracking-[0.22em] text-[#A3A3A3] mt-2">{i.size} / {i.color}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <button onClick={() => updateQty(i.key, i.qty - 1)} className="grid h-8 w-8 place-items-center border border-[#262626] hover:border-white"><Minus size={12} /></button>
                    <span className="font-mono-t text-sm w-6 text-center">{i.qty}</span>
                    <button onClick={() => updateQty(i.key, i.qty + 1)} className="grid h-8 w-8 place-items-center border border-[#262626] hover:border-white"><Plus size={12} /></button>
                    <button onClick={() => removeFromCart(i.key)} className="ml-6 inline-flex items-center gap-2 text-[#A3A3A3] hover:text-[#FF0000] font-mono-t text-[11px] uppercase tracking-[0.22em]"><Trash2 size={12} /> Remove</button>
                  </div>
                </div>
                <p className="font-mono-t text-base">${(i.price * i.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <aside className="border border-[#262626] p-8 h-fit md:sticky md:top-24" data-testid="cart-summary">
            <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// Order Summary</p>
            <h3 className="font-display text-3xl uppercase mt-2">Total</h3>
            <div className="mt-6 space-y-3">
              <Line label="Subtotal" value={`$${totals.subtotal.toFixed(2)}`} />
              <Line label="Shipping" value={totals.shipping ? `$${totals.shipping}` : "Free"} />
              <Line label="Tax" value={`$${totals.tax.toFixed(2)}`} />
            </div>
            <div className="mt-6 border-t border-[#262626] pt-6 flex items-baseline justify-between">
              <p className="font-display text-2xl uppercase">Total</p>
              <p className="font-display text-3xl">${totals.total.toFixed(2)}</p>
            </div>
            <Link to="/checkout" className="btn-primary solid w-full mt-8" data-testid="cart-checkout-btn">
              Checkout <ArrowRight size={14} />
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
};

const Line = ({ label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-[#A3A3A3] font-mono-t text-[11px] uppercase tracking-[0.22em]">{label}</span>
    <span className="font-mono-t">{value}</span>
  </div>
);

export default Cart;
