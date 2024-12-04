import { CartItemCard } from '@/components/custom-ui/reuseables'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'


vi.mock('next-auth/react', () => ({
  useSession: vi.fn().mockReturnValue({
    data: { user: { name: 'John Doe' } },
    status: 'authenticated',
  }),
}));


vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));



describe('CartItemCard Component', () => {

  const mockOnIncrement = vi.fn();
  const mockOnDecrement = vi.fn();
  const mockOnRemove = vi.fn();

  const mockProductDetail = {
    id: '1234',
    image: '/images/placeholder.png',
    name: 'Sample Product',
    sellingPrice: 100,
    stock: 5,
    slug: 'sample-product',
    category: {
      id: '1',
      name: 'Sample Category',
    },
    description: 'A sample product description',
    status: 'published',
    rating: 5,
    reviews: [{ rating: 4, comment: 'Great product!', user: 'user-1' }],
  };

  const mockItem = {
    id: 1,
    productId: 'prod-123',
    userId: 'user-1',
    quantity: 2,
    sellingPrice: 100,
    totalPrice: 200,
    image: '/images/placeholder.png',
    name: 'Sample Product',
    product: mockProductDetail,
  };


  beforeEach(() => {
    vi.clearAllMocks();
  });


  it('should render cart items card with item, product details, increment, decrement, and remove button ', () => {
    render(<CartItemCard
      item={mockItem}
      productDetail={mockProductDetail}
      onDecrement={mockOnDecrement}
      onIncrement={mockOnIncrement}
      onRemove={mockOnRemove} />)

    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByAltText('product-image')).toHaveAttribute(
      'src',
      '/images/placeholder.png'
    );
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should render all buttons and trigger actions correctly', () => {
    render(
      <CartItemCard
        item={mockItem}
        productDetail={mockProductDetail}
        onDecrement={mockOnDecrement}
        onIncrement={mockOnIncrement}
        onRemove={mockOnRemove}
      />
    );

    const incrementButton = screen.getByLabelText('increment');
    const decrementButton = screen.getByLabelText('decrement');
    const removeButton = screen.getByLabelText('remove');

    expect(incrementButton).toBeInTheDocument();
    expect(decrementButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(incrementButton);
    expect(mockOnIncrement).toHaveBeenCalledTimes(1);
    expect(mockOnIncrement).toHaveBeenCalledWith(mockItem);

    fireEvent.click(decrementButton);
    expect(mockOnDecrement).toHaveBeenCalledTimes(1);
    expect(mockOnDecrement).toHaveBeenCalledWith(mockItem);

    fireEvent.click(removeButton);
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    expect(mockOnRemove).toHaveBeenCalledWith(mockItem.productId);
  });



  it('should render and trigger the increment button', () => {
    render(
      <CartItemCard
        item={mockItem}
        productDetail={mockProductDetail}
        onDecrement={mockOnDecrement}
        onIncrement={mockOnIncrement}
        onRemove={mockOnRemove}
      />
    );


    const incrementButton = screen.getByLabelText('increment');
    expect(incrementButton).toBeInTheDocument();
    incrementButton.click();
    expect(mockOnIncrement).toHaveBeenCalledTimes(1);
    expect(mockOnIncrement).toHaveBeenCalledWith(mockItem);
  });

  it('should render and trigger the decrement button', () => {
    render(
      <CartItemCard
        item={mockItem}
        productDetail={mockProductDetail}
        onDecrement={mockOnDecrement}
        onIncrement={mockOnIncrement}
        onRemove={mockOnRemove}
      />
    );

    // Test the decrement button
    const decrementButton = screen.getByLabelText('decrement');
    expect(decrementButton).toBeInTheDocument();
    decrementButton.click();
    expect(mockOnDecrement).toHaveBeenCalledTimes(1);
    expect(mockOnDecrement).toHaveBeenCalledWith(mockItem);
  });

  it('should render and trigger the remove button', () => {
    render(
      <CartItemCard
        item={mockItem}
        productDetail={mockProductDetail}
        onDecrement={mockOnDecrement}
        onIncrement={mockOnIncrement}
        onRemove={mockOnRemove}
      />
    );

    // Test the remove button
    const removeButton = screen.getByLabelText('remove');
    expect(removeButton).toBeInTheDocument();
    removeButton.click();
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    expect(mockOnRemove).toHaveBeenCalledWith(mockItem.productId);
  });

});