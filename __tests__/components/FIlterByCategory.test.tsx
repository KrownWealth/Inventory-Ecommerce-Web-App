import FilterByCategory from '@/components/custom-ui/reuseables/Filter/filterByCategory';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import { Mock, vi } from 'vitest';
import userEvent from "@testing-library/user-event"


const mockCategories = [
  { id: "1", name: "Category 1" },
  { id: "2", name: "Category 2" },
  { id: "3", name: "Category 3" },
];


const mockOnCategoryChange = vi.fn();


vi.mock("/api/fetchCategories", () => ({
  fetchCategories: vi.fn(() => Promise.resolve(mockCategories)),
}));

describe('FilterByCategory Component', () => {


  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ categories: mockCategories }),
      })
    ) as Mock;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the component', () => {
    render(<FilterByCategory onCategoryChange={mockOnCategoryChange} />);

    const select = screen.getByRole('listbox');
    expect(select).toBeInTheDocument();

    const placeholder = screen.getByText("Filter By Category");
    expect(placeholder).toBeInTheDocument();
  });

  it('should fetch, map, and display categories', async () => {
    render(<FilterByCategory onCategoryChange={mockOnCategoryChange} />);

    const dropdownButton = screen.getByRole('listbox', { name: /filter by category/i });
    expect(dropdownButton).toBeInTheDocument();

    fireEvent.click(dropdownButton);

    await waitFor(() => {
      mockCategories.forEach(category => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
      });
    });
  });


  it("should handle category selection", async () => {

    await act(async () => {
      render(<FilterByCategory onCategoryChange={mockOnCategoryChange} />);
    });
    const selectElement = screen.getByRole("listbox", { name: /filter by category/i });

    await act(async () => {
      await userEvent.selectOptions(selectElement, "1");
    });
    expect(mockOnCategoryChange).toHaveBeenCalledWith("1");
  });

  it("should render Filter By Category with option all if no category is selected", async () => {

    await act(async () => {
      render(<FilterByCategory onCategoryChange={mockOnCategoryChange} />);
    });

    const selectElement = screen.getByRole("listbox", { name: /filter by category/i });

    await act(async () => {
      await userEvent.selectOptions(selectElement, "all");
    });
    expect(mockOnCategoryChange).toHaveBeenCalledWith(undefined);
  });
});