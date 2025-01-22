"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { toastNotification } from '@/lib';
import { useRouter } from 'next/navigation';
import ThreeDotsLoader from '../Loader/threeDotLoader';

const SignupWithGoogle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const handleSigninWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("google", { callbackUrl: "/frontend" });

      if (result?.ok) {
        toastNotification("success", "top-right", undefined, {
          message: "Login Successful",
        });
        //router.push("/frontend");
      } else {
        throw new Error("Login failed.");
      }
    } catch (error) {
      console.error("Google Sign-In Error", error);
      console.log("Google Sign-In Error", error);
      toastNotification("error", "top-right", undefined, {
        message: "An error occurred during Google login. Please try again.",
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
            <ThreeDotsLoader color="#000000" />

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
