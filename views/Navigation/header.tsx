"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';
import { UserSearch } from '@/components/custom-ui/reuseables';
import { Satoshi_Black, Satoshi_Bold, Satoshi_Medium } from '@/lib/fonts';
import { cn } from '@/lib';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import SignOut from '../authentication/singOut';
import { FaTimes } from 'react-icons/fa';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCart } from '@/context/CartContext';


const headerLinks = [
  { label: 'Shop by Products', href: '/frontend/products' },
];

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cartItems } = useCart();

  const { data: session, status } = useSession();
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  const handleLogin = () => {
    router.push('/auth/sign-in');
  };






  return (
    <header className="w-full antialiased">
      <nav className="max-w-7xl h-16 p-2 px-4 mx-auto flex items-center justify-between">
        <div>
          <h2 className={cn("font-semibold flex items-center justify-start text-sm md:text-md lg:text-xl capitalize leading-snug", Satoshi_Black.className)}>
            Hometung <br />Furniture.
          </h2>
        </div>

        <div className="hidden-header flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
          <>
            {headerLinks.map((menu) => (
              <Link href={menu.href} key={menu.label} className={cn('uppercase text-pricesageBlackTwo font-semibold md:text-sm lg:text-lg underline', Satoshi_Bold)}>
                {menu.label}
              </Link>
            ))}
          </>
          <UserSearch />
        </div>

        <div className="flex gap-6 items-center hidden-header">
          <Link href="/cart" className="flex flex-col items-center relative">
            <FiShoppingBag className="w-4 h-4 lg:w-6 lg:h-6" />
            <span className={cn('uppercase font-semibold text-sm underline', Satoshi_Bold)}>Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </Link>
          <div className="grid grid-rows-2 font-semibold ">
            <span>Welcome</span>
            <span>{session?.user.username}</span>
          </div>
          {status === "authenticated" ? <SignOut /> : <Button onClick={handleLogin}>Login</Button>}
        </div>

        <div className="lg:hidden flex space-x-4">
          <Link href="/cart" className="flex flex-col items-center">
            <FiShoppingBag className="w-4 h-4 lg:w-6 lg:h-6" />
            <span className={cn('uppercase text-pricesageBlackTwo font-semibold text-sm underline', Satoshi_Bold)}>Cart</span>
          </Link>
          <Sheet>
            <SheetTrigger><HiOutlineMenuAlt3 className="h-8 w-8" /></SheetTrigger>
            <SheetContent className='bg-white w-3/4 flex flex-col space-y-4'>
              <div className="pt-8">
                <p>Search for Product</p>
                <UserSearch />
              </div>
              {headerLinks.map((menu) => (
                <Link href={menu.href} key={menu.label} className={cn('uppercase text-pricesageBlackTwo font-semibold md:text-sm lg:text-lg underline', Satoshi_Bold)}>
                  {menu.label}
                </Link>
              ))}
              {status === "authenticated" ? <SignOut /> : <Button onClick={handleLogin}>Login</Button>}
            </SheetContent>
          </Sheet>


        </div>
      </nav>

      {/* Discount banner */}
      <div className="h-10 bg-black flex items-center justify-center text-white px-4">
        <p className={cn('uppercase text-pricesageBlackTwo font-medium text-md md:text-xl underline', Satoshi_Medium)}>
          Special offer! Get 20% off now <span className="underline text-medium">Give it to me!</span>
        </p>
      </div>
    </header>
  );
};
