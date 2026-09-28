// Shared types untuk seluruh aplikasi

// Product & Cart types
export interface Product {
  id: string;
  nama: string;
  harga: number;
}

export interface CartItem extends Product {
  quantity?: number;
}

// Book types
export interface Book {
  id: string;
  title: string;
  author: string;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

// Navigation params types
export interface RouteParams {
  [key: string]: string | number | boolean | undefined;
}
