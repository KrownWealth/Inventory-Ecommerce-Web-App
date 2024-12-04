import { render, screen, cleanup } from '@testing-library/react';
import { SignupWithGoogle } from '@/components/custom-ui/reuseables';


afterEach(() => {
  cleanup();
});

describe('Signup With Google', () => {
  it('should render the signup button with the text inside', () => {
    render(<SignupWithGoogle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Signup with Google/i);
  });

  it('should render or sign up with email text', () => {
    render(<SignupWithGoogle />);
    const paragraph = screen.getByText(/or Sign up with Email/i);
    expect(paragraph).toBeInTheDocument();
  });
});
