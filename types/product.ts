export type ProductType={
  id: string
  image: string
  name: string
  costPrice: number
  selingPrice: number
  category: {
    id: string;
    name: string;
  } | null; 
  description: string
  // rating?: number
}

export interface CategoryType {
    id: string;
    name: string;
}

export type ProductsType={
  id: string
  image: string; 
  name: string
  costPrice: number
  sellingPrice: number
  stock: number
  category: {
        id: string;
        name: string;
    } | null;
  description: string
  status: string
  createdAt: Date
  updatedAt: Date
}

