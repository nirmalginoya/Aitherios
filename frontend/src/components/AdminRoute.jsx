import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const AdminRoute = () => {
  const { user } = useStore();

  // Check if user exists and has the admin role
  // Defaulting to navigating back to home if they are not an admin
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // NOTE: You'll need to ensure your backend returns the role in the user object
  if (user.role !== "admin") {
    // If logged in but not an admin, redirect to home
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
