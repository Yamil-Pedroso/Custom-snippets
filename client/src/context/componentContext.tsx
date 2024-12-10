import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getUserComponents, IComponent } from "../services/ComponentService";

interface ComponentContextProps {
  components: IComponent[];
  setComponents: React.Dispatch<React.SetStateAction<IComponent[]>>;
}

const ComponentContext = createContext<ComponentContextProps | undefined>(
  undefined
);

export const ComponentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [components, setComponents] = useState<IComponent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComponents = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return; // No realizar la solicitud si no hay token
  
      try {
        const data = await getUserComponents();
        setComponents(data);
      } catch (err) {
        console.error("Failed to fetch components:", err);
        setError("Failed to fetch components");
      }
    };
  
    fetchComponents();
  }, []);
  

  return (
    <ComponentContext.Provider value={{ components, setComponents }}>
      {error ? <div>{error}</div> : children}
    </ComponentContext.Provider>
  );
};

export const useComponentContext = (): ComponentContextProps => {
  const context = React.useContext(ComponentContext);
  if (!context) {
    throw new Error(
      "useComponentContext must be used within a ComponentProvider"
    );
  }
  return context;
};
