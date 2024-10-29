"use client"

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { CartItemType } from "@/types";


const CartItems: React.FC = () => {
  const { cartItems, setCartItems } = useCart();

  const incrementQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateTotalUnits = (cartItems: CartItemType[]) => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const calculateTotalPrice = (cartItems: CartItemType[]) => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sm md:text-lg'>Cart Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="flex flex-col md:flex-row items-start justify-center space-x-4">
              <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md" />
              <div className="flex-1">
                <h3 className="font-medium text-sm">{item.name}</h3>
                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => decrementQuantity(item.id)}
                >
                  <FaMinus className="h-2 w-2" />
                </Button>
                <span>{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => incrementQuantity(item.id)}
                >
                  <FaPlus className="h-2 w-2" />
                </Button>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeItem(item.id)}
              >
                <FaTrash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
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
