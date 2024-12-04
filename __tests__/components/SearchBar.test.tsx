import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { InputSearch } from '@/components/custom-ui/reuseables';


const mockReplace = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => '/search',
  useSearchParams: () => new URLSearchParams('query=existing'),
}));

vi.useFakeTimers();

describe('InputSearch Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });


  it('renders the search input with the correct placeholder and value', () => {
    render(<InputSearch placeholder="Search here..." onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search here...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('existing');
  });


});
