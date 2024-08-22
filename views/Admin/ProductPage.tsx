"use client";

import React, { useState, useEffect } from 'react';
import { ModalManager, ProductTableTwo, PageHead, DatePickerWithRange, InputSearch } from '@/components/custom-ui/reuseables';
import { ProductsType } from '@/types';
import { Button } from '@/components/ui/button';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { fetchProductsPages } from '@/lib';
import { ProductsPagination } from '@/components/custom-ui/reuseables';

const ClientProductPage = ({ searchParams }: { searchParams?: { query?: string; page?: string; }; }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [activeModal, setActiveModal] = useState<'add' | 'edit' | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductsType | null>(null);
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [totalPages, setTotalPages] = useState(1);

   const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch products with filtering and pagination
      const response = await fetchProductsPages({ query, page: currentPage });

      // Set products and total pages
      setProducts(response.data);
      setTotalPages(response.pages);
    };

    fetchProducts();
  }, [query, currentPage]);

  const handleEditProductOpen = (product: ProductsType) => {
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
      <header className="p-4 flex h-[75px] items-center justify-between border-b bg-muted/40">
        <Link href="#" className="lg:hidden" prefetch={false}>
          <span className="sr-only">Home</span>
        </Link>
        <div><PageHead pageTitle="Product" /></div>
        <InputSearch placeholder='Search for products here...' />
        <DatePickerWithRange />
      </header>

      <div className="p-4">
        <ModalManager
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedProduct={selectedProduct}
          activeModal={activeModal}
          handleAddProductOpen={handleAddProductOpen}
        />
        <div className="w-full py-4">
          <div className="flex space-x-2">
            <Button className="flex"><span>Search Result</span><FaTimes /></Button>
            <Button className="flex"><span>Search Result</span><FaTimes /></Button>
            <Button className="flex"><span>Search Result</span><FaTimes /></Button>
            <Button className="flex"><span>Search Result</span><FaTimes /></Button>
          </div>
        </div>

        <div className="flex flex-col">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="mb-4">
                <ProductTableTwo
                  productId={product.id}
                  productName={product.name}
                  productPrice={product.costPrice}
                  productImg={product.img}
                  productMaterial={product.material}
                  productDescription={product.description}
                  productCategory={product.category}
                />
              </div>
            ))
          ) : (
            <div className="text-center">No products found.</div>
          )}
        </div>

        <div className="mt-5 flex w-full justify-center">
          {/* Pass the `query` prop here */}
          <ProductsPagination totalPages={totalPages} currentPage={currentPage} query={query} />
        </div>
      </div>
    </div>
  );
};

export default ClientProductPage;
