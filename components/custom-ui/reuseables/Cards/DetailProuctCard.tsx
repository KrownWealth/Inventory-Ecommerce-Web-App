"use client"
import { useState,useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { Satoshi_Bold, Satoshi_Medium } from "@/lib/fonts"
import { cn, FormattedPrice } from "@/lib"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MdFavoriteBorder } from 'react-icons/md';


interface DetailedProductCardProps{
  image: string
  name: string
  category?: string
  rating: string
  totalRating: string
  sellingPrice: number 
  productId: string
}



export const DetailedProductCard:React.FC<DetailedProductCardProps> = ({productId, image, name, category, sellingPrice, rating, totalRating }) => {

  const router = useRouter();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`/api/reviews/${productId}`);
      const data = await response.json();
      setReviews(data);
    };

    fetchReviews();
  }, [productId]);


  return(
   <section className='container mt-10'>
     <Card className="bg-white border-none shadow-none flex flex-row justify-between gap-x-20">
      <div className="flex items-center w-1/2 ">
        <Image src={image} alt={name} width={500} height={500} className="w-full bg-cover" />
      </div>

      <div className="flex flex-col w-1/2">
      <div className="flex justify-between">
         <h2 className={cn("font-semibold text-2xl", Satoshi_Bold.className)}>{category}</h2>
        <p className={cn("text-gray-400 text-sm", Satoshi_Medium.className)}>{productId}</p>
      </div>

        <h2 className={cn("font-semibold text-2xl", Satoshi_Bold.className)}>{name}</h2>
        <div className="flex gap-2">
          <span>{rating}</span>
          <p>{totalRating}</p>
        </div>
        <h2 className={cn("text-xl font-semibold", Satoshi_Bold.className)}>{FormattedPrice(sellingPrice)}</h2>
        <div className="flex gap-4">
          <Button className={cn("text-white font-bold w-full mb-4 hover:bg-gray-700", Satoshi_Medium.className)}>
          View Details</Button>
          <Button>
            <MdFavoriteBorder className="w-6 h-6" />
          </Button>
        </div>
         <div>
              <p className="text-green-600">Free delivery on orders over $500</p>
            </div>
      </div>

    </Card>
   
    
     <hr className="w-full bg-gray-400 h-[1px]"/>
   </section>
  )
}