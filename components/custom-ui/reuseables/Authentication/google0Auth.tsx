import React from 'react'
import Image from 'next/image'

const SignupWithGoogle = () => {
  return (
     <div className="flex flex-col items-center justify-center">
                <button className="flex bg-gray-100 p-2 w-[40%] rounded-md shadow-md space-x-2 items-center justify-center">
                  <Image src="/images/google-icon.svg" alt="google-icon" width={20} height={20} className="pt-1" />
                  <span className="font-semibold">Signup with Google</span>
                </button>

                {/* Horizontal Rule with Text in the Center */}
                <div className="flex items-center space-x-4 pt-4 w-full">
                  <div className="flex-grow h-px bg-black" />
                  <p className="text-sm text-gray-500">or Sign up with Email</p>
                  <div className="flex-grow h-px bg-black" />
                </div>

      </div>
  )
}

export default SignupWithGoogle
