"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItemType } from "@/types";
import { useSession } from "next-auth/react";
interface CartContextType {
  cartItems: CartItemType[];
  fetchCartItems: (userId: number) => Promise<void>;
  addToCart: (userId: number, item: CartItemType) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: (userId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const { data: session } = useSession();

  const userId = session?.user?.id ? parseInt(session.user.id, 10) : null;

  const fetchCartItems = async () => {
    if (!userId) return;
    try {
      const response = await fetch(`/api/cart`, {
        method: "GET",
        headers: { "user-id": String(userId) },
      });
      const cartData = await response.json();
      // For each cart item, fetch its product details
      const products = await Promise.all(
        cartData.map(async (item: CartItemType) => {
          const productResponse = await fetch(`/api/products?id=${item.productId}`);
          const product = await productResponse.json();
          return { ...item, product }; // Include product details in the cart item
        })
      );

      setCartItems(products);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);


  const addToCart = async (userId: number, item: CartItemType) => {
    try {
      const response = await fetch(`/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: item.productId, quantity: item.quantity }),
      });
      if (!response.ok) throw new Error("Failed to add item to cart");
      setCartItems((prevItems) => [...prevItems, item]);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      await fetch(`/api/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      setCartItems((prevItems) => prevItems.filter((item) => item.productId !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const clearCart = async (userId: number) => {
    try {
      await fetch(`/api/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, fetchCartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
