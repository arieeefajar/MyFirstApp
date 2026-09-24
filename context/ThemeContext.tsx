import React, { createContext, useContext, useState } from "react";

interface ThemeContextType {
  gelap: boolean;
  toggleTema: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [gelap, setGelap] = useState(false);

  const toggleTema = () => setGelap((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ gelap, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
