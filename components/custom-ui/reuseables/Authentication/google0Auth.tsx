"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { BiLoaderAlt } from "react-icons/bi";
import { toastNotification } from '@/lib';

const SignupWithGoogle = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (session && session.user) {
    return <p>Welcome, {session.user.name || session.user.email}</p>;
  }

  const handleSigninWithGoogle = async () => {
    setIsLoading(true);
    try {
      const signInData = await signIn('google', { callbackUrl: '/frontend' });
      if (signInData?.error) {
        toastNotification("error", "top-right", undefined, {
          message: signInData.error || "Login Failed",
        });
      } else {
        toastNotification("success", "top-right", undefined, {
          message: "Login Successful",
        });
      }
    } catch (error) {
      console.error("User registration failed", error);
      toastNotification("error", "top-right", undefined, {
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center space-x-4 pt-4 w-full">
        <div className="flex-grow h-px bg-black" />
        <p className="text-sm text-gray-500">or Sign up with Email</p>
        <div className="flex-grow h-px bg-black" />
      </div>

      <button
        onClick={handleSigninWithGoogle}
        className="flex bg-transparent border mt-4 p-4 rounded-md shadow-md space-x-2 items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <BiLoaderAlt className="animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            <Image src="/images/google-icon.svg" alt="google-icon" width={20} height={20} className="pt-1" />
            <span className="font-semibold">Signup with Google</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SignupWithGoogle;
