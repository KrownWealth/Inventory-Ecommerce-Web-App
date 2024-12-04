
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { CategoryView } from '@/views';


global.fetch = vi.fn();

describe('CategoryView', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });


  it('should render the category view correctly', () => {
    render(<CategoryView />);
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add category/i })).toBeInTheDocument();
  });

  it('should display the loading state when categories is fetching', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ categories: [] }),
    });

    render(<CategoryView />);


    expect(screen.getByAltText('loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByAltText('loading')).not.toBeInTheDocument();
    });
  });

  it('should successful fetches and displays categories', async () => {
    const mockCategories = [
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' },
    ];

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ categories: mockCategories }),
    });

    render(<CategoryView />);

    await waitFor(() => {
      expect(screen.getByText('Category 1')).toBeInTheDocument();
      expect(screen.getByText('Category 2')).toBeInTheDocument();
    });
  });

  it('should handle delete category', async () => {
    const mockCategories = [{ id: '1', name: 'Category 1' }];

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ categories: mockCategories }),
    });

    render(<CategoryView />);

    await waitFor(() => {
      expect(screen.getByText('Category 1')).toBeInTheDocument();
    });

    (fetch as Mock).mockResolvedValueOnce({ ok: true });


    const dropdownTrigger = screen.getByRole('button', { name: /Options/i });
    fireEvent.click(dropdownTrigger);

    // Debug rendered DOM
    screen.debug();


    const deleteButton = await screen.findByTestId('delete-category');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText('Category 1')).not.toBeInTheDocument();
    });
  });


  it('shows error notification on fetch failure', async () => {
    (fetch as Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    render(<CategoryView />);

    await waitFor(() => {
      expect(screen.getByText(/loading categories/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText(/loading categories/i)).not.toBeInTheDocument();
    });
  });

  it('should open and close modal', () => {
    render(<CategoryView />);


    const addButton = screen.getByRole('button', { name: /add category/i });
    fireEvent.click(addButton);


    expect(screen.getByText(/Add new Category/i)).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);


    expect(screen.queryByText(/Close/i)).not.toBeInTheDocument();
  });



});
