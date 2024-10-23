"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { MdFavoriteBorder } from 'react-icons/md';
import { usePathname, useRouter } from 'next/navigation';
import { UserSearch } from '@/components/custom-ui/reuseables';
import { Satoshi_Black, Satoshi_Bold, Satoshi_Medium } from '@/lib/fonts';
import { cn } from '@/lib';
import { useSession } from 'next-auth/react';
import SignOut from '../authentication/singOut';
import { Button } from '@/components/ui/button';



const headerLinks = [
  { label: 'Shop by Products', href: '/frontend/products' },
];



export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, status, update } = useSession();

  const handleLogin = () => {
    router.push('/auth/sign-in');
  };

  return (
    <header className="w-full">
      {/* Move max-w-screen-xl to nav */}
      <nav className="container h-16 flex flex-row justify-between items-center p-2 px-12 mx-auto">
        <div>
          <h2 className={cn("font-semibold flex items-center justify-start text-xl capitalize leading-snug", Satoshi_Black.className)}>Hometung <br />Furniture.</h2>
        </div>
        {headerLinks.map((menu) => (
          <Link href={menu.href}
            key={menu.label}
            className={cn('uppercase text-pricesageBlackTwo font-semibold text-lg underline', Satoshi_Bold)}>
            {menu.label}
          </Link>
        ))}
        <UserSearch />
        <div className="flex gap-6 items-center">
          <Link href="/cart"
            className="flex flex-col items-center">
            <FiShoppingBag className="w-6 h-6" />
            <span className={cn('uppercase text-pricesageBlackTwo font-semibold text-sm underline', Satoshi_Bold)}>Cart</span>
          </Link>
          <div className="flex flex-col items-center">
            <MdFavoriteBorder className="w-6 h-6" />
            <span className={cn('uppercase text-pricesageBlackTwo font-semibold text-sm underline', Satoshi_Bold)}>Favorite</span>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" sizes="lg" />
            <AvatarFallback>{session?.user.username}</AvatarFallback>
          </Avatar>
          <>
            {status === "authenticated" ? (
              <SignOut />
            ) : (
              <Button onClick={handleLogin}>Login</Button>
            )}
          </>
        </div>
      </nav>

      {/* Discount banner */}
      <div className="h-10 bg-black flex items-center justify-center text-white">
        <p className={cn('uppercase text-pricesageBlackTwo font-medium text-xl underline', Satoshi_Medium)}>
          Special offer! Get 20% off now{' '}
          <span className="underline text-medium">Give it to me!</span>
        </p>
      </div>
    </header>
  );
};


