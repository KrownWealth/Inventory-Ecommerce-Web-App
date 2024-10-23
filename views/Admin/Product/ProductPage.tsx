"use client"

import React, { useState, useEffect } from 'react';
import { ModalManager, ProductsPagination, ProductTableTwo, PageHead, InputSearch, DatePickerWithRange } from '@/components/custom-ui/reuseables';
import Link from 'next/link';
import { ProductsType } from '@/types';
import { toastNotification } from '@/lib';
import { DateRange } from 'react-day-picker';
import { useRouter } from 'next/navigation';

const AdminProductView = ({ searchParams }: { searchParams?: { query?: string; page?: string; }; }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'add' | 'edit' | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductsType | null>(null);
  const [productInfo, setProductInfo] = useState<ProductsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 8, 1),
    to: new Date(Date.now()),
  });

  const router = useRouter();
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/fetch-products`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProductInfo(data.products);
      setTotalPages(data.totalPages);
    } catch (error: any) {
      setError('Failed to load products. Please check your network and try again.'); 
    } finally {
      setIsLoading(false);
    }
  };

  const searchProducts = async (query = '', page = 1, category = '') => {
    setIsLoading(true);
    setError(null); 
    try {
      const response = await fetch(`/api/search-products?query=${query}&page=${page}&category=${category}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to search products');
      }

      const data = await response.json();
      setProductInfo(data.products);
      setTotalPages(data.totalPages);
    } catch (error: any) {
      setError('Failed to search products. Please check your network and try again.'); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (categoryId: string | undefined) => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    } else {
      setSelectedCategory(null);
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

  const handleSearchCategoryAndPagination = (query: string, page: number, category: string | null) => {
    const params = new URLSearchParams({
      query: query || '',
      category: category || '',
      page: String(page),
    });
    router.push(`/dashboard/products?${params.toString()}`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (query) {
      searchProducts(query, currentPage, selectedCategory || '');
    } else {
      fetchProducts();
    }
  }, [selectedCategory, query, currentPage]);

  return (
    <div className="py-4">
      <header className="border-b ">
        <div className="p-4 flex h-[75px] items-center justify-between bg-muted/40 px-6">
          <Link href="#" className="lg:hidden" prefetch={false}>
            <span className="sr-only">Home</span>
          </Link>
          <PageHead pageTitle="Products" />
          <InputSearch placeholder="Search for products here..." onSearch={(searchQuery) => searchProducts(searchQuery, currentPage, selectedCategory || '')} />
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
      </header>

      <div className="p-4">
        <ModalManager
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedProduct={selectedProduct}
          activeModal={activeModal}
          handleAddProductOpen={handleAddProductOpen}
          setProductInfo={setProductInfo}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
        <div className="flex flex-col">
          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <img src="/images/spinner.svg" alt="loading" className="mx-auto" />
                <p className="text-muted-foreground mt-2">Loading products...</p>
              </div>
            </div>
          ) : error ? ( 
            <div className="text-center text-red-500 pt-10">{error}</div>
          ) : productInfo.length > 0 ? (
            productInfo.map((product) => (
              <div key={product.id} className="mb-4">
                <ProductTableTwo
                  productId={product.id || 'Unknown ID'}
                  productName={product.name || 'Unknown Product'} 
                  costPrice={product.costPrice || 0}
                  sellingPrice={product.sellingPrice || 0} 
                  productImg={product.image || '/images/default-product.png'} 
                  productDescription={product.description || 'No description available.'}
                  categoryName={product.category?.name || 'No Category'} 
                  createdDate={product.createdAt || new Date()} 
                  updatedDate={product.updatedAt || new Date()} 
                  onEdit={() => handleEditProductOpen(product)}
                  onDelete={() => handleDeleteProduct(product.id as string)}
                />
              </div>
            ))
          ) : (
            <div className="text-center pt-10">No products available.</div>
          )}

          <div className="mt-5 flex w-full justify-center">
            <ProductsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page: number) => handleSearchCategoryAndPagination(query, page, selectedCategory)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductView;
