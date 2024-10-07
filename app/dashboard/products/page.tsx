import { AdminProductView } from '@/views'; 
interface ProductPageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

const ProductPage = async ({ searchParams }: ProductPageProps) => {


  return (
    
      <AdminProductView searchParams={searchParams} />
   
  );
};

export default ProductPage;
