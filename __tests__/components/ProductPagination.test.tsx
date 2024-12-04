
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductsPagination } from '@/components/custom-ui/reuseables';



vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    replace: vi.fn(),
  })),
  usePathname: vi.fn(() => '/products'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));


describe('ProductsPagination Component', () => {
  const mockedUsePathname = vi.fn();
  const mockedUseSearchParams = vi.fn();

  beforeEach(() => {
    mockedUsePathname.mockReturnValue('/products');
    mockedUseSearchParams.mockReturnValue(new URLSearchParams('page=1'));

  });

  afterEach(() => {
    vi.clearAllMocks();
  });



  it('should renders the correct number of pagination buttons', () => {
    render(<ProductsPagination totalPages={5} currentPage={1} onPageChange={vi.fn()} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
    screen.debug();
  });

  it('should highlights the active page button', () => {
    render(<ProductsPagination totalPages={5} currentPage={3} onPageChange={vi.fn()} />);

    const activeButton = screen.getByText('3');
    expect(activeButton).toHaveClass('active');
  });

  it('calls onPageChange with the correct page number when a button is clicked', () => {
    const onPageChangeMock = vi.fn();
    render(<ProductsPagination totalPages={5} currentPage={1} onPageChange={onPageChangeMock} />);

    const page3Button = screen.getByText('5');
    fireEvent.click(page3Button);
    screen.debug();
    expect(onPageChangeMock).toHaveBeenCalledWith(5);
  });

});