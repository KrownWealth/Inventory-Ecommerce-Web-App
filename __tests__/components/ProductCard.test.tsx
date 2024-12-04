import { ProductCard } from '@/components/custom-ui/reuseables';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from "vitest"


const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 'sample-product',
    name: 'Sample Product',
    image: '/images/sample-product.png',
    slug: 'sample-product',
    category: 'Armchair',
    sellingPrice: 100,
    rating: 5,
    reviewCount: 5,
  };

  it('renders product details correctly', () => {
    render(
      <ProductCard
        id={mockProduct.id}
        name={mockProduct.name}
        image={mockProduct.image}
        slug={mockProduct.slug}
        category={mockProduct.category}
        sellingPrice={mockProduct.sellingPrice}
        rating={mockProduct.rating}
        reviewCount={mockProduct.reviewCount}
      />
    );

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText(/ratings/i)).toBeInTheDocument();
    expect(screen.getByText(/\(\d+\)/)).toBeInTheDocument(); // Check for rating count
    expect(screen.getByText('$100.00')).toBeInTheDocument(); // Assuming `FormattedPrice` formats as "$100.00"
    expect(screen.getByRole('img', { name: mockProduct.name })).toBeInTheDocument();
  });

  it('redirects to product detail page on "View Details" button click', () => {
    render(
      <ProductCard
        id={mockProduct.id}
        name={mockProduct.name}
        image={mockProduct.image}
        slug={mockProduct.slug}
        category={mockProduct.category}
        sellingPrice={mockProduct.sellingPrice}
        rating={mockProduct.rating}
        reviewCount={mockProduct.reviewCount}
      />
    );

    const button = screen.getByRole('button', { name: /view details/i });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith(`/frontend/products/${mockProduct.slug}`);
  });

  it('contains a unique link to the product detail page', () => {
    render(
      <ProductCard
        id={mockProduct.id}
        name={mockProduct.name}
        image={mockProduct.image}
        slug={mockProduct.slug}
        category={mockProduct.category}
        sellingPrice={mockProduct.sellingPrice}
        rating={mockProduct.rating}
        reviewCount={mockProduct.reviewCount}
      />
    );

    const link = screen.getByRole('link', {
      name: /sample product/i,
    });
    expect(link.getAttribute('href')).toBe(`/frontend/products/${mockProduct.slug}`);
  });
});
