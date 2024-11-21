"use client";

import { Card } from '@/components/ui/card';
import { FormattedPrice } from '@/lib';
import Image from 'next/image';
import React from 'react';
import { formatDate } from '@/lib';

interface ProductTableProps {
  productImg: string
  productName: string
  productId: string
  costPrice: number
  sellingPrice: number
  productDescription: string
  // markupPercentage: number
  categoryName: string
  createdDate: Date
  updatedDate: Date
  onEdit: () => void;
  onDelete: () => Promise<void>;

}
const ProductTableTwo: React.FC<ProductTableProps> = ({
  productId, productImg, productName, categoryName,
  costPrice, sellingPrice, productDescription, createdDate, updatedDate, onEdit, onDelete }) => {



  return (
    <Card className=" border rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:border-r-2 pr-4 flex items-center justify-center h-full p-4">
        <Image
          src={productImg}
          alt="Product Image"
          className="object-cover rounded-lg"
          width={100}
          height={100}
        />
      </div>

      {/* Product Details */}
      <div className=" col-span-2 grid grid-cols-1 md:grid-cols-2 md:gap-4 text-black">
        {/* Product Info */}
        <div className="md:border-r-2 p-4">
          <div className="grid grid-cols-2 pb-2">
            <span className="text-sm font-semibold ">ID:</span>
            <span className="text-sm text-left">{productId}</span>
          </div>
          <div className="grid grid-cols-2 pb-2">
            <span className="text-sm font-semibold ">Product Name:</span>
            <span className="text-sm text-left">{productName}</span>
          </div>

          <div className="grid grid-cols-2 pb-2">
            <span className="text-sm font-semibold text-green-600">Cost Price:</span>
            <span className="text-sm text-left">{FormattedPrice(costPrice)}</span>
          </div>
          <div className="grid grid-cols-2 pb-2">
            <span className="text-sm font-semibold text-green-600">Selling Price:</span>
            <span className="text-sm text-left">{FormattedPrice(sellingPrice)}</span>
          </div>

          {/* <div className="grid grid-cols-2 pb-2">
            <span className="text-sm font-semibold">Selling Price Percentage:</span>
            <span className="text-sm text-left">{markupPercentage}</span>
          </div> */}
        </div>

        {/* Product Meta */}
        <div className="p-4">
          <div className="grid grid-cols-2 pb-2">
            <span className="text-sm font-semibold">Category:</span>
            <span className="text-sm text-left">{categoryName}</span>
          </div>

          <div className="grid grid-cols-2 pb-2">
            <span className="text-sm font-semibold">Description:</span>
            <span className="text-sm text-left">{productDescription}</span>
          </div>
          <div className="grid grid-cols-2 pb-2">
            <span className="text-sm font-semibold">Created At:</span>
            <span className="text-sm text-left">{formatDate(createdDate)}</span>
          </div>
          <div className="grid grid-cols-2 pb-2">
            <span className="text-sm font-semibold">Updated At:</span>
            <span className="text-sm text-left">{formatDate(updatedDate)}</span>
          </div>

          <div className="grid grid-cols-2 mt-4">
            <button className="text-sm font-semibold cursor-pointer" onClick={onEdit}>Edit</button>
            <button className="text-sm text-left text-red-500 font-semibold cursor-pointer" onClick={onDelete}>Delete</button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductTableTwo;
