// components/DetailedProductSkeleton.tsx
import React from 'react';

const DetailedProductSkeleton = () => {
  return (
    <section className="mt-10 animate-pulse">
      <div className="flex flex-col md:flex-row md:justify-between md:gap-x-20">
        <div className="flex items-center w-full md:w-1/2">
          <div className="w-full h-96 bg-gray-200 rounded-md" />
        </div>
        <div className="flex flex-col w-full md:w-1/2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />

            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />

            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />

            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />

            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />

            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />

            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-12" />
            <div className="w-8 h-8 bg-gray-200 rounded" />
          </div>

          <div className="flex gap-4">
            <div className="w-full h-10 bg-gray-200 rounded" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
      <hr className="w-full bg-gray-400 h-[1px] mt-4" />
    </section>
  );
};

export default DetailedProductSkeleton;
