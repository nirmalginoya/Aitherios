import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "sonner";
import { StoreProvider } from "./context/StoreContext";
import "./App.css";

// E-commerce Layout
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

// Admin Layout
import AdminLayout from "./components/AdminLayout";
import AdminRoute from "./components/AdminRoute";

// Lazy-loaded Pages
const Home = React.lazy(() => import("./pages/Home"));
const Shop = React.lazy(() => import("./pages/Shop"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Lookbook = React.lazy(() => import("./pages/Lookbook"));
const Drops = React.lazy(() => import("./pages/Drops"));
const Wishlist = React.lazy(() => import("./pages/Wishlist"));
const Account = React.lazy(() => import("./pages/Account"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Lazy-loaded Admin Pages
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProducts = React.lazy(() => import("./pages/admin/AdminProducts"));
const AdminOrders = React.lazy(() => import("./pages/admin/AdminOrders"));
const AdminUsers = React.lazy(() => import("./pages/admin/AdminUsers"));

// Initialize React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Fallback UI for Error Boundary
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white p-4">
      <div className="max-w-md p-8 bg-[#111] border border-[#222] rounded-xl text-center space-y-4">
        <h2 className="text-2xl font-bold text-red-500">Something went wrong</h2>
        <p className="text-gray-400 text-sm overflow-auto max-h-32 p-2 bg-black rounded">{error.message}</p>
        <button 
          onClick={resetErrorBoundary}
          className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

// Fallback UI for Suspense (Lazy Loading)
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
    <div className="w-8 h-8 border-4 border-[#333] border-t-white rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <Toaster position="top-right" expand={false} richColors theme="dark" />
            <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public Storefront Routes */}
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/lookbook" element={<Lookbook />} />
                    <Route path="/drops" element={<Drops />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  {/* Admin Panel Routes */}
                  <Route path="/admin" element={<AdminRoute />}>
                    <Route element={<AdminLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="products" element={<AdminProducts />} />
                      <Route path="orders" element={<AdminOrders />} />
                      <Route path="users" element={<AdminUsers />} />
                    </Route>
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </StoreProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
