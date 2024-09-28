import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { Satoshi_Bold, Satoshi_Medium } from "@/lib/fonts"
import { cn, FormattedPrice } from "@/lib"


interface ProductCardProps{
  imgSrc: string
  productName: string
  productCategory: string
  //productRating: string
  productPrice: number
}
export const ProductCard:React.FC<ProductCardProps> = ({productCategory,productName,productPrice, imgSrc}) => {
  return(
   <div>
     <Card className="bg-white border-none shadow-none h-[600px]">
      <div className="w-full flex items-center">
        <Image src={imgSrc} alt="product-image" width={500} height={500} className="w-full bg-cover" />
      </div>
      <CardContent className="flex flex-col space-y-2">
        <h2 className={cn("font-semibold text-2xl", Satoshi_Bold.className)}>{productName}</h2>
        <p className={cn("text-gray-400 text-sm", Satoshi_Medium.className)}>{productCategory}</p>
        {/* <p>{productRating}</p> */}
        <h2 className={cn("text-xl font-semibold", Satoshi_Bold.className)}>{FormattedPrice(productPrice)}</h2>
      </CardContent>
      <CardFooter>
        <Button className={cn("text-white font-bold w-full mb-4 hover:bg-gray-700", Satoshi_Medium.className)}>View Details</Button>
       
      </CardFooter>
    </Card>
     <hr className="w-full bg-gray-400 h-[1px]"/>
   </div>
  )
}