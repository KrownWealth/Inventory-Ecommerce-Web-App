import React from 'react';
import { ProductCard } from '@/components/custom-ui/reuseables';
import { Satoshi_Bold } from '@/lib/fonts';
import { db, cn } from '@/lib';


const ProductView = async () => {

  const products = await db.product.findMany({
    include: {
      category: true,
    },
  });

  const ratingsData = await Promise.all(
    products.map(async (product) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/${product.id}`, {
        cache: 'no-store',
      });
      const { data } = await res.json();
      return {
        productId: product.id,
        rating: data?.ratings ?? 0,
        reviewCount: data?.reviews?.length ?? 0,
      };
    })
  );

  const productRatings = ratingsData.reduce((acc, { productId, rating, reviewCount }) => {
    acc[productId] = { rating, reviewCount };
    return acc;
  }, {} as { [key: string]: { rating: number; reviewCount: number } });

  return (
    <section className="w-full mt-10">
      <div className="max-w-7xl px-8 md:px-12 mx-auto">
        <h2 className="font-satoshi-bold text-2xl md:text-3xl lg:text-4xl">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              slug={product.slug}
              id={product.id}
              image={product.image}
              name={product.name}
              sellingPrice={product.sellingPrice ?? 0}
              category={product.category?.name || "No Category"}
              rating={productRatings[product.id]?.rating || 0}
              reviewCount={productRatings[product.id]?.reviewCount || 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductView;
