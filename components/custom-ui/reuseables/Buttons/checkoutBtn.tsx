"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const CheckoutButton = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center">
      <Button className='w-full md:w-2/5 p-4 flex items-center justify-center mt-8 bg-black text-white font-semibold cursor-pointer'
        onClick={() => router.push('/frontend/checkout')}>
        Checkout
      </Button>
    </div>
  )
}
export default CheckoutButton
