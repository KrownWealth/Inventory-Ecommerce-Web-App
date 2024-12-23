"use client"

import React from 'react';
import { UserSearch } from '@/components/custom-ui/reuseables';
import Link from 'next/link';
import SignOut from '../authentication/singOut';
import { Button } from '@/components/ui/button';
import { FiShoppingBag } from 'react-icons/fi';

interface HeaderLink {
  label: string;
  href: string;
};

interface DesktopMenuProps {
  headerLinks: HeaderLink[];
  cartItemCount: number;
  session: any;
  status: 'authenticated' | 'unauthenticated' | 'loading';
  handleLogin: () => void;
};

const DesktopMenu: React.FC<DesktopMenuProps> = ({
  headerLinks,
  cartItemCount,
  session,
  status,
  handleLogin,
}) => {
  return (
    <div className="hidden lg:flex items-center 
    justify-start gap-6 md:gap-8 py-3 sm:justify-center">
      {headerLinks.map((menu) => (
        <Link
          href={menu.href}
          key={menu.label}
          className="font-satoshi-bold uppercase text-pricesageBlackTwo md:text-sm lg:text-lg underline"
        >
          {menu.label}
        </Link>
      ))}
      <div className="mx-4">
        <UserSearch />
      </div>
      <div className="flex flex-row gap-6 items-center">
        <div className="flex flex-col items-center relative z-50">
          <Link href="/frontend/cart">
            <FiShoppingBag size={24} />
            <span className="font-satoshi-bold uppercase font-semibold text-sm underline">
              Cart
            </span>
            {cartItemCount > 0 ? (
              <span
                className="z-10 absolute right-0 bg-destructive p-1 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs"
                style={{
                  top: "-8px",
                }}
              >
                {cartItemCount}
              </span>
            ) : (
              <span
                className="z-10 absolute right-0 bg-destructive p-1 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs"
                style={{
                  top: "-8px",
                }}
              >
                0
              </span>
            )}
          </Link>
        </div>
        <div className="grid grid-rows-2 font-semibold">
          <span>Welcome</span>
          <span>{session?.user?.username.slice(0, 9)}</span>
        </div>
        {status === 'authenticated' ? (
          <SignOut />
        ) : (
          <Button onClick={handleLogin}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default DesktopMenu;
