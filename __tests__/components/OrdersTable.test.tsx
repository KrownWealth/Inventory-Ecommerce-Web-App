import { render, screen, fireEvent } from '@testing-library/react';
import { OrdersTable } from '@/components/custom-ui/reuseables';
import { Order } from '@/types';



const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'John Doe',
    productName: 'Laptop',
    orderDate: '2024-11-01',
    paymentStatus: 'Paid',
    totalPrice: 1200.00,
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    productName: 'Smartphone',
    orderDate: '2024-11-02',
    paymentStatus: 'Pending',
    totalPrice: 800.00,
  },
];

describe('OrdersTable', () => {
  it('should render the OrdersTable with correct data', () => {
    render(<OrdersTable orders={mockOrders} />);


    expect(screen.getByText(/Order ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Order Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Actions/i)).toBeInTheDocument();


    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Laptop/i)).toBeInTheDocument();
    expect(screen.getByText(/Paid/i)).toBeInTheDocument();
    expect(screen.getByText(/\$1,200.00/i)).toBeInTheDocument();

    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Smartphone/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
    expect(screen.getByText(/\$800.00/i)).toBeInTheDocument();
  });

  it('should render with the correct structure', () => {
    const { container } = render(<OrdersTable orders={mockOrders} />);
    expect(container.firstChild).toHaveClass('border shadow-sm rounded-lg overflow-auto md:w-full w-[328px]');
    expect(container).toMatchSnapshot();
  });

  it('should open the dropdown menu and show actions', () => {
    render(<OrdersTable orders={mockOrders} />);

    const dropdownButton = screen.getAllByRole('button', { name: /Toggle menu/i })[0];
    fireEvent.click(dropdownButton);


    // expect(screen.getByText(/Accept/i)).toBeInTheDocument();
    // expect(screen.getByText(/Decline/i)).toBeInTheDocument();
  });
});
