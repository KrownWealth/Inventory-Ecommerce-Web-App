"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FaArrowLeft } from "react-icons/fa";

const GoBackBtn = () => {
  const router = useRouter();

  return (
    <>
      <Button className='bg-transparent  text-black font-semibold cursor-pointer bg-gray-200'
        onClick={() => router.back()}>
        <FaArrowLeft className="4-4 h-4" />
      </Button>
    </>
  )
}
export default GoBackBtn
