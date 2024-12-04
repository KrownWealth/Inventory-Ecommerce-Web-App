import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DetailedProductCard } from '@/components/custom-ui/reuseables';
import { useCart } from '@/context/CartContext';
import { vi, Mock } from 'vitest';


global.fetch = vi.fn() as Mock;

vi.mock("next-auth/react", () => ({
  useSession: vi.fn(() => ({
    data: { user: { id: "testUser" } },
    status: "authenticated",
  })),
}));

vi.mock('@/context/CartContext', () => ({
  useCart: vi.fn(() => ({
    addToCart: vi.fn(),
  })),
}));

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: mockPush,
  })),
}));


const mockProduct = {
  id: '1234',
  name: 'Sample Product',
  description: 'This is a sample product.',
  image: '/images/sample-product.png',
  stock: 10,
  sellingPrice: 100,
  category: { name: 'Electronics' },
};

const mockReviews = [
  { id: 1, rating: 4, comment: 'Great product!' },
  { id: 2, rating: 5, comment: 'Loved it!' },
];

(fetch as Mock).mockImplementation((url) => {
  if (url.includes('/api/product/')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProduct),
    });
  }
  return Promise.reject(new Error('Not Found'));
});



describe('DetailedProductCard Component', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });


  it('should renders loading spinner and text while fetching product details', async () => {
    (fetch as Mock).mockImplementationOnce(() => new Promise(() => { }));

    render(<DetailedProductCard slug="sample-slug" />);

    const loadingImg = screen.getByRole('img', { name: /loading/i });
    expect(loadingImg).toBeInTheDocument();


    const loadingText = screen.getByText(/Fetching product details.../i);
    expect(loadingText).toBeInTheDocument();
  });



  it('shoul displays "Product not found" if product API fails', async () => {
    (fetch as Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false }),
    );
    render(<DetailedProductCard slug="sample-slug" />);
    await waitFor(() => {
      expect(screen.getByText('Product not found.')).toBeInTheDocument();
    });
  });


  it('should increments and decrements quantity', async () => {
    render(<DetailedProductCard slug="sample-slug" />);

    const productName = await screen.findByText((content, element) =>
      content.includes('Sample Product')
    );
    expect(productName).toBeInTheDocument();


    const incrementButton = screen.getByLabelText('increment');
    const decrementButton = screen.getByLabelText('decrement');

    fireEvent.click(incrementButton);
    expect(screen.getByText('2')).toBeInTheDocument();


    fireEvent.click(decrementButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });


  it('should renders product details when data is fetched successfully', async () => {
    render(<DetailedProductCard slug="sample-slug" />);

    await waitFor(() => {
      screen.debug();
      expect(screen.getByText('Sample Product')).toBeInTheDocument();
    });
  });


  it('should handles "Buy Now" functionality correctly and adds items to cart also redirect to checkout', async () => {
    const mockAddToCart = vi.fn();
    (useCart as Mock).mockReturnValue({ addToCart: mockAddToCart });

    render(<DetailedProductCard slug="sample-slug" />);
    await waitFor(() => screen.getByText('Sample Product'));

    fireEvent.click(screen.getByText('Buy Now'));

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith({
        productId: mockProduct.id,
        name: mockProduct.name,
        image: mockProduct.image || '/default-image.jpg',
        sellingPrice: mockProduct.sellingPrice ?? 0,
        quantity: 1,
        userId: 'testUser',
      });

      expect(mockPush).toHaveBeenCalledWith('/frontend/checkout/');
    });
  });


});
