import { createContext, useContext, useEffect, useState } from "react";

type ContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Context = createContext<ContextType>({} as ContextType);

const ContextProvider = ({ children }: { children: any }) => {
  const [activeTab, setActiveTab] = useState<string>("expenses");

  return (
    <Context.Provider
      value={{
        activeTab: activeTab,
        setActiveTab: setActiveTab,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useTab = () => {
  return useContext(Context);
};

export { ContextProvider, useTab };
