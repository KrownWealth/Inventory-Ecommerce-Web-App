
import { DetailedProductCard, StarRating } from '@/components/custom-ui/reuseables';
import { ProductReview } from '@/views';
import { db } from '@/lib';
import connectMongoDb from '@/lib/mongodb';
import Review from '@/models/reviewModel';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';


interface ReviewObject {
  userId: string;
  username?: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface SingleProductPageProps {
  params: { slug: string };
}

const SingleProductPage: React.FC<SingleProductPageProps> = async ({ params }) => {

  const { slug } = params;
  const session = await getServerSession(authOptions);

  const productDetails = await db.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!productDetails) {
    return <div>Product not found.</div>;
  }

  const productId = productDetails?.id;

  await connectMongoDb();
  const productReviews = await Review.findOne({ productId });

  const reviews: ReviewObject[] = productReviews?.reviews || [];
  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0
    ? reviews.reduce((sum: number, review: ReviewObject) => sum + review.rating, 0) / reviewCount
    : 0;



  return (
    <div className="w-full my-10">
      <div className="max-w-7xl bg-white px-8 md:px-12 mx-auto">
        <h2 className="font-satoshi-bold text-2xl md:text-3xl lg:text-4xl">Product Detail</h2>
        <DetailedProductCard
          slug={slug}
          averageRating={averageRating}
          reviewCount={reviewCount}
        />
        <section className="mt-10">
          <div className="flex items-center justify-start gap-4 pb-8">
            <h2 className="font-semibold text-lg">Reviews</h2>
            <h2 className="font-semibold text-lg">Discussion</h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-12">

            <ProductReview productId={productId} />
            <hr className="hidden lg:inline-block w-[2px] h-auto bg-gray-200" />
            <div className="gap-4 items-start">
              <h2 className='font-semibold text-lg pb-4'>Customer Reviews</h2>
              <div className="flex flex-col gap-4">
                <p className="flex gap-2 items-center">Total Rating:   <StarRating rating={averageRating} />
                  <span> {averageRating.toFixed(1)} ({reviewCount} reviews)</span>
                </p>
              </div>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index}>
                    <p><strong>{review.username || 'Anonymous User'}</strong> says:</p>
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SingleProductPage;
