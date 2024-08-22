"use client"

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ProductsPagination = ({ totalPages, currentPage, query }: { totalPages: number; currentPage: number; query: string; }) => {
  const router = useRouter();
  const searchParams = new URLSearchParams(useSearchParams());

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    if (query) {
      searchParams.set('query', query);
    }
    router.push(`?${searchParams.toString()}`);
  };

  return (
    <div className="pagination">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default ProductsPagination;
