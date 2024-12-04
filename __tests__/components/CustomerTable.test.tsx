import { render, screen, fireEvent } from '@testing-library/react';
import { CustomerTable } from '@/components/custom-ui/reuseables';


const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    totalOrders: 5,
    totalSpent: 150.0,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    totalOrders: 3,
    totalSpent: 75.0,
  },
];

describe('CustomerTable', () => {

  it('should render the customer table correctly', () => {
    render(<CustomerTable customers={mockCustomers} totalPages={1} />);

    expect(screen.getByText(/Customer_ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Order/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Spent/i)).toBeInTheDocument();
    expect(screen.getByText(/Actions/i)).toBeInTheDocument();



    mockCustomers.forEach(customer => {
      expect(screen.getByText(customer.id)).toBeInTheDocument();
      expect(screen.getByText(customer.name)).toBeInTheDocument();
      expect(screen.getByText(customer.email)).toBeInTheDocument();
      expect(screen.getByText(customer.totalOrders)).toBeInTheDocument();
      expect(screen.getByText(customer.totalSpent.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))).
        toBeInTheDocument();
    });
  });

  it('opens the dropdown menu when the button is clicked', () => {
    render(<CustomerTable customers={mockCustomers} totalPages={1} />);


    const dropdownButton = screen.getAllByRole('button', { name: /Toggle menu/i })[0];
    fireEvent.click(dropdownButton);
  });

  it('should render the correct number of customer rows', () => {
    render(<CustomerTable customers={mockCustomers} totalPages={1} />);


    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockCustomers.length + 1);
  });

});
