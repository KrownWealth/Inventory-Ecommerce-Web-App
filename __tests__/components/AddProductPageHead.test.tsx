import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AddProductPageHead from '@/components/custom-ui/reuseables/Headings/productPageHead';


vi.mock('@/components/custom-ui/reuseables/Filter/filterByCategory', () => ({
  default: vi.fn(({ onCategoryChange }: { onCategoryChange: (id: string | undefined) => void }) => (
    <div data-testid="filter-by-category" onClick={() => onCategoryChange('mock-category-id')} />
  )),
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick} data-testid="button">
      {children}
    </button>
  ),
}));

describe('AddProductPageHead Component', () => {

  it('should renders FilterByCategory component', () => {
    render(
      <AddProductPageHead
        setIsModalOpen={vi.fn()}
        handleAddProductOpen={vi.fn()}
        btnText="Add Product"
        handleCategoryChange={vi.fn()}
      />
    );

    expect(screen.getByTestId('filter-by-category')).toBeInTheDocument();
  });

  it('should renders the Button with correct text', () => {
    render(
      <AddProductPageHead
        setIsModalOpen={vi.fn()}
        handleAddProductOpen={vi.fn()}
        btnText="Add Product"
        handleCategoryChange={vi.fn()}
      />
    );

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Add Product');
  });

  it('should calls handleAddProductOpen when the Button is clicked', () => {
    const handleAddProductOpenMock = vi.fn();
    render(
      <AddProductPageHead
        setIsModalOpen={vi.fn()}
        handleAddProductOpen={handleAddProductOpenMock}
        btnText="Add Product"
        handleCategoryChange={vi.fn()}
      />
    );

    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(handleAddProductOpenMock).toHaveBeenCalledTimes(1);
  });

  it('should calls handleCategoryChange when a category is selected', () => {
    const handleCategoryChangeMock = vi.fn();
    render(
      <AddProductPageHead
        setIsModalOpen={vi.fn()}
        handleAddProductOpen={vi.fn()}
        btnText="Add Product"
        handleCategoryChange={handleCategoryChangeMock}
      />
    );

    const filterByCategory = screen.getByTestId('filter-by-category');
    fireEvent.click(filterByCategory);
    expect(handleCategoryChangeMock).toHaveBeenCalledWith('mock-category-id');
  });

  it('should render no text if btnText is not provided', () => {
    render(
      <AddProductPageHead
        setIsModalOpen={vi.fn()}
        handleAddProductOpen={vi.fn()}
        btnText={undefined}
        handleCategoryChange={vi.fn()}
      />
    );

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('');
  });


});
