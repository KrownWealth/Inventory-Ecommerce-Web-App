
import { render } from '@testing-library/react';
import { ProductCardSkeleton } from '@/components/custom-ui/reuseables';


describe('ProductCardSkeleton', () => {
  it('should render correctly with skeleton elements', () => {
    const { container, getAllByRole } = render(<ProductCardSkeleton />);


    expect(container.firstChild).toBeInTheDocument();


    const skeletons = getAllByRole('generic');
    expect(skeletons.length).toBe(19);


    expect(container.firstChild).toHaveClass('border rounded-lg grid grid-cols-3 gap-4');
  });
});
