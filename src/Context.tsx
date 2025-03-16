import { createContext, useContext, useEffect, useState } from "react";

type ContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: string;
  setTheme:(theme:string)=>void;
};

const Context = createContext<ContextType>({} as ContextType);

const ContextProvider = ({ children }: { children: any }) => {
  const [activeTab, setActiveTab] = useState<string>("expenses");
  
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  // const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    // document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Context.Provider
      value={{
        activeTab: activeTab,
        setActiveTab: setActiveTab,
        theme: theme,
        setTheme: setTheme,
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
