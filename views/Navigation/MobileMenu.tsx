"use client"


import React from 'react';
import { UserSearch } from '@/components/custom-ui/reuseables';
import Link from 'next/link';
import SignOut from '../authentication/singOut';
import { Button } from '@/components/ui/button';



interface HeaderLink {
  label: string;
  href: string;
};

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  headerLinks: HeaderLink[];
  status: 'authenticated' | 'unauthenticated' | 'loading';
  handleLogin: () => void;

};

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  headerLinks,
  status,
  handleLogin,
}) => {
  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0
        bg-black bg-opacity-50 z-40"
          style={{
            top: '8rem',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      {isMenuOpen && (
        <div
          className="absolute left-0 w-full
        bg-white z-50 overflow-y-auto p-4"
          style={{
            height: '300px',
            top: '8rem',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          }}
        >

          <div className="pt-8">
            <p>Search for Product</p>
            <UserSearch />
          </div>

          {headerLinks.map((menu) => (
            <Link
              href={menu.href}
              key={menu.label}
              className="block mt-4 font-satoshi-bold uppercase
            text-pricesageBlackTwo md:text-sm lg:text-lg underline"
            >
              {menu.label}
            </Link>
          ))}

          <div className="mt-6">
            {status === 'authenticated' ? (
              <SignOut />
            ) : (
              <Button onClick={handleLogin}>Login</Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};


export default MobileMenu;
