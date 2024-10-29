"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItemType } from '@/types';


interface CartContextType {
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  addToCart: (product: CartItemType) => void;
  removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const addToCart = (product: CartItemType) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
