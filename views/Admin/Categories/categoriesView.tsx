"use client"

import React, { useState, useEffect } from 'react';
import { AddCategoryModal, PageHead, CategoryTable, ThreeDotsLoader } from '@/components/custom-ui/reuseables';
import { Button } from '@/components/ui/button';
import { toastNotification } from '@/lib';



const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://inventory-ecommerce-web.vercel.app"

const CategoryView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/fetch-categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/delete-category/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setCategories((prevProducts) => prevProducts.filter((product) => product.id !== id));
      toastNotification('success', 'top-right', undefined, {
        message: 'Product deleted successfully',
      });
    } catch (error: any) {
      toastNotification('error', 'top-right', undefined, {
        message: error.message || 'Failed to delete product',
      });
    }
  };

  return (
    <div className="px-8 py-5">
      <div className="flex justify-between">
        <PageHead pageTitle="Category" />
        <Button onClick={() => setIsModalOpen(true)} className="text-white mt-4 text-sm md:text-lg">
          Add Category
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <ThreeDotsLoader color="000000" />
            <p className="text-muted-foreground mt-2">Loading categories...</p>
          </div>
        </div>
      ) : (
        <CategoryTable categories={categories} onDelete={handleDeleteCategory} />
      )}

      <AddCategoryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setCategoryInfo={setCategories}
      />
    </div>
  );
};

export default CategoryView;
