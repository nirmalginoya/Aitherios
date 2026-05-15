import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../lib/api";

const StoreContext = createContext(null);

const KEY_CART = "aitherios:cart";
const KEY_WISH = "aitherios:wish";
const KEY_USER = "aitherios:user";

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY_CART)) || []; } catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY_WISH)) || []; } catch { return []; }
  });
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY_USER)) || null; } catch { return null; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => localStorage.setItem(KEY_CART, JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem(KEY_WISH, JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem(KEY_USER, JSON.stringify(user)), [user]);

  const addToCart = (product, size, color, qty = 1) => {
    const key = `${product.id}__${size}__${color}`;
    setCart((prev) => {
      const ex = prev.find((i) => i.key === key);
      if (ex) return prev.map((i) => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [
        ...prev,
        { key, id: product.id, name: product.name, price: product.price, image: product.images[0], size, color, qty },
      ];
    });
    setCartOpen(true);
  };
  const removeFromCart = (key) => setCart((p) => p.filter((i) => i.key !== key));
  const updateQty = (key, qty) =>
    setCart((p) => p.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)));
  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) =>
    setWishlist((p) => (p.includes(productId) ? p.filter((x) => x !== productId) : [...p, productId]));

  const login = async (credentials) => {
    try {
      const res = await auth.login(credentials);
      setUser(res.data);
      return res.data;
    } catch (err) {
      console.error("Login failed", err);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const res = await auth.register(userData);
      setUser(res.data);
      return res.data;
    } catch (err) {
      console.error("Registration failed", err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(KEY_USER);
  };

  const totals = useMemo(() => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = cart.length ? (subtotal > 200 ? 0 : 15) : 0;
    const tax = +(subtotal * 0.08).toFixed(2);
    const total = +(subtotal + shipping + tax).toFixed(2);
    return { subtotal, shipping, tax, total, count: cart.reduce((s, i) => s + i.qty, 0) };
  }, [cart]);

  return (
    <StoreContext.Provider
      value={{
        cart, wishlist, user, cartOpen, setCartOpen, searchOpen, setSearchOpen,
        addToCart, removeFromCart, updateQty, clearCart,
        toggleWishlist, login, register, logout, totals,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
};
