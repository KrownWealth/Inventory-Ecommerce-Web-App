import { fireEvent, render, screen } from '@testing-library/react';
import { ViewOrderBtn } from '@/components/custom-ui/reuseables';
import { vi } from 'vitest';




const mockReplace = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    replace: mockReplace,
  })),
}));

describe('View Order Component', () => {
  beforeEach(() => {
    mockReplace.mockReset();
  });

  it('should render view order button with its label', () => {
    render(<ViewOrderBtn />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/View your order here/i);
  });

  it('navigates to /frontend/profile when the button is clicked', () => {
    render(<ViewOrderBtn />);

    const button = screen.getByRole('button', { name: /View your order here/i });

    fireEvent.click(button);
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/frontend/profile');
  });
});
