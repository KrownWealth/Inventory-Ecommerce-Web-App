import { render, screen } from '@testing-library/react';
import { DataCard } from '@/components/custom-ui/reuseables';
import { vi } from 'vitest';

describe('DataCard', () => {
  const mockProps = {
    dataHeading: 'Total Sales',
    dataContent: '500',
    description: 'Total sales made this month.',
    icon: <span>💰</span>,
  };

  it('should renders the DataCard with correct props', () => {
    render(<DataCard {...mockProps} />);

    const paragraphs = screen.getAllByRole('paragraph');
    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();

    expect(heading).toHaveTextContent(/Total/i);


    expect(paragraphs).toHaveLength(3);
    expect(paragraphs[0]).toHaveTextContent(/Total Sales/i);
    expect(paragraphs[1]).toHaveTextContent(/500/i);
    expect(paragraphs[2]).toHaveTextContent(/Total sales made this month./i);

    expect(screen.getByText(/💰/i)).toBeInTheDocument();
  });


  it('should renders with the correct structure', () => {
    const { container } = render(<DataCard {...mockProps} />);
    expect(container.firstChild).toHaveClass('w-full');
    expect(container).toMatchSnapshot();
  });
});
