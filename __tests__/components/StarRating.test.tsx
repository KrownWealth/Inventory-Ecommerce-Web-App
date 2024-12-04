import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StarRating } from '@/components/custom-ui/reuseables';




describe('StarRating Component', () => {

  it('renders the correct number of full stars for a whole number rating', () => {
    render(<StarRating rating={3} />);

    const fullStars = screen.getAllByTestId('full-star');
    expect(fullStars).toHaveLength(3);

    const emptyStars = screen.getAllByTestId('empty-star');
    expect(emptyStars).toHaveLength(2);
  });

  it('renders half a star for a fractional rating', () => {
    render(<StarRating rating={2.5} />);

    const fullStars = screen.getAllByTestId('full-star');
    expect(fullStars).toHaveLength(2);

    const halfStars = screen.getAllByTestId('half-star');
    expect(halfStars).toHaveLength(1);

    const emptyStars = screen.getAllByTestId('empty-star');
    expect(emptyStars).toHaveLength(2);
  });

  it('renders all empty stars for a zero rating', () => {
    render(<StarRating rating={0} />);

    const emptyStars = screen.getAllByTestId('empty-star');
    expect(emptyStars).toHaveLength(5);
  });

  it('renders all full stars for a maximum rating of 5', () => {
    render(<StarRating rating={5} />);

    const fullStars = screen.getAllByTestId('full-star');
    expect(fullStars).toHaveLength(5);
  });


});
