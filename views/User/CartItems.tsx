"use client"

import { useState, useEffect, Suspense } from 'react';
import { CartItemCard, CheckoutButton } from '@/components/custom-ui/reuseables';
import { useCart } from '@/context/CartContext';
import { CartItemType, ProductType } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useDebouncedCallback } from 'use-debounce';
import { CartItemSkeleton } from '@/components/custom-ui/reuseables';
import { usePathname } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const CartItems = () => {
  const { fetchCartItems, addToCart, removeFromCart, cartItems, loading, totalPrice } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);

  const pathname = usePathname();

  useEffect(() => {
    const fetchProducts = async () => {
      setError(null);
      try {
        const response = await fetch(`${baseUrl}/api/product`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorMsg = response.status === 500
            ? "Server error. Failed to fetch product in cart."
            : "Failed to fetch products.";
          throw new Error(errorMsg);
        }
        const { products } = await response.json();
        setProducts(products);
      } catch (error: any) {
        console.error("Error fetching cart items:", error);
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);


  const debouncedFetchCartItems = useDebouncedCallback(async () => {
    setError(null);
    try {
      await fetchCartItems();
    } catch (error: any) {
      console.error("Error loading cart items:", error);
      setError("Failed to fetch cart items. Please try again.");
    }
  }, 300);

  useEffect(() => {
    debouncedFetchCartItems();
  }, [debouncedFetchCartItems]);


  const incrementQuantity = async (itemId: number) => {
    const existingItem = cartItems.find(item => item.id === itemId);
    if (existingItem) {
      await addToCart({ ...existingItem, quantity: existingItem.quantity + 1 });
    }
  };

  const decrementQuantity = async (itemId: number) => {
    const existingItem = cartItems.find(item => item.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      await addToCart({ ...existingItem, quantity: existingItem.quantity - 1 });
    } else if (existingItem) {
      await removeFromCart(itemId);
    }
  }

  const calculateTotalUnits = (cartItems: CartItemType[]) =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);


  const getProductDetails = (productId: string) => {
    return products.find(product => product.id === productId) || null;
  };


  const calculateTotalPrice = (cartItems: CartItemType[]) => {
    return cartItems.reduce((sum, item) => {
      const product = getProductDetails(item.productId);
      return sum + (product?.sellingPrice ?? 0) * item.quantity;
    }, 0);
  };

  if (loading) {
    return (
      <div data-testid="loading-cart"
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Array.from({ length: cartItems.length }).map((_, index) => (
          <Suspense fallback={
            <CartItemSkeleton key={index} />
          }>
            <CartItemSkeleton key={index} />
          </Suspense>

        ))}
      </div>
    );
  }


  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Loading Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="">
      <CardHeader>
        <CardTitle className='text-sm md:text-lg'>Cart Items</CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <Card>
            <CardContent data-testid="no-cart-items">No items in your cart.</CardContent>
          </Card>
        ) : (
          <>
            {cartItems.map(item => {
              const productDetail = getProductDetails(item.productId);
              return (
                <CartItemCard
                  key={item.productId}
                  item={item}
                  productDetail={productDetail}
                  onIncrement={() => item.id && incrementQuantity(item.id)}
                  onDecrement={() => item.id && decrementQuantity(item.id)}
                  onRemove={() => item.id && removeFromCart(item.id)}
                />
              );
            })}

            <div className="mt-8">
              <h2 className='text-sm md:text-lg py-4 font-semibold'>Items Summary</h2>
              <div className="flex justify-between">
                <span>Total Units:</span>
                <span>{calculateTotalUnits(cartItems)}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Total Price:</span>
                <span>${calculateTotalPrice(cartItems).toFixed(2)}</span>
              </div>

            </div>
            {pathname !== '/frontend/checkout' && <CheckoutButton />}
          </>
        )}
      </CardContent>
    </Card>
  );
};
