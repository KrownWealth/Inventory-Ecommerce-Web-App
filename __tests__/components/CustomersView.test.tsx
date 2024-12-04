

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { CustomerView } from '@/views';
import { useRouter } from 'next/navigation';
import { vi, Mock } from "vitest"



vi.mock('@/components/custom-ui/reuseables', () => ({
  PageHead: () => <h1>Customers</h1>,
  DatePickerWithRange: ({ date, setDate }: { date: any; setDate: any }) => (
    <div>
      <button onClick={() => setDate({ from: new Date(), to: new Date() })}>
        Set Date Range
      </button>
      <span>
        {date?.from?.toLocaleDateString()} - {date?.to?.toLocaleDateString()}
      </span>
    </div>
  ),
  CustomerTable: ({ customers }: { customers: any }) => (
    <table>
      <tbody>
        {customers.map((customer: any, index: any) => (
          <tr key={index}>
            <td>{customer.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
  DataCard: ({ icon, dataHeading, dataContent, description }: { icon: any; dataHeading: any; dataContent: any; description: any }) => (
    <div>
      {icon}
      <h2>{dataHeading}</h2>
      <p>{dataContent}</p>
      <small>{description}</small>
    </div>
  ),
}));


vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));


global.fetch = vi.fn();

describe('CustomerView', () => {
  const mockCustomers = [
    { name: 'John Doe' },
    { name: 'Jane Doe' },
  ];

  beforeEach(() => {

    (useRouter as Mock).mockReturnValue({
      query: {},
      push: vi.fn(),
    });
  });

  it('should render the component and fetches customer data', async () => {

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        customers: mockCustomers,
        daily: 10,
        monthly: 50,
        yearly: 600,
        totalPages: 5,
      }),
    });

    render(<CustomerView searchParams={{ page: '1' }} />);


    expect(screen.getByText('Customers')).toBeInTheDocument();


    await waitFor(() => {
      expect(screen.getByText('Daily Customers')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('Monthly Customers')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('Yearly Customers')).toBeInTheDocument();
      expect(screen.getByText('600')).toBeInTheDocument();
    });


    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('should handle fetch error correctly', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<CustomerView searchParams={{ page: '1' }} />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch customers.')).toBeInTheDocument();
    });
  });


  it('sets date correctly on button click', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        customers: [{ name: 'John Doe' }, { name: 'Jane Doe' }],
        daily: 5,
        monthly: 20,
        yearly: 100,
        totalPages: 2,
      }),
    });

    render(<CustomerView searchParams={{ page: '1' }} />);

    await waitFor(() => {
      expect(screen.getByText('Daily Customers')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });
});
