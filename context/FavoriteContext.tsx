import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Book } from "@/types";

interface FavoriteContextType {
  favorites: Book[];
  toggleFavorite: (book: Book) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  favoritesCount: number;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Book[]>([]);

  const toggleFavorite = useCallback((book: Book) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === book.id);
      if (exists) {
        return prev.filter((item) => item.id !== book.id);
      } else {
        return [...prev, book];
      }
    });
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favorites.some((item) => item.id === id);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const favoritesCount = useMemo(() => favorites.length, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      clearFavorites,
      favoritesCount,
    }),
    [favorites, toggleFavorite, isFavorite, clearFavorites, favoritesCount]
  );

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
}

// Re-export Book type for convenience
export type { Book };
