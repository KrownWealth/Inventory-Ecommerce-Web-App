"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Satoshi_Bold, Satoshi_Medium } from "@/lib/fonts";
import { cn, FormattedPrice } from "@/lib";
import { ProductType } from "@/types";
import { StarRating } from "../Rating/starRating";
import { useRouter } from "next/navigation";
import { useCart } from '@/context/CartContext';


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

  const router = useRouter();
  const { addToCart } = useCart();

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

  const handleBuyNow = () => {
    if (product) {

      const cartItem = {
        id: product.id,
        name: product.name,
        image: product.image || '/default-image.jpg',
        price: product.sellingPrice ?? 0,
        quantity: 1
      };
      addToCart(cartItem);
      router.push(`/frontend/checkout/${productId}`);
      console.log("Product id", productId)
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <img src="/images/spinner.svg" alt="loading" className="mx-auto" />
        <p className="text-muted-foreground mt-2">Fetching product details...</p>
      </div>
    </div>
  );

  if (!product) return <div>Product not found.</div>;

  return (
    <section className="mt-10">
      <div className="flex flex-col md:flex-row md:justify-between md:gap-x-20">
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
          <div className="flex gap-4">
            <Button onClick={handleBuyNow}
              className={cn("text-white font-bold w-full mb-4 hover:bg-gray-700", Satoshi_Medium.className)}>
              Buy Now
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
  <span className={cn("font-semibold", Satoshi_Bold.className)}>{label}:</span>
);

const DetailText: React.FC<{ text: string | number }> = ({ text }) => (
  <span className={cn("font-medium ", Satoshi_Medium.className)}>{text}</span>
);
