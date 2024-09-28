"use client";

import React, { useState, useEffect } from 'react';
import { ModalManager, ProductTableTwo } from '@/components/custom-ui/reuseables';
import { ProductsType } from '@/types';
import { toastNotification } from '@/lib';

const AdminProductView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'add' | 'edit' | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductsType | null>(null);
  const [productInfo, setProductInfo] = useState<ProductsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

const fetchProducts = async () => {
  setIsLoading(true);
  try {
    const response = await fetch(`/api/fetch-products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    setProductInfo(data.products);
    console.log("Products in view:", data);

    toastNotification('success', 'top-right', undefined, {
      message: 'Products fetched successfully',
    });
  } catch (error: any) {
    toastNotification('error', 'top-right', undefined, {
      message: error.message || 'Failed to fetch products',
    });
  } finally {
    setIsLoading(false);
  }
};


  const handleEditProductOpen = (product: ProductsType) => {
    setSelectedProduct(product);
    setActiveModal('edit');
    setIsModalOpen(true);
  };

  const handleAddProductOpen = () => {
    setSelectedProduct(null);
    setActiveModal('add');
    setIsModalOpen(true);
  };

 const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/delete-products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Remove the product from the UI without refetching everything
      setProductInfo((prevProducts) => prevProducts.filter((product) => product.id !== id));

      toastNotification('success', 'top-right', undefined, {
        message: 'Product deleted successfully',
      });
    } catch (error: any) {
      toastNotification('error', 'top-right', undefined, {
        message: error.message || 'Failed to delete product',
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <ModalManager
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedProduct={selectedProduct}
        activeModal={activeModal}
        handleAddProductOpen={handleAddProductOpen}
        setProductInfo={setProductInfo}
      />
      <div className="flex flex-col">
        {isLoading ? (
          <div className="text-center">Loading products...</div>
        ) : productInfo.length > 0 ? (
          productInfo.map((product) => (
            <div key={product.id} className="mb-4">
              <ProductTableTwo
                productId={product.id}
                productName={product.name}
                productPrice={product.price}
                productImg={product.image}
                productDescription={product.description}
                categoryName={product.category ? product.category.name : "No Category"}
                createdDate={product.createdAt}
                updatedDate={product.updatedAt}
                onEdit={() => handleEditProductOpen(product)}
                onDelete={() => handleDeleteProduct(product.id)}
              />
            </div>
          ))
        ) : (
          <div className="text-center">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default AdminProductView;
