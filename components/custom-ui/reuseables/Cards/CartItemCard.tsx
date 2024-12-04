"use client"

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { CartItemType, ProductType } from "@/types";

interface CartItemCardProps {
  item: CartItemType;
  productDetail: ProductType | null;
  onIncrement: (item: CartItemType) => void;
  onDecrement: (item: CartItemType) => void;
  onRemove: (productId: string) => void;
}

const CartItemCard = ({ item, productDetail, onIncrement, onDecrement, onRemove }: CartItemCardProps) => {

  return (
    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start">
      <div className="flex flex-row space-x-4 ">
        <div className='aspect-video flex-shrink-0 relative'>
          <Image
            src={productDetail?.image || "/images/placeholder.png"}
            alt="product-image" width={64} height={64}
            className="rounded-md" />
        </div>
        <div className="">
          <h3 className="font-medium text-sm">{productDetail?.name || item.name}</h3>
          <p className="text-sm text-muted-foreground">
            ${productDetail?.sellingPrice?.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-1 md:space-x-2 ">
        <Button aria-label='decrement'
          variant="outline" size="sm" onClick={() => onDecrement(item)}>
          <FaMinus className="h-2 w-2" />
        </Button>
        <span>{item.quantity}</span>
        <Button aria-label="increment" variant="outline" size="sm" onClick={() => onIncrement(item)}>
          <FaPlus className="h-2 w-2" />
        </Button>
        <Button aria-label='remove'
          variant="destructive" size="sm" onClick={() => onRemove(item.productId)}>
          <FaTrash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
};

export default CartItemCard;
