"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Create a context to share the active view state throughout the app
const AppContext = createContext<{
  activeView: string;
  setActiveView: (view: string) => void;
}>({ 
  activeView: "r1", 
  setActiveView: () => {} 
});

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);

// Provider component that wraps the app
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  // State to control which component is shown
  const [activeView, setActiveView] = useState<string>("r1");

  return (
    <AppContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </AppContext.Provider>
  );
};