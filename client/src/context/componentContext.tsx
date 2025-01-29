import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  getUserComponents,
  IComponent,
  toggleComponentVisibility,
} from "../services/ComponentService";

interface ComponentContextProps {
  components: IComponent[];
  setComponents: React.Dispatch<React.SetStateAction<IComponent[]>>;
  updateVisibility: (id: string, isPublic: boolean) => Promise<void>;
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

  const updateVisibility = async (id: string, isPublic: boolean) => {
    try {
      const updatedComponent = await toggleComponentVisibility(id, isPublic);

      setComponents((prev) =>
        prev.map((comp) =>
          comp.id === id
            ? {
                ...comp,
                isPublic: updatedComponent.isPublic,
                shareUrl: updatedComponent.shareUrl,
              }
            : comp
        )
      );
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  return (
    <ComponentContext.Provider
      value={{ components, setComponents, updateVisibility }}
    >
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
