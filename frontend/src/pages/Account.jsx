import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { products as productApi } from "../lib/api";

const MOCK_ORDERS = [
  { id: "AT-10241", date: "2025.11.12", total: 245, status: "Delivered", items: 2 },
  { id: "AT-09877", date: "2025.10.04", total: 180, status: "Delivered", items: 1 },
  { id: "AT-09032", date: "2025.07.21", total: 410, status: "Delivered", items: 4 },
];

const TABS = ["Overview", "Orders", "Addresses", "Settings"];

const Account = () => {
  const { user, logout, wishlist } = useStore();
  const [tab, setTab] = useState("Overview");
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchRecent = async () => {
        try {
          const res = await productApi.getAll();
          setRecentProducts(res.data.slice(0, 3));
        } catch (err) {
          console.error("Failed to fetch account products", err);
        } finally {
          setLoading(false);
        }
      };
      fetchRecent();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="pt-28 pb-24 px-6 md:px-12 text-center">
        <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// Account</p>
        <h1 className="font-display text-5xl uppercase mt-2">Sign in required.</h1>
        <Link to="/login" className="btn-primary solid mt-8 inline-flex">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12" data-testid="account-page">
      <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// Welcome back</p>
      <h1 className="font-display text-6xl md:text-[8vw] leading-[0.9] uppercase mt-2">{user.name}</h1>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
        <aside className="space-y-2 md:sticky md:top-24 md:h-fit">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`w-full text-left px-4 py-3 font-mono-t text-[11px] uppercase tracking-[0.22em] border ${
                tab === t ? "bg-[#FF0000] border-[#FF0000] text-white" : "border-[#262626] hover:border-white"
              }`}
              data-testid={`account-tab-${t.toLowerCase()}`}
            >
              {t}
            </button>
          ))}
          <button
            onClick={() => { logout(); nav("/"); }}
            className="w-full text-left px-4 py-3 font-mono-t text-[11px] uppercase tracking-[0.22em] border border-[#262626] text-[#A3A3A3] hover:text-[#FF0000] hover:border-[#FF0000] mt-6"
            data-testid="account-logout"
          >Log Out</button>
        </aside>

        <div>
          {tab === "Overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card label="Orders" value={MOCK_ORDERS.length} />
              <Card label="Wishlist" value={wishlist.length} />
              <Card label="Member Since" value={new Date(user.joined).getFullYear()} />
              <div className="md:col-span-3 border border-[#262626] p-8">
                <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">Recent</p>
                <h3 className="font-display text-3xl uppercase mt-2">Latest Order</h3>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  {loading ? (
                    <div className="h-24 w-20 bg-[#121212] animate-pulse" />
                  ) : (
                    recentProducts.map((p) => (
                      <img key={p.id} src={p.images[0]} className="h-24 w-20 object-cover" />
                    ))
                  )}
                  <Link to="/shop" className="btn-primary ml-auto">Shop again</Link>
                </div>
              </div>
            </div>
          )}
          {tab === "Orders" && (
            <div className="border border-[#262626]">
              <div className="grid grid-cols-5 px-6 py-4 font-mono-t text-[11px] uppercase tracking-[0.22em] text-[#A3A3A3] border-b border-[#262626]">
                <span>Order</span><span>Date</span><span>Items</span><span>Total</span><span>Status</span>
              </div>
              {MOCK_ORDERS.map((o) => (
                <div key={o.id} className="grid grid-cols-5 px-6 py-5 border-b border-[#262626] text-sm" data-testid={`order-${o.id}`}>
                  <span className="font-mono-t">{o.id}</span>
                  <span className="text-[#A3A3A3]">{o.date}</span>
                  <span>{o.items}</span>
                  <span className="font-mono-t">${o.total}</span>
                  <span className="text-[#FF0000] font-mono-t text-[11px] uppercase tracking-[0.22em]">{o.status}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "Addresses" && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-[#262626] p-6">
                <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">Default</p>
                <h3 className="font-display text-2xl uppercase mt-2">Home</h3>
                <p className="text-sm text-[#A3A3A3] mt-3">{user.name}<br/>123 Bleecker St<br/>Brooklyn, NY 11211</p>
              </div>
              <button className="border border-dashed border-[#262626] p-6 hover:border-white text-[#A3A3A3] font-mono-t text-xs uppercase tracking-[0.22em]">
                + Add Address
              </button>
            </div>
          )}
          {tab === "Settings" && (
            <div className="space-y-4 max-w-md">
              <input className="fld-input" defaultValue={user.email} />
              <input className="fld-input" placeholder="New password" type="password" />
              <button className="btn-primary solid">Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Card = ({ label, value }) => (
  <div className="border border-[#262626] p-6">
    <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">{label}</p>
    <p className="font-display text-5xl uppercase mt-2">{value}</p>
  </div>
);

export default Account;
