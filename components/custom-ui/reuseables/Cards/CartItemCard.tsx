"use client"

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { CartItemType } from "@/types";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';


const CartItems = () => {
  const { data: session } = useSession();

  const userId = session?.user?.id ? parseInt(session.user.id, 10) : null;
  const { fetchCartItems, addToCart, removeFromCart, cartItems } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  const debouncedFetchCartItems = useDebouncedCallback(async () => {
    if (userId !== null) {
      setLoading(true);
      setError(null); // Reset any previous errors
      try {
        await fetchCartItems(userId);
      } catch (err) {
        setError("Failed to fetch cart items. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  }, 300);

  useEffect(() => {
    debouncedFetchCartItems();
  }, [userId, debouncedFetchCartItems]);


  const incrementQuantity = async (item: CartItemType) => {
    if (!userId) {
      console.error("User ID is not available, cannot increment quantity.");
      return;
    }
    const updatedItem = { ...item, quantity: item.quantity++ };
    await addToCart(userId, updatedItem);
  };


  const decrementQuantity = async (item: CartItemType) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      await addToCart(userId!, updatedItem);
    } else {
      removeFromCart(item.productId);
    }
  };

  const calculateTotalUnits = (cartItems: CartItemType[] = []) => {
    return Array.isArray(cartItems) ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;
  };

  const calculateTotalPrice = (cartItems: CartItemType[] = []) => {
    return Array.isArray(cartItems) ? cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0) : 0;
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sm md:text-lg'>Cart Items</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <p>Loading cart items...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-8 text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <div>
            {Array.isArray(cartItems) && cartItems.map(item => (
              <div key={item.productId} className="flex flex-col md:flex-row items-start justify-center space-x-4">
                <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md" />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">$ ${item.price ? item.price.toFixed(2) : "0.00"}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decrementQuantity(item)}
                  >
                    <FaMinus className="h-2 w-2" />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => incrementQuantity(item)}
                  >
                    <FaPlus className="h-2 w-2" />
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFromCart(item.productId)}
                >
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="space-y-2">
          <h2 className='text-sm md:text-lg py-4 font-semibold'>Items Summary</h2>
          <div className="flex justify-between">
            <span>Total Units:</span>
            <span>{calculateTotalUnits(cartItems)}</span>
          </div>
          <div className="flex justify-between">
            <span className='font-semibold'>Total Price:</span>
            <span>${calculateTotalPrice(cartItems).toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItems;
