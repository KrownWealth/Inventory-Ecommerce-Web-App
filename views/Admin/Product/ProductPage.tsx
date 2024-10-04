"use client";

import React, { useState, useEffect } from 'react';
import { ModalManager, ProductsPagination, ProductTableTwo, PageHead, InputSearch, DatePickerWithRange } from '@/components/custom-ui/reuseables';
import Link from 'next/link';
import { ProductsType } from '@/types';
import { toastNotification } from '@/lib';
import { DateRange } from 'react-day-picker';
import { useRouter } from 'next/navigation';


const AdminProductView = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'add' | 'edit' | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductsType | null>(null);
  const [productInfo, setProductInfo] = useState<ProductsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  //filter by date 
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 8, 1),
    to: new Date(2024, 8, 30), 
  });

  const router = useRouter();
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 10;

  const fetchProducts = async (query = '', page = 1, category = '', date?: DateRange) => {
  setIsLoading(true);
  try {
    const response = await fetch(`/api/fetch-products?query=${query}&page=${page}&limit=${itemsPerPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    let filteredProducts = data.products;

    if (category) {
        filteredProducts = filteredProducts.filter((product: ProductsType) => {
          return product.category?.id === category;
        });
      }

     if (!query && date?.from && date?.to) {
      filteredProducts = filteredProducts.filter((product: ProductsType) => {
        const productDate = new Date(product.updatedAt);
        return productDate >= date.from! && productDate <= date.to!;
      });
    }

    setProductInfo(filteredProducts);
    setTotalPages(data.totalPages);

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
    router.push(`/admin/products?${params.toString()}`);
  };

  useEffect(() => {
    fetchProducts(query, currentPage, selectedCategory || '', date);
  }, [query, currentPage, selectedCategory, date]);

  return (
    <div className="p-4">
      <header className="py-4 flex h-[75px] items-center justify-between border-b bg-muted/40">
        <Link href="#" className="lg:hidden" prefetch={false}>
          <span className="sr-only">Home</span>
        </Link>
        <PageHead pageTitle="Products" />
        <InputSearch placeholder="Search for products here..." />
        <DatePickerWithRange date={date} setDate={setDate} />
      </header>

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
                categoryName={product.category ? product.category.name : 'No Category'}
                createdDate={product.createdAt}
                updatedDate={product.updatedAt}
                onEdit={() => handleEditProductOpen(product)}
                onDelete={() => handleDeleteProduct(product.id)}
              />
            </div>
          ))
        ) : (
          <div className="text-center">No products available.</div>
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
  );
};

export default AdminProductView;
