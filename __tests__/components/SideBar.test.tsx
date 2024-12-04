import { render, screen, fireEvent } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { SideBarNav } from '@/components/custom-ui/reuseables';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';


vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: vi.fn()
}));

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}));


vi.mock('./sideBarLogo', () => ({
  default: ({ isCollapsed, toggleSidebar }: { isCollapsed: boolean; toggleSidebar: () => void }) => (
    <button data-testid="toggle-button" onClick={toggleSidebar}>
      {isCollapsed ? 'Expand' : 'Collapse'}
    </button>
  ),
}));

vi.mock('./sideBarMenu', () => ({
  default: ({ isCollapsed }: { isCollapsed: boolean }) => (
    <nav>{isCollapsed ? 'Menu Collapsed' : 'Menu Expanded'}</nav>
  ),
}));


vi.mock('./sideBarFooter', () => ({
  default: ({ isCollapsed }: { isCollapsed: boolean }) => (
    <footer>{isCollapsed ? 'Footer Collapsed' : 'Footer Expanded'}</footer>
  ),
}));

describe('SideBarNav Component', () => {

  beforeEach(() => {

    vi.restoreAllMocks();

    (useSession as Mock).mockReturnValue({
      data: {
        user: {
          username: 'JohnDoe',
          email: 'johndoe@example.com',
        },
      },
      status: 'authenticated',
      update: vi.fn(),
    });
  });


  it('should renders with default state', () => {
    render(<SideBarNav session={{ user: { name: 'Test User' } }} />);


    expect(screen.getByTestId('logo-available')).toBeInTheDocument();
    expect(screen.getByTestId('menu-available')).toBeInTheDocument();
    expect(screen.getByTestId('footer-available')).toBeInTheDocument();
  });


  it('should toggles collapsed state when the toggle button is clicked', () => {
    render(<SideBarNav session={{}} />);

    const toggleButton = screen.getByLabelText('Toggle sidebar');

    expect(toggleButton).toBeInTheDocument();

    expect(screen.getByTestId('arrow-right-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('arrow-left-icon')).not.toBeInTheDocument();


    fireEvent.click(toggleButton);
    expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('arrow-right-icon')).not.toBeInTheDocument();
  });


  it('should collapses the sidebar on small screens', () => {
    render(<SideBarNav session={{}} />);

    global.innerWidth = 768;
    global.dispatchEvent(new Event('resize'));

    expect(screen.getByTestId('arrow-right-icon')).toBeInTheDocument();
  });


  it('should expands the sidebar on larger screens', () => {
    render(<SideBarNav session={{}} />);

    // Mock window resize
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));

    expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
  });



  it('removes the resize event listener on unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<SideBarNav session={{}} />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

});
