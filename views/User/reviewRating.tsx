"use client";

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toastNotification } from '@/lib';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ThreeDotsLoader } from '@/components/custom-ui/reuseables';

interface ProductReviewProps {
  productId: string;
}


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://inventory-ecommerce-web.vercel.app"


const ProductReview: React.FC<ProductReviewProps> = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  //const [reviews, setReviews]= useState("")
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession()

  if (!session || !session.user) {
    toastNotification("error", "top-right", undefined, {
      message: "User must be logged in to submit a review.",
    });
    return;
  }

  const userId = session.user.id;
  const username = session.user.id;


  const submitReview = async () => {
    if (!rating && !comment) {
      setError('Please provide a rating or a comment.');
      return;
    }

    setLoading(true);
    setError('');

    const reviewData = { productId, userId, username, rating, comment };

    try {
      const response = await fetch(`${baseUrl}/api/reviews/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      setSuccess(true);
      setComment('');
      setRating(0);
      toastNotification("success", "top-right", undefined, {
        message: "Review submitted successfully",
      });
      router.refresh();
    } catch (error: any) {
      setError(error.message || "Failed to add review");
      toastNotification("error", "top-right", undefined, {
        message: error.message || "Failed to add review",
      });
      console.log("Faied to addreview", error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Review submitted successfully!</p>}
      <div className="flex flex-col items-start justify-start my-12">
        <div className="flex flex-row items-center space-x-4 pb-2">
          <Label className="text-sm md:text-lg">Rate this product</Label>

          <div className="flex items-center gap-x-1">
            {[...Array(5)].map((_, idx) => (
              <span key={idx}>
                {idx < (hover !== null ? hover : rating) ? (
                  <FaStar
                    onClick={() => setRating(idx + 1)}
                    onMouseEnter={() => setHover(idx + 1)}
                    onMouseLeave={() => setHover(null)}
                    className="h-6 w-6 text-yellow-500 cursor-pointer"
                  />
                ) : (
                  <FaRegStar
                    onClick={() => setRating(idx + 1)}
                    onMouseEnter={() => setHover(idx + 1)}
                    onMouseLeave={() => setHover(null)}
                    className="h-6 w-6 text-yellow-500 cursor-pointer"
                  />
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-rows-2 gap-2 mb-4">
          <Label className="text-sm md:text-lg">Submit a Review</Label>
          <textarea
            placeholder="Your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2"
            rows={4}
            cols={60}
          />
        </div>

        <Button type="button" onClick={submitReview} disabled={loading} className="px-4 py-2 text-white rounded w-full md:w-1/2">
          {loading ? (
            <>
              <ThreeDotsLoader color="#ffffff" />
              <span className="ml-2">Submitting Review...</span>
            </>
          ) : (
            <span>Submit Review</span>
          )}
        </Button>
      </div>
    </section>
  );
};

export default ProductReview;
