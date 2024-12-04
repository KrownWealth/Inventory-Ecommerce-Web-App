"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItemType } from "@/types";
import { useSession } from "next-auth/react";
import { toastNotification } from "@/lib";

interface CartContextType {
  cartItems: CartItemType[];
  fetchCartItems: () => Promise<void>;
  addToCart: (item: CartItemType) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalPrice: number;
  loading: boolean;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);


  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);


  const fetchCartItems = async () => {
    if (!userId) return;
    setLoading(true);
    try {

      const response = await fetch(`${baseUrl}/api/cart`, {
        method: "GET",
        headers: { "user-id": String(userId) },
      });
      if (!response.ok) {
        const errorMsg = response.status === 500
          ? "Server error. Failed to fetch cart items."
          : "Failed to fetch cart items.";
        throw new Error(errorMsg);
      }
      const cartData: CartItemType[] = await response.json();
      setCartItems(Array.isArray(cartData) ? cartData : []);

      const calculatedTotalPrice = cartData.reduce((total, item) => {
        return total + (item.totalPrice ?? 0);
      }, 0);

      setTotalPrice(calculatedTotalPrice);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      //setError(error.message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const addToCart = async (item: CartItemType) => {
    if (!userId) return;
    try {
      const existingItem = cartItems.find(
        (cartItem) => cartItem.productId === item.productId && cartItem.userId === userId
      );
      const updatedCartItems = existingItem
        ? cartItems.map(cartItem =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: item.quantity }
            : cartItem
        )
        : [...cartItems, item];

      setCartItems(updatedCartItems);

      // Persist the item to the backend
      const response = await fetch(`${baseUrl}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': String(userId),
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart on the server.');
      }

      const newTotalPrice = updatedCartItems.reduce(
        (total, cartItem) => total + cartItem.sellingPrice * cartItem.quantity,
        0
      );
      setTotalPrice(newTotalPrice);

    } catch (error) {
      console.error('Error adding item to cart:', error);
      toastNotification("error", "top-right", undefined, {
        message: "Failed to add item to cart",
      });
    }
  };


  const removeFromCart = async (itemId: number) => {
    try {
      const response = await fetch(`${baseUrl}/api/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        const updatedItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedItems);

        const newTotalPrice = updatedItems.reduce(
          (total, item) => total + item.sellingPrice * item.quantity,
          0
        );
        setTotalPrice(newTotalPrice);

        toastNotification("success", "top-right", undefined, {
          message: "Item successfully removed from cart",
        });
      } else {
        toastNotification("error", "top-right", undefined, {
          message: "Failed to remove item from cart",
        });
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toastNotification("error", "top-right", undefined, {
        message: "An error occurred while removing the item",
      });
    }
  };

  const clearCart = async () => {
    if (!userId) return;
    try {
      await fetch(`${baseUrl}/api/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
      toastNotification("error", "top-right", undefined, {
        message: "An error occurred while clearing the cart",
      });
    }
  };


  return (
    <CartContext.Provider value={{
      cartItems, fetchCartItems, addToCart, removeFromCart,
      clearCart, totalPrice, loading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
