"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const ShopBtn = () => {
  const router = useRouter();
  return (
    <Button className='bg-white w-full md:w-1/2 items-start justify-center mt-8 text-[#004631] font-semibold cursor-pointer'
      onClick={() => router.push('/frontend/products')}>
      Shop Now</Button>
  )
}
export default ShopBtn
