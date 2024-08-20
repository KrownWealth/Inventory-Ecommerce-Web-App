"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { ProductType } from '@/types';
import { ChevronDown } from 'lucide-react';
import FilterByCategory from '../Filter/filterByCategory';

interface ProductPageHeadProps {
  setIsModalOpen: (open: boolean) => void;
  handleAddProductOpen: () => void; 
 filterText: string;
  btnText?: string;
}

const AddProductPageHead: React.FC<ProductPageHeadProps> = ({ handleAddProductOpen, filterText, btnText }) => {
  return (
    <div className="flex items-center py-4">
      <FilterByCategory />
      
      <Button onClick={handleAddProductOpen} className="ml-auto text-sm lg:text-lg" size="sm">
        {btnText}
      </Button>
    </div>
  );
};

export default AddProductPageHead;
