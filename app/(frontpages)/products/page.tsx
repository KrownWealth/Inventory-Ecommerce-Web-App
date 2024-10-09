import React from 'react';
import { ProductCard } from '@/components/custom-ui/reuseables';
import { Satoshi_Bold } from '@/lib/fonts';
import { cn } from '@/lib';
import { PrismaClient } from '@prisma/client';
import { ProductType } from '@/types';
import { Footer, Header } from '@/views';

const prisma = new PrismaClient();

const ProductView = async () => {
   const products = await prisma.product.findMany({
    include: {
      category: true,  
    }
  });

  return (
    <section className='container mt-10'>
      <h2 className={cn('font-bold text-4xl', Satoshi_Bold.className)}>All Products</h2>
      <div className="grid grid-cols-4 gap-8 my-8">
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            id={product.id} 
            image={product.image} 
            name={product.name} 
            sellingPrice={product.sellingPrice ?? 0} 
            category={product.category?.name || "No Category"}
          />
        ))}
      </div>
    </section>

   
  );
};

export default ProductView;
