"use client"

import React, { useState } from 'react';
import { ModalManager, ProductTable, ProductTableTwo, PageHead, DatePickerWithRange, InputSearch } from '@/components/custom-ui/reuseables';
import { ProductType } from '@/types';
import { Button } from '@/components/ui/button';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';


const ClientProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [activeModal, setActiveModal] = useState<'add' | 'edit' | null>(null);

  const handleEditProductOpen = (product: ProductType) => {
    setSelectedProduct(product);
    setActiveModal('edit');
    setIsModalOpen(true);
  };

  const handleAddProductOpen = () => {
    setActiveModal('add');
    setIsModalOpen(true);
  };


  return (
    <div>
      <header className="flex h-[75px] pt-4 items-center justify-between border-b bg-muted/40 px-4 lg:px-6">
        <Link href="#" className="lg:hidden" prefetch={false}>
          <span className="sr-only">Home</span>
        </Link>
        <PageHead pageTitle="Product" />
        <div className="w-full lg:max-w-md">
          <InputSearch />
        </div>
        <DatePickerWithRange />
      </header>

      <ModalManager
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedProduct={selectedProduct}
        activeModal={activeModal}
        handleAddProductOpen={handleAddProductOpen}
      />
      <div className='w-full py-4'>
        <div className='flex flex-cols-2 lg:flex-cols-4 space-x-2 '>
          <Button className="flex" ><span>Search Result</span><FaTimes /> </Button>
          <Button className="flex" ><span>Search Result</span><FaTimes /> </Button>
          <Button className="flex" ><span>Search Result</span><FaTimes /> </Button>
          <Button className="flex" ><span>Search Result</span><FaTimes /> </Button>

        </div>
      </div>
      <ProductTable
        setIsModalOpen={setIsModalOpen}
        handleEditProductOpen={handleEditProductOpen}
      />
      <ProductTableTwo />
    </div>
  );
};

export default ClientProductPage;
