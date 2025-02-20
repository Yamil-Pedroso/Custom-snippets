import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser, IUser } from "../services/UserService";

interface UserContextProps {
  currentUser: IUser | null; 
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  users: IUser[]; 
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  loading: boolean; 
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("currentUser", currentUser);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser();
        setCurrentUser(userData); 
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
        localStorage.removeItem("authToken"); 
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []); 

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
