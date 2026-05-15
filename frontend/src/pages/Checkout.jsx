import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useStore } from "../context/StoreContext";

const STEPS = ["Shipping", "Delivery", "Payment", "Review"];

const Checkout = () => {
  const { cart, totals, clearCart } = useStore();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    email: "", firstName: "", lastName: "", address: "", city: "", zip: "", country: "USA",
    method: "express", card: "", expiry: "", cvv: "",
  });
  const navigate = useNavigate();
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const submit = () => {
    setDone(true);
    setTimeout(() => clearCart(), 200);
  };

  if (done) {
    return (
      <div className="pt-28 pb-24 px-6 md:px-12 text-center" data-testid="checkout-success">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 150 }}>
          <div className="mx-auto grid h-20 w-20 place-items-center border-2 border-[#FF0000]">
            <Check className="text-[#FF0000]" size={36} />
          </div>
        </motion.div>
        <h1 className="font-display text-5xl md:text-7xl uppercase mt-8">Order Confirmed</h1>
        <p className="text-[#A3A3A3] mt-4">Order #AT-{Math.floor(Math.random()*100000)} — A copy was sent to {data.email || "your email"}.</p>
        <button onClick={() => navigate("/")} className="btn-primary solid mt-10">Back Home</button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12" data-testid="checkout-page">
      <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// Secure Checkout</p>
      <h1 className="font-display text-5xl md:text-[7vw] leading-[0.9] uppercase mt-2">Checkout</h1>

      {/* Stepper */}
      <div className="mt-10 flex gap-4 overflow-x-auto">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`grid h-8 w-8 place-items-center border font-mono-t text-xs ${i <= step ? "bg-[#FF0000] border-[#FF0000]" : "border-[#262626] text-[#A3A3A3]"}`}>{i + 1}</div>
            <p className={`font-mono-t text-[11px] uppercase tracking-[0.22em] ${i <= step ? "text-white" : "text-[#A3A3A3]"}`}>{s}</p>
            {i < STEPS.length - 1 && <div className="h-px w-10 bg-[#262626]" />}
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-[1fr_400px] gap-12">
        <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="space-y-5">
          {step === 0 && (<>
            <input className="fld-input" placeholder="Email" value={data.email} onChange={set("email")} data-testid="ck-email" />
            <div className="grid grid-cols-2 gap-3">
              <input className="fld-input" placeholder="First Name" value={data.firstName} onChange={set("firstName")} data-testid="ck-fname" />
              <input className="fld-input" placeholder="Last Name" value={data.lastName} onChange={set("lastName")} data-testid="ck-lname" />
            </div>
            <input className="fld-input" placeholder="Street Address" value={data.address} onChange={set("address")} data-testid="ck-addr" />
            <div className="grid grid-cols-3 gap-3">
              <input className="fld-input" placeholder="City" value={data.city} onChange={set("city")} data-testid="ck-city" />
              <input className="fld-input" placeholder="ZIP" value={data.zip} onChange={set("zip")} data-testid="ck-zip" />
              <input className="fld-input" placeholder="Country" value={data.country} onChange={set("country")} data-testid="ck-country" />
            </div>
          </>)}
          {step === 1 && (<>
            {[
              { id: "express", name: "Express — 1-2 days", price: 25 },
              { id: "standard", name: "Standard — 3-5 days", price: 15 },
              { id: "pickup", name: "Local Pickup — Brooklyn HQ", price: 0 },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setData((d) => ({ ...d, method: m.id }))}
                className={`w-full flex items-center justify-between border p-5 text-left transition ${data.method === m.id ? "border-[#FF0000]" : "border-[#262626] hover:border-white"}`}
                data-testid={`ck-method-${m.id}`}
              >
                <span className="font-mono-t text-xs uppercase tracking-[0.22em]">{m.name}</span>
                <span className="font-mono-t text-sm">{m.price ? `$${m.price}` : "Free"}</span>
              </button>
            ))}
          </>)}
          {step === 2 && (<>
            <input className="fld-input" placeholder="Card Number" value={data.card} onChange={set("card")} data-testid="ck-card" />
            <div className="grid grid-cols-2 gap-3">
              <input className="fld-input" placeholder="MM/YY" value={data.expiry} onChange={set("expiry")} data-testid="ck-expiry" />
              <input className="fld-input" placeholder="CVV" value={data.cvv} onChange={set("cvv")} data-testid="ck-cvv" />
            </div>
            <p className="font-mono-t text-[11px] uppercase tracking-[0.22em] text-[#A3A3A3]">
              ↳ Mock checkout — no real charge.
            </p>
          </>)}
          {step === 3 && (<div className="border border-[#262626] p-6 space-y-3 text-sm">
            <Row label="Email" value={data.email || "—"} />
            <Row label="Name" value={`${data.firstName} ${data.lastName}`} />
            <Row label="Address" value={`${data.address}, ${data.city} ${data.zip}`} />
            <Row label="Method" value={data.method} />
            <Row label="Card" value={data.card ? `**** ${data.card.slice(-4)}` : "—"} />
          </div>)}

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="btn-ghost disabled:opacity-30"
              data-testid="ck-back"
            >← Back</button>
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep((s) => s + 1)} className="btn-primary solid" data-testid="ck-next">Continue →</button>
            ) : (
              <button onClick={submit} className="btn-primary solid" data-testid="ck-place-order">Place Order</button>
            )}
          </div>
        </motion.div>

        <aside className="border border-[#262626] p-6 h-fit md:sticky md:top-24">
          <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">Order</p>
          <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
            {cart.map((i) => (
              <div key={i.key} className="flex items-center gap-3 text-sm">
                <img src={i.image} className="h-14 w-12 object-cover" />
                <div className="flex-1">
                  <p className="font-display uppercase">{i.name}</p>
                  <p className="font-mono-t text-[10px] text-[#A3A3A3] uppercase tracking-[0.2em]">{i.size} / {i.color} × {i.qty}</p>
                </div>
                <p className="font-mono-t text-xs">${(i.price * i.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 border-t border-[#262626] pt-4 text-sm">
            <Row label="Subtotal" value={`$${totals.subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={totals.shipping ? `$${totals.shipping}` : "Free"} />
            <Row label="Tax" value={`$${totals.tax.toFixed(2)}`} />
            <div className="flex items-baseline justify-between border-t border-[#262626] pt-3 mt-3">
              <p className="font-display text-xl uppercase">Total</p>
              <p className="font-display text-xl">${totals.total.toFixed(2)}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const Row = ({ label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-[#A3A3A3] font-mono-t text-[11px] uppercase tracking-[0.22em]">{label}</span>
    <span className="font-mono-t">{value}</span>
  </div>
);

export default Checkout;
