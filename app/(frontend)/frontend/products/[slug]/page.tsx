import React from 'react';
import { DetailedProductCard } from '@/components/custom-ui/reuseables';
import { ProductReview } from '@/views';
import { db, cn } from '@/lib';
import connectMongoDb from '@/lib/mongodb';
import Review from '@/models/reviewModel';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { Satoshi_Bold } from '@/lib/fonts';

interface ReviewObject {
  userId: number;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface User {
  id: string;
  username: string;
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

  const reviewsWithUsernames = await Promise.all(
    productReviews?.reviews.map(async (review: ReviewObject) => {
      let username = 'Unknown User';

      if (session && session.user) {
        const sessionUserId = Number(session.user.id);

        if (review.userId === sessionUserId) {
          username = session.user.name || 'Unknown User';
        } else {
          try {
            const user = await db.user.findUnique({
              where: { id: Number(review.userId) },
              select: { username: true },
            });
            username = user?.username || 'Unknown User';
          } catch (error) {
            console.error('Failed to fetch user:', error);
            username = 'Unknown User';
          }
        }
      }
      return {
        ...review,
        username,
      };
    }) || []
  );


  return (
    <div className="w-full mt-10">
      <div className="max-w-7xl bg-white px-8 md:px-12 mx-auto">
        <h2 className={cn('font-bold text-2xl md:text-3xl lg:text-4xl', Satoshi_Bold.className)}>Product Detail</h2>
        <DetailedProductCard slug={slug} />

        <section className="mt-10">
          <div className="flex items-center justify-start gap-4 pb-8">
            <h2 className="font-semibold text-lg">Reviews</h2>
            <h2 className="font-semibold text-lg">Discussion</h2>
          </div>

          <ProductReview productId={productId} />

          {/* Show existing reviews */}
          <section className="gap-4 py-8">
            <h2 className='font-semibold text-lg'>Customer Reviews</h2>
            {reviewsWithUsernames.length > 0 ? (
              reviewsWithUsernames.map((review: ReviewObject & { username: string }, index: number) => (
                <div key={index}>
                  <p><strong>{review.username}</strong> says:</p>
                  <p>{review.comment}</p>
                  {/* <p>Rating: {review.rating}</p> */}
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </section>
        </section>
      </div>
    </div>
  );
};

export default SingleProductPage;
