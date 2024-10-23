import { BreadcrumbLinks } from '@/views';
import React from 'react';
import { DetailedProductCard } from '@/components/custom-ui/reuseables';


interface SingleProductPageProps {
  params: { slug: string };
}

const SingleProductPage: React.FC<SingleProductPageProps> = ({ params }) => {
  const { slug } = params;

  return (
    <>
      {/* Breadcrumb using the slug */}
      <BreadcrumbLinks activeLink={slug} />

      {/* Detailed Product Card */}
      <DetailedProductCard slug={slug} />

      {/* Additional section */}
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
        </div>
      </section>
    </>
  );
};

export default SingleProductPage;
