"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn, FormattedPrice, toastNotification } from "@/lib";
import { ProductType } from "@/types";
import { StarRating } from "../Rating/starRating";
import { useRouter } from "next/navigation";
import { useCart } from '@/context/CartContext';
import { useSession } from "next-auth/react";
import { FaMinus, FaPlus } from "react-icons/fa";
import DetailedProductSkeleton from "../Skeleton/detailProductSkleton";
import ThreeDotsLoader from "../Loader/threeDotLoader";


interface DetailedProductCardProps {
  slug: string;
}

export const DetailedProductCard: React.FC<DetailedProductCardProps> = ({ slug }) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);
  const [totalRating, setTotalRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: session, status } = useSession() || {};
  const userId = status === "authenticated" ? session?.user?.id : null;

  const router = useRouter();
  const { addToCart } = useCart() || {};;


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${slug}`);
        if (!response.ok) throw new Error("Product not found.");
        const data: ProductType = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  useEffect(() => {
    const fetchRating = async () => {
      if (!product) return;

      try {
        const response = await fetch(`/api/reviews/${product.id}`);
        if (!response.ok) throw new Error("Reviews not found.");
        const data = await response.json();
        setReviews(data);

        const total = data.reduce((acc: number, review: any) => acc + review.rating, 0);
        setTotalRating(total);
        setReviewCount(data.length);

        const average = data.length > 0 ? total / data.length : 0;
        setAverageRating(average);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchRating();
  }, [product]);


  const productId = product?.id;
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleBuyNow = async () => {
    if (product && userId !== null) {
      const cartItem = {
        productId: product.id,
        name: product.name,
        image: product.image || '/default-image.jpg',
        sellingPrice: product.sellingPrice ?? 0,
        quantity,
        userId: userId,
      };

      try {
        await addToCart(cartItem);

        router.push(`/frontend/checkout/`);
        toastNotification("success", "top-right", undefined, {
          message: "Item added to cart, going to checkout",
        });
      } catch (error: any) {
        console.error("Error adding to cart:", error);
        toastNotification("error", "top-right", undefined, {
          message: error.message || "An error occurred",
        });
      }
    } else {
      console.error("Product or userId not found.");
    }
  };


  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <ThreeDotsLoader color="#ffffff" />
        <p className="text-muted-foreground mt-2">Laoding product details...</p>
      </div>
    </div>
  );

  if (status === "unauthenticated") {
    return <div>You must be logged in to view this page.</div>;
  }

  if (!product) return <div>Product not found.</div>;

  return (
    <section className="mt-10">
      <div
        className="flex flex-col md:flex-row md:justify-between md:gap-x-20">
        <div className="flex items-center w-full md:w-1/2">
          <Image src={product.image || "/images/image-placeholder.png"}
            alt={product.name}
            layout="responsive"
            width={500}
            height={500}
            className="w-full bg-cover" />
        </div>
        <div className="flex flex-col w-full md:w-1/2 space-y-6">

          <div className="grid grid-cols-2">
            <Label label="Category" />
            <DetailText text={product.category?.name || "N/A"} />
          </div>

          <div className="grid grid-cols-2">
            <Label label="ID" />
            <DetailText text={product.id} />
          </div>

          <div className="grid grid-cols-2">
            <Label label="Product Name" />
            <DetailText text={product.name} />
          </div>
          <div className="grid grid-cols-2">
            <Label label="Total Rating" />
            <DetailText text={`${averageRating.toFixed(1)} (${reviewCount} reviews)`} />
            <StarRating rating={averageRating} />
          </div>
          <div className="grid grid-cols-2">
            <Label label="Available Stock" /> <DetailText text={product.stock} />
          </div>
          <div className="grid grid-cols-2">
            <Label label="Price" /> <DetailText text={FormattedPrice(product.sellingPrice ?? 0)} />
          </div>
          <div className="grid grid-cols-2">
            <Label label="Short Description" /> <DetailText text={product.description} />
          </div>

          <div className="flex items-center gap-4">
            <Button
              aria-label="decrement"
              variant="outline"
              size="icon"
              onClick={handleDecrement}
            >
              <FaMinus className="h-2 w-2" />
            </Button>
            <span>{quantity}</span>
            <Button
              aria-label="increment"
              variant="outline"
              size="icon"
              onClick={handleIncrement}
            >
              <FaPlus className="h-2 w-2" />
            </Button>
          </div>


          <div className="flex gap-4">
            <Button
              aria-label="buy-now"
              onClick={handleBuyNow}
              className="font-satoshi-medium text-white font-bold w-full mb-4 hover:bg-gray-700">
              {loading ? (
                <>

                  <ThreeDotsLoader color="#ffffff" />
                </>
              ) : (
                <span> Buy Now</span>
              )}
            </Button>
          </div>
          <p className="text-green-600">Free delivery on orders over $500</p>
        </div>
      </div>
      <hr className="w-full bg-gray-400 h-[1px]" />
    </section>
  );
};



const Label: React.FC<{ label: string }> = ({ label }) => (
  <span className="font-satoshi-black">{label}:</span>
);

const DetailText: React.FC<{ text: string | number }> = ({ text }) => (
  <span className={cn("font-satoshi-medium")}>{text}</span>
);
