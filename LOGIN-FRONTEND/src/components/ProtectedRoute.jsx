import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  let user = null;

  try {
    user = userString ? JSON.parse(userString) : null;
  } catch (e) {
    console.error("Error parsing user from localStorage", e);
  }

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
};
