"use client"

import Image from 'next/image'
import React from 'react'

const ProductTableTwo = () => {
  return (
    <div className=" p-4 border rounded-lg shadow-lg grid grid-cols-3 gap-4">
  <div className="col-span-1">
    <Image src="/vercel.svg" alt="Product Image" 
    className="w-full h-auto object-cover rounded-lg" width={100} height={100} />
  </div>

 
  <div className="col-span-2 grid grid-cols-2 gap-4">
   
    <div>
      <div className="text-lg font-bold mb-2">Product Name</div>
      <div className="text-sm text-gray-600 mb-1">ID: 123456</div>
      <div className="text-lg font-semibold text-green-600">$99.99</div>
    </div>

    
    <div>
      <div className="text-sm text-gray-700 mb-1">Material: Cotton</div>
      <div className="text-sm text-gray-700 mb-1">A short description of the product.</div>
      <div className="text-sm text-gray-500">Category: Clothing</div>
    </div>
  </div>
</div>

  )
}

export default ProductTableTwo
