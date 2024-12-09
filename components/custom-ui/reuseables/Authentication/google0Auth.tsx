"use client"


import React from 'react'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'

const SignupWithGoogle = () => {

  const { data: session } = useSession()

  if (session && session.user) {
    return <p>Welcome, {session.user.name || session.user.email}</p>;
  }

  // const handleSigninWithGoogle = async () => {
  //   const signInData = await signIn('google', { callbackUrl: '/dashboard' })

  // }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center space-x-4 pt-4 w-full">
        <div className="flex-grow h-px bg-black" />
        <p className="text-sm text-gray-500">or Sign up with Email</p>
        <div className="flex-grow h-px bg-black" />
      </div>

      <button onClick={() => signIn('google', { callbackUrl: '/frontend' })}
        className="flex bg-transparent border mt-4 p-4 rounded-md shadow-md space-x-2 items-center justify-center">
        <Image src="/images/google-icon.svg" alt="google-icon" width={20} height={20} className="pt-1" />
        <span className="font-semibold">Signup with Google</span>
      </button>

      {/* Horizontal Rule with Text in the Center */}


    </div>
  )
}

export default SignupWithGoogle
