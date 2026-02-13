import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { Product, CartItem } from '../types';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  
  // Admin & Store Config
  isAdmin: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;
  
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateProductStock: (id: string, stock: number) => void;
  
  openingTime: string;
  closingTime: string;
  setStoreHours: (open: string, close: string) => void;
  isStoreOpen: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Surpresa de Uva Tradicional',
    description: 'Bombom de uva gourmet com creme de ninho e ganache de chocolate',
    stock: 999,
    available: true,
    imageUrl: 'https://i.postimg.cc/6qnDZgJq/Chat-GPT-Image-3-02-2026-17-19-04.png'
  },
  {
    id: '2',
    name: 'Surpresa de Morango Tradicional',
    description: 'Bombom de morango gourmet com creme de ninho e ganache de chocolate',
    stock: 999,
    available: true,
    imageUrl: 'https://i.postimg.cc/cC70S688/Chat-GPT-Image-13-02-2026-12-31-07.png'
  }
];

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openingTime, setOpeningTime] = useState('08:00');
  const [closingTime, setClosingTime] = useState('22:00');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute to check store status
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (item: CartItem) => {
    // Como vendemos apenas um tipo de produto por vez neste modelo simplificado,
    // podemos substituir o carrinho ou adicionar.
    setCart([item]); 
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const loginAdmin = () => setIsAdmin(true);
  const logoutAdmin = () => setIsAdmin(false);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter(p => p.id !== id));
  };

  const updateProductStock = (id: string, stock: number) => {
    setProducts((prev) => prev.map(p => p.id === id ? { ...p, stock } : p));
  };

  const setStoreHours = (open: string, close: string) => {
    setOpeningTime(open);
    setClosingTime(close);
  };

  const isStoreOpen = useMemo(() => {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    return timeString >= openingTime && timeString <= closingTime;
  }, [currentTime, openingTime, closingTime]);

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        addProduct,
        removeProduct,
        updateProductStock,
        openingTime,
        closingTime,
        setStoreHours,
        isStoreOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};