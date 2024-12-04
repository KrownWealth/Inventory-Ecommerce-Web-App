import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import SidebarFooter from '@/components/custom-ui/reuseables/Navigation/sideBarFooter';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('SidebarFooter Component', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should renders user avatar and details when session exists', () => {
    (useSession as Mock).mockReturnValue({
      data: {
        user: {
          username: 'JohnDoe',
          email: 'johndoe@example.com',
        },
      },
      status: 'authenticated',
    });

    render(<SidebarFooter isCollapsed={false} />);

    expect(screen.getByText('JohnDoe')).toBeInTheDocument();
    expect(screen.getByText('johndoe@example.com')).toBeInTheDocument();

    expect(screen.getByText(/logout/i)).toBeInTheDocument();

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });


  it('renders "Login" button when no session exists', () => {
    (useSession as Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    render(<SidebarFooter isCollapsed={false} />);

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
  });

  it('navigates to login page when "Login" button is clicked', () => {
    (useSession as Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    render(<SidebarFooter isCollapsed={false} />);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(loginButton);

    expect(mockPush).toHaveBeenCalledWith('/auth/sign-in');
  });

  it('renders avatar fallback initials when no avatar image is provided', () => {
    (useSession as Mock).mockReturnValue({
      data: {
        user: {
          username: 'JohnDoe',
          email: 'johndoe@example.com',
        },
      },
      status: 'authenticated',
    });

    render(<SidebarFooter isCollapsed={false} />);
    expect(screen.getByText('JO')).toBeInTheDocument();
  });

  // it('should hides user details when isCollapsed is true', () => {
  //   (useSession as Mock).mockReturnValue({
  //     data: {
  //       user: {
  //         username: 'JohnDoe',
  //         email: 'johndoe@example.com',
  //       },
  //     },
  //     status: 'authenticated',
  //   });

  //   render(<SidebarFooter isCollapsed={true} />);

  //   const emailElement = screen.queryByText('johndoe@example.com');
  //   expect(emailElement).not.toBeVisible();
  // });

});
