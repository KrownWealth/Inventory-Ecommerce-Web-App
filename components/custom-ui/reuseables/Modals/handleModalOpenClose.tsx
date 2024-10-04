"use client"

import React from "react";
import EditProductModal from "./editProductModal";
import { ProductsType } from "@/types";
import AddProductModal from "./addProductModal";
import AddProductPageHead from "../Headings/productPageHead";

interface ModalManagerProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: ProductsType | null;
  activeModal: 'add' | 'edit' | null;
  handleAddProductOpen: () => void;
  setProductInfo: React.Dispatch<React.SetStateAction<ProductsType[]>>;
  handleCategoryChange: (categoryId: string | undefined) => void;
  selectedCategory: string | null; 
}

const ModalManager: React.FC<ModalManagerProps> = ({
  isModalOpen,
  setIsModalOpen,
  selectedProduct,
  activeModal,
  handleAddProductOpen,
  setProductInfo,
  handleCategoryChange,
  selectedCategory, // Include selectedCategory
}) => {
  return (
    <div>
      <AddProductPageHead
        setIsModalOpen={() => setIsModalOpen(true)}
        handleAddProductOpen={handleAddProductOpen}
        handleCategoryChange={handleCategoryChange}
        filterText='Filter by Category'
        btnText='Add Product'
      />
      {isModalOpen && activeModal === 'add' && (
        <AddProductModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setProductInfo={setProductInfo}
        />
      )}
      {isModalOpen && activeModal === 'edit' && selectedProduct && (
        <EditProductModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          productId={selectedProduct.id}
          productName={selectedProduct.name}
          productPrice={selectedProduct.price}
          stock={selectedProduct.stock}
          categoryName={selectedProduct.category?.id || ""}
          image={selectedProduct.image}
          status={selectedProduct.status}
          description={selectedProduct.description}
          setProductInfo={setProductInfo}
        />
      )}
    </div>
  );
};

export default ModalManager;
