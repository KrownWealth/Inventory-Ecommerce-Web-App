"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Satoshi_Bold, Satoshi_Medium } from "@/lib/fonts";
import { cn, FormattedPrice } from "@/lib";
import { MdFavoriteBorder } from "react-icons/md";
import { ProductType } from "@/types";

interface DetailedProductCardProps {
  slug: string;
}

export const DetailedProductCard: React.FC<DetailedProductCardProps> = ({ slug }) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);
  const [totalRating, setTotalRating] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${slug}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Product not found.");
        const data: ProductType = await response.json();
        console.log('Fetched Product Data:', data);

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
    const fetchReviews = async () => {
      if (!product) return;

      try {
        const response = await fetch(`/api/reviews/${product.id}`);
        if (!response.ok) throw new Error("Reviews not found.");
        const data = await response.json();
        setReviews(data);

        // Calculate total ratings here if reviews have a rating field
        const total = data.reduce((acc: number, review: any) => acc + review.rating, 0);
        setTotalRating(total);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [product]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <section className='container mt-10'>
      <Card className="bg-white border-none shadow-none flex flex-row justify-between gap-x-20">
        <div className="flex items-center w-1/2">
          <Image src={product.image || ""} alt={product.name} width={500} height={500} className="w-full bg-cover" />
        </div>
        <div className="flex flex-col w-1/2">
          <div className="flex justify-between">
            <h2 className={cn("font-semibold text-2xl", Satoshi_Bold.className)}>{product.category?.name}</h2>
            <p className={cn("text-gray-400 text-sm", Satoshi_Medium.className)}>{product.id}</p>
          </div>
          <h2 className={cn("font-semibold text-2xl", Satoshi_Bold.className)}>{product.name}</h2>
          <div className="flex gap-2">
            <span>{product.rating}</span>
            <p>{totalRating}</p> {/* Displaying total rating */}
          </div>
          <p>Available Stock: {product.stock}</p>
          <h2 className={cn("text-xl font-semibold", Satoshi_Bold.className)}>{FormattedPrice(product.sellingPrice ?? 0)}</h2>
          <div className="flex gap-4">
            <Button className={cn("text-white font-bold w-full mb-4 hover:bg-gray-700", Satoshi_Medium.className)}>
              View Details
            </Button>
            <Button>
              <MdFavoriteBorder className="w-6 h-6" />
            </Button>
          </div>
          <div>
            <p className="text-green-600">Free delivery on orders over $500</p>
          </div>
        </div>
      </Card>
      <hr className="w-full bg-gray-400 h-[1px]" />
    </section>
  );
};
