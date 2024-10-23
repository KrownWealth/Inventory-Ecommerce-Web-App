export type ProductType = {
  id: string;
  image: string | null;
  name: string;
  sellingPrice: number | undefined; 
  stock: number;
  slug: string;
  category: {
    id: string;
    name: string;
  } | null;
  description: string;
  status: string;
  rating: string;
  review: string
};


export interface CategoryType {
    id: string;
    name: string;
}

export type ProductsType={
  id: string
  image: string | null; 
  name: string
  costPrice: number
  markupPercentage: number;
  sellingPrice: number | undefined;
  stock: number
  slug?: string
  category: {
        id: string;
        name: string;
    } | null;
  description: string
 status: string;
createdAt?: Date
updatedAt?: Date
}

