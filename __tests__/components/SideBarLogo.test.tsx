import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import SidebarHeaderLogo from '@/components/custom-ui/reuseables/Navigation/sideBarLogo';

describe('SidebarHeaderLogo', () => {
  const mockToggleSidebar = vi.fn();

  const renderComponent = (isCollapsed: boolean) => {
    render(
      <SidebarHeaderLogo
        isCollapsed={isCollapsed}
        toggleSidebar={mockToggleSidebar}
      />
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the logo icon (FaPercentage) always', () => {
    renderComponent(false);
    const logoIcon = screen.getByTestId('logo-icon');
    expect(logoIcon).toBeInTheDocument();
    expect(logoIcon).toHaveClass('h-8 w-8');
  });


  it('hides the name "PriceMarkup" when the sidebar is collapsed', () => {
    renderComponent(true);
    const logoName = screen.getByText('PriceMarkup');
    expect(logoName).toHaveClass('hidden');
  });
  ;

  it('should displays the name "PriceMarkup" when the sidebar is expanded', () => {
    renderComponent(false);

    const logoName = screen.getByText('PriceMarkup');
    expect(logoName).toBeInTheDocument();
  });


  it('renders the toggle button always', () => {
    renderComponent(false);
    const toggleButton = screen.getByRole('button', { name: /toggle sidebar/i });
    expect(toggleButton).toBeInTheDocument();
  });


  it('should display the correct toggle icon when the sidebar is collapsed', () => {
    renderComponent(true);
    const toggleIcon = screen.getByTestId('arrow-left-icon');
    expect(toggleIcon).toBeInTheDocument();
    expect(toggleIcon).toHaveClass('h-4 w-4');
  });


  it('should display the correct toggle icon when the sidebar is expanded', () => {
    renderComponent(false);
    const toggleIcon = screen.getByTestId('arrow-right-icon');
    expect(toggleIcon).toBeInTheDocument();
    expect(toggleIcon).toHaveClass('h-4 w-4');
  });

  it('should positions the toggle button correctly when the sidebar is collapsed', () => {
    renderComponent(true);
    const toggleButton = screen.getByRole('button', { name: /toggle sidebar/i });
    expect(toggleButton).toHaveClass('top-3/4');
  });

  it('should positions the toggle button correctly when the sidebar is expanded', () => {
    renderComponent(false);
    const toggleButton = screen.getByRole('button', { name: /toggle sidebar/i });
    expect(toggleButton).toHaveClass('top-1/2');
  });

  it('provides a link to the /admin route', () => {
    renderComponent(false);
    const adminLink = screen.getByRole('link', { name: /PriceMarkup/i });
    expect(adminLink).toHaveAttribute('href', '/admin');
  });
});
