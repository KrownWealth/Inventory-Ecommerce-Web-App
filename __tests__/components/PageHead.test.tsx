
import { render, screen } from '@testing-library/react'
import { PageHead } from '@/components/custom-ui/reuseables'


describe('Page Heading', () => {
  it('should render the page title with its text', () => {
    render(<PageHead pageTitle='Component Title' />)


    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Component Title/i)
  });
})