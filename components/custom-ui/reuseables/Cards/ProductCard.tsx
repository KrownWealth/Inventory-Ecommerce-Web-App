"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { Satoshi_Bold, Satoshi_Medium } from "@/lib/fonts"
import { cn, FormattedPrice } from "@/lib"
import Link from "next/link"
import { useRouter } from "next/navigation"


// convert to lower case, remove whitespace, special character,
const createSlug = (name: string) => {
  return name
    .toLowerCase() 
    .trim() 
    .replace(/[^a-z0-9\s-]/g, "") 
    .replace(/\s+/g, "-") 
    .replace(/-+/g, "-"); 
};

interface Review {
 id: string;
  userId: string;
  rating: number;
  review: string;
}
interface ProductCardProps {
 id: string;
  name: string;
  image: string;
  category: string;
  sellingPrice: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({id, name, image, category, sellingPrice }) => {
  const [rating, setRating] = useState('No rating');
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews?productId=${id}`);
        const reviews: Review[] = await res.json();

        if (reviews.length > 0) {
          const totalRating = reviews.reduce((acc: number, curr: Review) => acc + curr.rating, 0);
          setRating((totalRating / reviews.length).toFixed(1));
          setTotalReviews(reviews.length);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [id]);
  const router = useRouter();

   const handleDetail = () => {
    router.push(`/product/${createSlug(name)}`);
  };

  
  console.log("Product Rating")
  return(
   <div>
    <Link href={`product/${createSlug(name)}`}>
     <Card className="bg-white border-none shadow-none h-[600px]">
      <div className="w-full h-64 flex items-center">
        <Image src={image} alt={name} width={500} height={500} className="w-full bg-cover h-full" />
      </div>
      <CardContent className="flex flex-col space-y-2">
        <h2 className={cn("font-semibold text-2xl", Satoshi_Bold.className)}>{name}</h2>
        <p className={cn("text-gray-400 text-sm", Satoshi_Medium.className)}>{category}</p>

         <span>{rating}★</span>
        <span>({totalReviews} reviews)</span>
        <h2 className={cn("text-xl font-semibold", Satoshi_Bold.className)}>{FormattedPrice(sellingPrice)}</h2>
      </CardContent>
      <CardFooter>
        <Button className={cn("text-white font-bold w-full mb-4 hover:bg-gray-700", Satoshi_Medium.className)}
        onClick={handleDetail}>
          View Details</Button>
       
      </CardFooter>
    </Card>
    </Link>
    
     <hr className="w-full bg-gray-400 h-[1px]"/>
   </div>
  )
}