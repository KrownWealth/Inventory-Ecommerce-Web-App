"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { cn, FormattedPrice } from "@/lib"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { StarRating } from "../Rating/starRating"




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
  slug: string;
  rating: number;
  reviewCount: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, category, sellingPrice, slug, rating, reviewCount }) => {


  const router = useRouter();

  const handleDetail = () => {
    router.push(`/frontend/products/${slug}`);
  };


  return (
    <div>
      <Link href={`/frontend/products/${slug}`}>
        <Card className="bg-white border-none shadow-none max-h-[600px]">
          <div className="w-full h-64 flex items-center">
            <Image src={image} alt={name} width={500} height={500} className="w-full bg-cover h-full" />
          </div>
          <CardContent className="flex flex-col space-y-2">
            <h2 className="font-satoshi-bold text-2xl">{name}</h2>
            <p className="font-satoshi-medium text-gray-400 text-sm">{category}</p>

            <div className="flex space-x-2">
              <StarRating rating={reviewCount} />
              <span>({rating})</span>
              <span>ratings</span>
            </div>

            <h2 className="text-xl font-satoshi-bold">{FormattedPrice(sellingPrice)}</h2>
          </CardContent>
          <CardFooter>
            <Button className="font-satoshi-medium text-white font-bold w-full mb-4 hover:bg-gray-700"
              onClick={handleDetail}>
              View Details</Button>

          </CardFooter>
        </Card>
      </Link>

      <hr className="w-full bg-gray-400 h-[1px]" />
    </div>
  )
}