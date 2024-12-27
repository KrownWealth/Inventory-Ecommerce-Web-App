"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItemType } from "@/types";
import { useSession } from "next-auth/react";
import { toastNotification } from "@/lib";

interface CartContextType {
  cartItems: CartItemType[];
  fetchCartItems: () => void;
  addToCart: (item: CartItemType) => void;
  removeFromCart: (itemId: number) => void;
  handleCartQtyIncrease: (item: CartItemType) => void;
  handleCartQtyDecrease: (item: CartItemType) => void;
  clearCart: () => void;
  totalPrice: number;
  loading: boolean;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://inventory-ecommerce-web.vercel.app";


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
      if (!response.ok) throw new Error("Failed to fetch cart items.");
      const cartData: CartItemType[] = await response.json();
      setCartItems(Array.isArray(cartData) ? cartData : []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const addToCart = async (item: CartItemType) => {
    if (!userId) return;

    try {
      const existingItem = cartItems.find(cartItem => cartItem.productId === item.productId);
      const updatedCartItems = existingItem
        ? cartItems.map(cartItem =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
        : [...cartItems, item];

      setCartItems(updatedCartItems);

      await fetch(`${baseUrl}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': String(userId),
        },
        body: JSON.stringify({
          userId,
          productId: item.productId,
          quantity: updatedCartItems.find(cartItem => cartItem.productId === item.productId)?.quantity,
        }),
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toastNotification("error", "top-right", undefined, { message: "Failed to add item to cart" });
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      const response = await fetch(`${baseUrl}/api/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", 'user-id': String(userId), },
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



  const handleCartQtyIncrease = async (item: CartItemType) => {
    try {
      const updatedCartItems = cartItems.map(cartItem => {
        if (cartItem.productId === item.productId) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });

      setCartItems(updatedCartItems);

      await fetch(`${baseUrl}/api/cart`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", 'user-id': String(userId) },
        body: JSON.stringify({
          userId,
          productId: item.productId,
          quantity: updatedCartItems.find(cartItem => cartItem.productId === item.productId)?.quantity,
        }),
      });
    } catch (error) {
      console.error("Failed to increase item quantity:", error);
      toastNotification("error", "top-right", undefined, { message: "Failed to increase item quantity" });
    }
  };



  const handleCartQtyDecrease = async (item: CartItemType) => {
    try {
      const updatedCartItems = cartItems.map(cartItem => {
        if (cartItem.productId === item.productId) {
          const newQuantity = Math.max(1, cartItem.quantity - 1); // Decrement quantity
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });

      setCartItems(updatedCartItems);

      await fetch(`${baseUrl}/api/cart`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", 'user-id': String(userId) },
        body: JSON.stringify({
          userId,
          productId: item.productId,
          quantity: updatedCartItems.find(cartItem => cartItem.productId === item.productId)?.quantity,
        }),
      });
    } catch (error) {
      console.error("Failed to decrease item quantity:", error);
      toastNotification("error", "top-right", undefined, { message: "Failed to decrease item quantity" });
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
