import { fireEvent, render, screen } from '@testing-library/react';
import { CheckoutButton } from '@/components/custom-ui/reuseables';
import { vi } from 'vitest';



const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: mockPush,
  })),
}));



describe('Checkout Button Component', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it('should render checkout button with its label', () => {
    render(<CheckoutButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Checkout/i);
  });

  it('navigates to /frontend/checkout when the button is clicked', () => {
    render(<CheckoutButton />);

    const button = screen.getByRole('button', { name: /checkout/i });

    // Simulate a click event
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/frontend/checkout');
  });
});
