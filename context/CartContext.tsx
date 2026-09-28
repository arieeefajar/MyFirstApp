import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CartItem } from "@/types";

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  tambahItem: (produk: CartItem) => void;
  kurangItem: (id: string) => void;
  hapusItem: (id: string) => void;
  clearCart: () => void;
  getItemQuantity: (id: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Tambah item ke cart (dengan quantity management)
  const tambahItem = useCallback((produk: CartItem) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === produk.id);
      
      if (existingIndex !== -1) {
        // Item sudah ada, increment quantity
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + 1,
        };
        return updated;
      }
      
      // Item baru, tambahkan dengan quantity 1
      return [...prev, { ...produk, quantity: 1 }];
    });
  }, []);

  // Kurangi quantity item
  const kurangItem = useCallback((id: string) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === id);
      if (existingIndex === -1) return prev;

      const currentQuantity = prev[existingIndex].quantity || 1;
      
      if (currentQuantity > 1) {
        // Kurangi quantity
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: currentQuantity - 1,
        };
        return updated;
      }
      
      // Quantity = 1, hapus item
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  // Hapus item dari cart
  const hapusItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Clear semua items
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Get quantity untuk specific item
  const getItemQuantity = useCallback((id: string): number => {
    const item = items.find((item) => item.id === id);
    return item?.quantity || 0;
  }, [items]);

  // Computed values dengan useMemo
  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.harga * (item.quantity || 1), 0);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      totalItems,
      totalPrice,
      tambahItem,
      kurangItem,
      hapusItem,
      clearCart,
      getItemQuantity,
    }),
    [items, totalItems, totalPrice, tambahItem, kurangItem, hapusItem, clearCart, getItemQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// Re-export CartItem for convenience
export type { CartItem };
