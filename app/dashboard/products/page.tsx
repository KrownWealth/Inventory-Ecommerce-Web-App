import { AdminProductView } from '@/views'; 
interface ProductPageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

const ProductPage = async ({ searchParams }: ProductPageProps) => {


  return (
    <div className="flex flex-col space-y-8 px-4 md:px-8">
      <AdminProductView searchParams={searchParams} />
    </div>
  );
};

export default ProductPage;
