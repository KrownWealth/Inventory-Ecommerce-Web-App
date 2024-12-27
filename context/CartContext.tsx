"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CartItemType } from "@/types";
import { useSession } from "next-auth/react";
import { toastNotification } from "@/lib";

interface CartContextType {
  cartItems: CartItemType[];
  fetchCartItems: () => Promise<void>;
  addToCart: (item: CartItemType) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  handleCartQtyIncrease: (productId: number) => Promise<void>;
  handleCartQtyDecrease: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalPrice: number;
  loading: boolean;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://inventory-ecommerce-web.vercel.app"


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
    if (!userId) {
      console.warn("User ID is undefined. Cannot fetch cart items.");
      return;
    }
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

      let updatedCartItems;

      if (existingItem) {
        updatedCartItems = cartItems.map(cartItem =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        updatedCartItems = [...cartItems, item];
      }

      setCartItems(updatedCartItems);

      const response = await fetch(`${baseUrl}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': String(userId),
        },
        body: JSON.stringify({
          userId,
          productId: item.productId,
          quantity: existingItem ? existingItem.quantity + item.quantity : item.quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart on the server.');
      }

      // Calculate new total price
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

  const removeFromCart = async (productId: number) => {
    try {
      const response = await fetch(`${baseUrl}/api/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        const updatedItems = cartItems.filter(item => item.id !== productId);
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
  const handleCartQtyIncrease = async (productId: number) => {
    try {
      const updatedCartItems = cartItems.map(item =>
        String(item.productId) === String(productId)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCartItems(updatedCartItems);

      await fetch(`${baseUrl}/api/cart`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          quantity: updatedCartItems.find(item => String(item.productId) === String(productId))?.quantity,
        }),
      });
    } catch (error) {
      console.error("Failed to increase item quantity:", error);
      toastNotification("error", "top-right", undefined, {
        message: "Failed to increase item quantity",
      });
    }
  };

  const handleCartQtyDecrease = async (productId: number) => {
    try {
      const updatedCartItems = cartItems.map(item =>
        String(item.productId) === String(productId)
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );


      setCartItems(updatedCartItems);

      await fetch(`${baseUrl}/api/cart`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          quantity: updatedCartItems.find(item => String(item.productId) === String(productId))?.quantity,
        }),
      });
    } catch (error) {
      console.error("Failed to decrease item quantity:", error);
      toastNotification("error", "top-right", undefined, {
        message: "Failed to decrease item quantity",
      });
    }
  };


  return (
    <CartContext.Provider value={{
      cartItems, fetchCartItems, addToCart, removeFromCart,
      clearCart, totalPrice, loading, handleCartQtyIncrease,
      handleCartQtyDecrease
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
