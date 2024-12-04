"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import FilterByCategory from '../Filter/filterByCategory';

interface ProductPageHeadProps {
  setIsModalOpen: (open: boolean) => void;
  handleAddProductOpen: () => void;
  btnText?: string;
  handleCategoryChange: (categoryId: string | undefined) => void;
}

const AddProductPageHead: React.FC<ProductPageHeadProps> = ({ handleAddProductOpen, btnText, handleCategoryChange }) => {
  return (
    <div className="flex items-center py-4">
      <FilterByCategory onCategoryChange={handleCategoryChange} />

      <Button onClick={handleAddProductOpen} className="ml-auto text-sm lg:text-lg" size="sm">
        {btnText}
      </Button>
    </div>
  );
};

export default AddProductPageHead;
