
import { DetailedProductCard } from '@/components/custom-ui/reuseables';
import { ProductReview } from '@/views';
import { db } from '@/lib';
import connectMongoDb from '@/lib/mongodb';
import Review from '@/models/reviewModel';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';


interface ReviewObject {
  userId: string;
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
        const sessionUserId = session.user.id;

        if (review.userId !== sessionUserId) {
          username = "Unknown User";

        } else {
          try {
            const user = await db.user.findUnique({
              where: { id: review.userId },
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
    <div className="w-full my-10">
      <div className="max-w-7xl bg-white px-8 md:px-12 mx-auto">
        <h2 className="font-satoshi-bold text-2xl md:text-3xl lg:text-4xl">Product Detail</h2>
        <DetailedProductCard slug={slug} />

        <section className="mt-10">
          <div className="flex items-center justify-start gap-4 pb-8">
            <h2 className="font-semibold text-lg">Reviews</h2>
            <h2 className="font-semibold text-lg">Discussion</h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-12">

            <ProductReview productId={productId} />
            <hr className="hidden lg:inline-block w-[2px] h-auto bg-gray-200" />
            <div className="gap-4 items-start">
              <h2 className='font-semibold text-lg'>Customer Reviews</h2>
              {/* <div><p>Total Rating: {review.rating}</p></div> */}
              {reviewsWithUsernames.length > 0 ? (
                reviewsWithUsernames.map((review: ReviewObject & { username: string }, index: number) => (
                  <div key={index}>
                    <p><strong>{review.username}</strong> says:</p>
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
