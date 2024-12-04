import { render, screen, fireEvent } from '@testing-library/react';
import { ProductTableTwo } from '@/components/custom-ui/reuseables';
import { describe, it, expect, vi } from 'vitest';



vi.mock('@/lib', () => ({
  FormattedPrice: (price: any) => `$${price.toFixed(2)}`,
  formatDate: (date: any) => date.toLocaleDateString(),
}));

describe('ProductTableTwo', () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn().mockResolvedValue(undefined);

  const defaultProps = {
    productId: '123',
    productImg: 'https://example.com/product.jpg',
    productName: 'Sample Product',
    costPrice: 50,
    sellingPrice: 75,
    productDescription: 'This is a sample product.',
    categoryName: 'Sample Category',
    createdDate: new Date('2024-01-01'),
    updatedDate: new Date('2024-01-02'),
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
  };

  it('should renders product details correctly', () => {
    render(<ProductTableTwo {...defaultProps} />);


    expect(screen.getByText(/ID:/)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.productId)).toBeInTheDocument();
    expect(screen.getByText(/Product Name:/)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.productName)).toBeInTheDocument();
    expect(screen.getByText(/Cost Price:/)).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText(/Selling Price:/)).toBeInTheDocument();
    expect(screen.getByText('$75.00')).toBeInTheDocument();
    expect(screen.getByText(/Category:/)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.categoryName)).toBeInTheDocument();
    expect(screen.getByText(/Description:/)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.productDescription)).toBeInTheDocument();
    expect(screen.getByText(/Created At:/)).toBeInTheDocument();
    expect(screen.getByText('1/1/2024')).toBeInTheDocument();
    expect(screen.getByText(/Updated At:/)).toBeInTheDocument();
    expect(screen.getByText('1/2/2024')).toBeInTheDocument();
  });

  it('should call onEdit when the edit button is clicked', () => {
    render(<ProductTableTwo {...defaultProps} />);

    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('should call onDelete when the delete button is clicked', async () => {
    render(<ProductTableTwo {...defaultProps} />);

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);


    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    await expect(mockOnDelete).toHaveBeenCalledWith(expect.any(Object));
  });

});
