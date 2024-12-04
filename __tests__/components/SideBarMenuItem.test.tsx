import React from 'react';
import { cleanup, render, screen, within } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { usePathname } from 'next/navigation';
import SidebarMenu from '@/components/custom-ui/reuseables/Navigation/sideBarMenuItems';


vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('SidebarMenu Component', () => {


  const menuItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/products', label: 'Products' },
    { href: '/dashboard/categories', label: 'Categories' },
    { href: '/dashboard/orders', label: 'Orders' },
    { href: '/dashboard/customers', label: 'Customers' },
  ];

  const renderComponent = (isCollapsed: boolean, pathname: string) => {
    (usePathname as Mock).mockReturnValue(pathname);
    render(
      <SidebarMenu isCollapsed={isCollapsed} />
    );
  };

  it('should renders all menu items correctly', () => {
    renderComponent(false, '/dashboard');

    menuItems.forEach((item) => {
      const linkElement = screen.getByRole('link', { name: item.label });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', item.href);
    });
  });

  it('should applies active styles to the current route', () => {
    const activePath = '/dashboard/products';
    renderComponent(false, activePath);

    const activeLink = screen.getByRole('link', { name: 'Products' });
    expect(activeLink).toHaveClass('bg-primary text-white');
  });

  it('should not apply active styles to non-active routes', () => {
    const activePath = '/dashboard/products';
    renderComponent(false, activePath);

    const inactiveLink = screen.getByRole('link', { name: 'Dashboard' });
    expect(inactiveLink).not.toHaveClass('bg-primary text-white');
    expect(inactiveLink).toHaveClass('text-muted-foreground');
  });

  it("should hide menu labels when isCollapsed is true", () => {
    const { getByText } = render(<SidebarMenu isCollapsed={true} />);

    const dashboardLabel = getByText(/dashboard/i);
    expect(dashboardLabel).toHaveClass("hidden");
  });

  it('should shows menu labels when isCollapsed is false', () => {
    renderComponent(false, '/dashboard');

    menuItems.forEach((item) => {
      const labelElement = screen.getByText(item.label);
      expect(labelElement).toBeInTheDocument();
    });
  });

  it('should handle collapsed state correctly across different routes', () => {
    menuItems.forEach((item) => {
      renderComponent(true, item.href);

      const nav = screen.getByRole('navigation');
      const linkElement = within(nav).getByRole('link', { name: item.label });
      expect(linkElement).toBeInTheDocument();

      const labelElement = within(nav).queryByText(item.label);
      expect(labelElement).toHaveClass('hidden');

      cleanup();
    });
  });

});
