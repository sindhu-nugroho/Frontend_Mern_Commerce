import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AUTH_STORAGE_KEY = "auth";

const getAuth = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const ProtectedRoute = ({ requireAdmin = true }) => {
  const location = useLocation();
  const auth = getAuth();

  const hasToken = Boolean(auth?.token);
  const isAdmin = auth?.role === "Admin";

  if (!hasToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
