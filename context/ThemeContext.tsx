import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

interface ThemeContextType {
  gelap: boolean;
  toggleTema: () => void;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [gelap, setGelap] = useState(false);

  const toggleTema = useCallback(() => {
    setGelap((prev) => !prev);
  }, []);

  const setTheme = useCallback((isDark: boolean) => {
    setGelap(isDark);
  }, []);

  const value = useMemo(
    () => ({
      gelap,
      toggleTema,
      setTheme,
    }),
    [gelap, toggleTema, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
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
