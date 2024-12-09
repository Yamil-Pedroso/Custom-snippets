// src/components/auth/AdminRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../../context/userContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { currentUser, loading } = useUserContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
