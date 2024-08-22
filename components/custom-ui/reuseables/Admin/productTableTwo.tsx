"use client";

import { Card } from '@/components/ui/card';
import { FormattedPrice } from '@/lib';
import Image from 'next/image';
import React from 'react';

interface ProductTableProps{
  productImg: string
  productName:string
  productId: string
  productPrice: string
  productMaterial: string
  productDescription: string
  productCategory: string
  // query: string
  // currentPage: number

}
const ProductTableTwo:React.FC<ProductTableProps> = ({productId, productImg, productName, productCategory, productPrice, productMaterial, productDescription}) => {
   
  //const invoices = await fetchFilteredProducts(query, currentPage);

  return (
    <Card className=" border rounded-lg grid grid-cols-3 gap-4">
      <div className="border-r-2 pr-4 flex items-center justify-center h-full p-4">
        <Image 
          src="/vercel.svg" 
          alt="Product Image" 
          className="object-cover rounded-lg" 
          width={100} 
          height={100} 
        />
      </div>

      {/* Product Details */}
      <div className=" col-span-2 grid grid-cols-2 gap-4">
        {/* Product Info */}
        <div className="border-r-2 p-4">
          <div className="grid grid-cols-2">
            <span className="text-lg font-semibold">Product Name:</span>
            <span className="text-sm text-left">{productName}</span>
          </div>

          <div className="grid grid-cols-2">
            <span className="text-lg font-semibold text-gray-600">ID:</span>
            <span className="text-sm text-left">{productId}</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-lg font-semibold text-green-600">Price:</span>
            <span className="text-sm text-left">{FormattedPrice(productPrice)}</span>
          </div>
        </div>

        {/* Product Meta */}
        <div className="p-4">
          <div className="grid grid-cols-2">
            <span className="text-lg font-semibold text-gray-700">Material:</span>
            <span className="text-sm text-left">{productMaterial}</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-lg font-semibold text-gray-700">Description:</span>
            <span className="text-sm text-left">{productDescription}</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-lg font-semibold text-gray-500">Category:</span>
            <span className="text-sm text-left">{productCategory}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductTableTwo;
