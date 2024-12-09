// src/context/userContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser, IUser } from "../services/UserService";

interface UserContextProps {
  currentUser: IUser | null; // Usuario actualmente autenticado
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  users: IUser[]; // Lista de usuarios para la administración
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  loading: boolean; // Indica si se están cargando los datos del usuario
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser();
        setCurrentUser(userData); // Actualiza el estado del usuario autenticado
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
        localStorage.removeItem("authToken"); // Eliminar el token si es inválido
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []); // Se ejecuta solo al montar el componente

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, users, setUsers, loading }}>
      {error ? <div>{error}</div> : children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
