
import { render } from '@testing-library/react';
import { CartItemSkeleton } from '@/components/custom-ui/reuseables';

describe('CartItemSkeleton', () => {
  it('should render correctly', () => {
    const { container } = render(<CartItemSkeleton />);


    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('animate-pulse');

    const avatarSkeleton = container.querySelector('.w-16.h-16');
    const titleSkeleton = container.querySelector('.h-4.w-3\\/4.mb-2');
    const descriptionSkeleton = container.querySelector('.h-4.w-1\\/4');
    const buttonSkeletons = container.querySelectorAll('.w-8.h-8');

    expect(avatarSkeleton).toBeInTheDocument();
    expect(titleSkeleton).toBeInTheDocument();
    expect(descriptionSkeleton).toBeInTheDocument();
    expect(buttonSkeletons.length).toBeGreaterThan(0);

  });
});
