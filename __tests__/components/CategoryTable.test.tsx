import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { CategoryTable } from '@/components/custom-ui/reuseables';


vi.mock('@/api/fetch-categories', () => ({
  fetchCategories: vi.fn().mockResolvedValue([
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
  ]),
}));

const mockCategories = [
  { id: '1', name: 'Category 1' },
  { id: '2', name: 'Category 2' },
];
const mockOnDelete = vi.fn().mockResolvedValue(undefined);

describe('CategoryTable Component', () => {


  beforeEach(() => {
    render(<CategoryTable categories={mockCategories} onDelete={mockOnDelete} />);
  });


  it('should renders categories correctly', () => {
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
  });


  it('should display the onDelete button correctly', async () => {
    const mockOnDelete = vi.fn().mockResolvedValue(undefined);

    render(<CategoryTable categories={mockCategories} onDelete={mockOnDelete} />);


    const categoryRows = await screen.findAllByRole('row');
    expect(categoryRows).toHaveLength(6);


    const toggleButtons = screen.getAllByRole('button', { name: /options/i });
    fireEvent.click(toggleButtons[0]);


    const deleteButton = await screen.findByTestId('delete-category');
    expect(deleteButton).toBeInTheDocument();
  });

});