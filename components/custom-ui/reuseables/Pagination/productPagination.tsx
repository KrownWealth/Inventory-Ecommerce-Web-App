"use client"

import React from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface ProductsPaginationProps {
  totalPages: number;
  currentPage: number; 
  onPageChange: (page: number) => void; 
}

const ProductsPagination: React.FC<ProductsPaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (pageNumber: number) => {
    const newURL = createPageURL(pageNumber);
    router.replace(newURL);
    onPageChange(pageNumber); 
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
