import { DetailedProductCard } from '@/components/custom-ui/reuseables';
import { BreadcrumbLinks } from '@/views';
import React from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SingleProductProps {
  params: { name: string }; 
}

const SingleProduct: React.FC<SingleProductProps> = async({ params }) => {
  const productName = params.name; 

  
  const product = await prisma.product.findFirst({
    where: { name: productName },
    include: {
      category: true,
    },
  });

 
  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <BreadcrumbLinks activeLink={productName} />
      <DetailedProductCard
        productId={product.id}
        image={product.image} 
        name={product.name}
        rating='No rating'
        totalRating="0"
        category={product.category?.name} 
        sellingPrice={40}
      />

      <section className="container mt-10">
        <div className="flex items-center justify-start space-x-4">
          <h2 className="font-semibold">Product Details</h2>
          <h2 className="font-semibold">Reviews</h2>
          <h2 className="font-semibold">Discussion</h2>
        </div>
        <div className="flex justify-between mt-4">
          <select className="border rounded p-2">
            <option>Newest</option>
            <option>Oldest</option>
            <option>Highest Rated</option>
            <option>Lowest Rated</option>
          </select>
          {/* Additional product details can go here */}
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
