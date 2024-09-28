import { AdminProductView } from '@/views';
import Link from 'next/link';
import { PageHead, DatePickerWithRange, InputSearch } from '@/components/custom-ui/reuseables';

const ProductPage = ({ searchParams }: { searchParams: { query?: string; page?: string; } }) => {
  return (
    <div className="flex flex-col space-y-8 px-4 md:px-8">
      <header className="py-4 flex h-[75px] items-center justify-between border-b bg-muted/40">
        <Link href="#" className="lg:hidden" prefetch={false}>
          <span className="sr-only">Home</span>
        </Link>
        <PageHead pageTitle="Products" />
        <InputSearch placeholder="Search for products here..." />
        <DatePickerWithRange />
      </header>
      <AdminProductView  />
    </div>
  );
};

export default ProductPage;
