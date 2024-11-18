// components/CartItemSkeleton.tsx
import React from 'react';

const CartItemSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 animate-pulse">
      <div className="w-16 h-16 bg-gray-200 rounded-md" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded" />
        <span className="h-4 bg-gray-200 rounded w-12" />
        <div className="w-8 h-8 bg-gray-200 rounded" />
      </div>
      <div className="w-8 h-8 bg-gray-200 rounded" />
    </div>
  );
};

export default CartItemSkeleton;
