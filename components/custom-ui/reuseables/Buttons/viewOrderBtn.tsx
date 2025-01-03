"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const ViewOrderBtn = () => {
  const router = useRouter();
  return (
    <Button className='bg-green-700 w-full items-center 
    justify-center text-white font-semibold cursor-pointer p-4 mt-8 text-xl'
      onClick={() => router.replace('/frontend/profile')}>
      View your order here
    </Button>
  )
}
export default ViewOrderBtn
