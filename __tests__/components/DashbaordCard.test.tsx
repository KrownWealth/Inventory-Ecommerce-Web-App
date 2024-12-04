import { render, screen } from '@testing-library/react';
import { DashBoardCard } from '@/components/custom-ui/reuseables';


describe('DashBoardCard Component', () => {
  it('renders the card title and icon', () => {
    const mockIcon = <svg data-testid="mock-icon" />;
    const mockTrendIcon = <svg data-testid="mock-trend-icon" />

    render(
      <DashBoardCard
        cardTitle="Total Revenue"
        icon={mockIcon}
        total="1000"
        updownTrend={mockTrendIcon}
        percentage="5"
      />
    );

    const title = screen.getByText(/Total Revenue/i);
    const icon = screen.getByTestId('mock-icon');
    const updownTrend = screen.getByTestId('mock-trend-icon');
    expect(title).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(updownTrend).toBeInTheDocument();
  });

  it('renders the total amount correctly', () => {
    render(
      <DashBoardCard
        cardTitle="Total Revenue"
        icon={<svg />}
        total="1000"
        updownTrend={<svg />}
        percentage="5"
      />
    );

    const total = screen.getByText(/\$1,000/i);
    expect(total).toBeInTheDocument();
  });

  it('renders total customers when provided', () => {
    render(
      <DashBoardCard
        cardTitle="Total Customers"
        icon={<svg />}
        totalCustomers="250"
        updownTrend={<svg />}
        percentage="2"
      />
    );

    const customers = screen.getByText(/250/i);
    expect(customers).toBeInTheDocument();
  });

  it('renders total products when provided', () => {
    render(
      <DashBoardCard
        cardTitle="Total Products"
        icon={<svg />}
        totalProducts="500"
        updownTrend={<svg />}
        percentage="10"
      />
    );

    const products = screen.getByText(/500/i);
    expect(products).toBeInTheDocument();
  });

  it('renders percentage', () => {
    render(
      <DashBoardCard
        cardTitle="Total Revenue"
        icon={<svg />}
        total="2000"
        updownTrend={<svg />}
        percentage="7.5"
      />
    );
    const percentage = screen.getByText(/7.5%/i);
    expect(percentage).toBeInTheDocument();
  });

  it('renders 0 if no total, customers, or products are provided', () => {
    render(
      <DashBoardCard
        cardTitle="Empty Data"
        icon={<svg />}
        updownTrend={<svg />}
      />
    );

    const zeroValue = screen.getByText(/0/i);
    expect(zeroValue).toBeInTheDocument();
  });
});
