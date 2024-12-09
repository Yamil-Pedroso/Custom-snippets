import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../../context/userContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useUserContext(); // Utiliza currentUser y loading del contexto

  // Mostrar un spinner mientras se cargan los datos de autenticación
  if (loading) {
    return <div>Loading...</div>; // Aquí puedes agregar un spinner más estilizado si lo prefieres
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario autenticado, mostrar los children
  return <>{children}</>;
};

export default ProtectedRoute;

