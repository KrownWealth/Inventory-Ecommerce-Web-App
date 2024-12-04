import { fireEvent, render, screen } from '@testing-library/react';
import { GoBackBtn } from '@/components/custom-ui/reuseables';
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

  it('should render go back button with its label', () => {
    render(<GoBackBtn />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Go Back/i);
  });

  it('navigates to /frontend/profile when the button is clicked', () => {
    render(<GoBackBtn />);

    const button = screen.getByRole('button', { name: /Go Back/i });

    fireEvent.click(button);
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/frontend/profile');
  });
});
