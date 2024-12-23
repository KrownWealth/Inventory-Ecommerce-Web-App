"use client";

import React, { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useCart } from "@/context/CartContext";
import { Logo } from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { DiscountBanner } from "./DiscountBanner";
import { IoClose } from 'react-icons/io5';

const headerLinks = [
  { label: "Shop by Products", href: "/frontend/products" },
];

export const Header = () => {
  const router = useRouter();
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    router.replace("/auth/sign-in");
  };

  const { data: session, status } = useSession();
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);



  return (
    <nav className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Pass props to DesktopMenu */}
          <DesktopMenu
            headerLinks={headerLinks}
            cartItemCount={cartItemCount}
            session={session}
            status={status}
            handleLogin={handleLogin}
          />

          {/* Mobile Menu Button */}
          <div className="hamburger-menu space-x-4">
            <Link href="/frontend/cart" className="flex flex-col items-center relative">
              <FiShoppingBag size={24} />
              <span className="font-satoshi-bold uppercase font-semibold text-sm underline">Cart</span>
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
                  className="z-10 absolute right-0 bg-gray-300 p-1 text-black w-4 h-4 rounded-full flex items-center justify-center text-xs"
                  style={{
                    top: "-8px",
                  }}
                >
                  0
                </span>
              )}
            </Link>


            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <IoClose size={30} /> : <HiOutlineMenuAlt3 size={30} />}
            </button>

          </div>
        </div>


        {/* Pass props to MobileMenu */}
        <MobileMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          headerLinks={headerLinks}
          status={status}
          handleLogin={handleLogin}
        />
      </div>
      <DiscountBanner />
    </nav>
  );
};
