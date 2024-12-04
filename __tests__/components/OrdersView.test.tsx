import { act, render, screen, waitFor } from '@testing-library/react';
import { OrderView } from '@/views';
import { vi, Mock } from "vitest"



global.fetch = vi.fn();

const mockDateRange = "Aug 29, 24 - Nov 29, 24";


describe('OrderView Component', () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the header', async () => {
    render(<OrderView />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: /all orders/i });
    expect(heading).toBeInTheDocument();

  });


  it('should shows loading state while fetching orders', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ orders: [] }),
    });
    render(<OrderView />);

    expect(screen.getByText(/loading orders.../i)).toBeInTheDocument();
  });


  it('should fetch and display orders successfully', async () => {
    const mockOrders = [
      { id: '1', customerName: 'Alice', productName: 'Widget A', orderDate: '2024-07-27', paymentStatus: 'Paid', totalPrice: 120 },
      { id: '2', customerName: 'Bob', productName: 'Widget B', orderDate: '2024-07-26', paymentStatus: 'Pending', totalPrice: 80 },
    ];

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ orders: mockOrders }),
    });

    await act(async () => {
      render(<OrderView />);
    });

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });


  it('should show error notification on fetch failure', async () => {
    (fetch as Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    render(<OrderView />);

    await waitFor(() => {
      expect(screen.getByText(/loading orders.../i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText(/loading orders.../i)).not.toBeInTheDocument();
      expect(screen.getByText(/failed to fetch orders. please try again later./i)).toBeInTheDocument();
    });
  });

});

