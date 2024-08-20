"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { ProductType } from '@/types';

interface ProductPageHeadProps {
  setIsModalOpen: (open: boolean) => void;
  handleAddProductOpen: () => void; 
  pageTitle: string;
  btnText?: string;
}

const AddProductPageHead: React.FC<ProductPageHeadProps> = ({ handleAddProductOpen, pageTitle, btnText }) => {
  return (
    <div className="flex items-center py-8">
      <h1 className="font-semibold text-lg lg:text-2xl">{pageTitle}</h1>
      <Button onClick={handleAddProductOpen} className="ml-auto text-sm lg:text-lg" size="sm">
        {btnText}
      </Button>
    </div>
  );
};

export default AddProductPageHead;
