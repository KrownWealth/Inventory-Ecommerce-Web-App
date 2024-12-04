import { fireEvent, render, screen } from '@testing-library/react';
import { ShopBtn } from '@/components/custom-ui/reuseables';
import { vi } from 'vitest';



const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: mockPush,
  })),
}));

describe('Shop Now Button Component', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it('should render shop button with its label', () => {
    render(<ShopBtn />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Shop Now/i);
  });

  it('navigates to /frontend/products when the button is clicked', () => {
    render(<ShopBtn />);

    const button = screen.getByRole('button', { name: /Shop Now/i });

    // Simulate a click event
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/frontend/products');
  });
});
