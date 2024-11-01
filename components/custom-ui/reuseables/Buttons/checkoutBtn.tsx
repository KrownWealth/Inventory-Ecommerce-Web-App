"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const CheckoutButton = () => {
  const router = useRouter();
  return (
    <Button className='w-full md:w-1/2 items-start justify-center mt-8 bg-black
     text-[#004631] font-semibold cursor-pointer'
      onClick={() => router.push('/frontend/checkout')}>
      Checkout</Button>
  )
}
export default CheckoutButton
