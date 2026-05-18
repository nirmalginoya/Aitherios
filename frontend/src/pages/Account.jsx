import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { products as productApi } from "../lib/api";

// Removed MOCK_ORDERS

const TABS = ["Overview", "Orders", "Addresses", "Settings"];

const Account = () => {
  const { user, logout, wishlist } = useStore();
  const profile = user?.user;
  const [tab, setTab] = useState("Overview");
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    if (profile) {
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
  }, [profile]);

  if (!profile) {
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
      <h1 className="font-display text-6xl md:text-[8vw] leading-[0.9] uppercase mt-2">{profile.firstName} {profile.lastName}</h1>

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
          {profile.role === 'admin' && (
            <button
              onClick={() => nav("/admin")}
              className="w-full text-left px-4 py-3 font-mono-t text-[11px] uppercase tracking-[0.22em] border border-[#262626] text-purple-400 hover:text-white hover:border-purple-400 mt-2"
              data-testid="account-admin"
            >Admin Panel</button>
          )}
        </aside>

        <div>
          {tab === "Overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card label="Orders" value={profile.orders?.length || 0} />
              <Card label="Wishlist" value={wishlist.length} />
              <Card label="Member Since" value={profile.createdAt ? new Date(profile.createdAt).getFullYear() : new Date().getFullYear()} />
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
              {(!profile.orders || profile.orders.length === 0) ? (
                <div className="px-6 py-12 text-center text-[#A3A3A3] text-sm">
                  You haven't placed any orders yet.
                </div>
              ) : (
                profile.orders.map((o) => (
                  <div key={o.id} className="grid grid-cols-5 px-6 py-5 border-b border-[#262626] text-sm" data-testid={`order-${o.id}`}>
                    <span className="font-mono-t">{o.id}</span>
                    <span className="text-[#A3A3A3]">{new Date(o.createdAt).toLocaleDateString()}</span>
                    <span>{o.items?.length || 0}</span>
                    <span className="font-mono-t">${o.total?.toFixed(2)}</span>
                    <span className="text-[#FF0000] font-mono-t text-[11px] uppercase tracking-[0.22em]">{o.status}</span>
                  </div>
                ))
              )}
            </div>
          )}
          {tab === "Addresses" && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-[#262626] p-6">
                <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">Default</p>
                <h3 className="font-display text-2xl uppercase mt-2">Home</h3>
                <p className="text-sm text-[#A3A3A3] mt-3">{profile.firstName} {profile.lastName}<br/>123 Bleecker St<br/>Brooklyn, NY 11211</p>
              </div>
              <button className="border border-dashed border-[#262626] p-6 hover:border-white text-[#A3A3A3] font-mono-t text-xs uppercase tracking-[0.22em]">
                + Add Address
              </button>
            </div>
          )}
          {tab === "Settings" && (
            <div className="space-y-4 max-w-md">
              <input className="fld-input" defaultValue={profile.email} />
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
