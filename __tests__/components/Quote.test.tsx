
import { render, screen, cleanup } from '@testing-library/react';
import { Quote } from '@/components/custom-ui/reuseables';

afterEach(() => {
  cleanup();
});

describe('Quote Component', () => {
  it('should render quote heading content', () => {
    render(<Quote />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(
      /Shopping from @Hometung for all my furninture interiors is one of the best desicion./i
    );
  });

  it('should render quote author name', () => {
    render(<Quote />);
    const paragraph = screen.getByText(/@Sarah Wealth/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('should have only one author paragraph', () => {
    render(<Quote />);
    const paragraphs = screen.getAllByText(/@Sarah Wealth/i);
    expect(paragraphs).toHaveLength(1);
  });
});
