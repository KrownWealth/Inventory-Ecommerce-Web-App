"use client"

import React, { useState } from 'react';
import { ModalManager, ProductTable } from '@/components/custom-ui/reuseables';
import { ProductType } from '@/types';

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
      <ModalManager
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedProduct={selectedProduct}
        activeModal={activeModal}
        handleAddProductOpen={handleAddProductOpen} 
      />
      <ProductTable
        setIsModalOpen={setIsModalOpen}
        handleEditProductOpen={handleEditProductOpen}
      />
    </div>
  );
};

export default ClientProductPage;
