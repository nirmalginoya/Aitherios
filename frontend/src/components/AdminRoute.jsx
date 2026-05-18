import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const AdminRoute = () => {
  const { user } = useStore();

  // The state contains { user: { role, ... }, token }
  if (!user || !user.user) {
    return <Navigate to="/login" replace />;
  }

  if (user.user.role !== "admin") {
    // If logged in but not an admin, redirect to home
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
