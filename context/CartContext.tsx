import React, { createContext, useContext, useState } from "react";

export interface CartItem {
  id: string;
  nama: string;
  harga: number;
}

interface CartContextType {
  items: CartItem[];
  tambahItem: (produk: CartItem) => void;
  kurangItem: (id: string) => void;
  hapusItem: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const tambahItem = (produk: CartItem) => {
    setItems((prev) => [...prev, produk]);
  };

  const kurangItem = (id: string) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) return prev;
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };

  const hapusItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ items, tambahItem, kurangItem, hapusItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
