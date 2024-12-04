import { render, screen } from '@testing-library/react';
import { LogoOnAuth } from '@/components/custom-ui/reuseables';





describe('LogoOnAuth Component', () => {
  it('should renders the logo link with the correct text and icon', () => {
    render(<LogoOnAuth />);


    const linkElement = screen.getByRole('link', { name: /pricesage/i });
    expect(linkElement).toBeInTheDocument();


    const textElement = screen.getByText(/pricesage/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass('text-3xl font-bold text-black');

    const iconElement = screen.getByTestId('percentage-icon');
    expect(iconElement).toBeInTheDocument();
  });



  it('should checks that the link points to the correct URL', () => {
    render(<LogoOnAuth />);

    const linkElement = screen.getByRole('link', { name: /pricesage/i });
    expect(linkElement).toHaveAttribute('href', '/');
  });


  it('should render the correct classes for the logo', () => {
    render(<LogoOnAuth />);

    const divElement = screen.getByText('PriceSage').closest('div');
    expect(divElement).toHaveClass('flex flex-row justify-between');
  });
});
