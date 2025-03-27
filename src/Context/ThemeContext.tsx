import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext("light");

export const ThemeProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>("expenses");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("themee1") === "dark"
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("themee1", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("themee1", "light");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode,setDarkMode,activeTab,setActiveTab }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useMyContext = () => useContext(ThemeContext);
