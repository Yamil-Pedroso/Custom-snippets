import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getComponents, IComponent } from "../services/ComponentService";

interface ComponentContextProps {
  components: IComponent[];
  setComponents: React.Dispatch<React.SetStateAction<IComponent[]>>;
  isSimulateAuthUser?: boolean;
}

const ComponentContext = createContext<ComponentContextProps | undefined>(
  undefined
);

export const ComponentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [components, setComponents] = useState<IComponent[]>([]);
  const [isSimulateAuthUser, setIsSimulateAuthUser] = useState(true);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const data = await getComponents();
        setComponents(data);
      } catch (error) {
        console.error("Failed to fetch components:", error);
      }
    };
    fetchComponents();
  }, []);

  useEffect(() => {
    if (isSimulateAuthUser) {
      console.log("User is authenticated");
       setIsSimulateAuthUser(true);
    } else {
      console.log("User is not authenticated");
    }
  }
  , [isSimulateAuthUser]);

  return (
    <ComponentContext.Provider value={{ components, setComponents, isSimulateAuthUser }}>
      {children}
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
