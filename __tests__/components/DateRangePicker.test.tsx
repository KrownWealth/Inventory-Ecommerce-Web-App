import { DatePickerWithRange } from '@/components/custom-ui/reuseables';
import { fireEvent, render, screen, act } from '@testing-library/react'
import { DateRange } from 'react-day-picker';
import { vi } from "vitest"


vi.mock('@/components/ui/calendar', () => ({
  Calendar: ({ onSelect }: { onSelect: (date: DateRange) => void }) => (
    <div>
      <button onClick={() => onSelect({ from: new Date(2024, 0, 1), to: new Date(2024, 0, 15) })}>
        Select Date Range
      </button>
      <button onClick={() => onSelect({ from: new Date(2024, 0, 1), to: undefined })}>
        Select Start Date Only
      </button>
    </div>
  ),
}));


const setDateMock = vi.fn();

describe('DateRanePicker Component', () => {

  it("renders without crashing and displays the default text", () => {

    render(<DatePickerWithRange date={undefined} setDate={setDateMock} />);

    expect(screen.getByText(/pick a date/i)).toBeInTheDocument();
  });

  it("displays the selected date range when dates are chosen", async () => {

    render(<DatePickerWithRange date={undefined} setDate={setDateMock} />);

    const button = screen.getByRole("button", { name: /pick a date/i });
    await act(async () => {
      fireEvent.click(button);
    });
    screen.debug()

    const selectDateButton = screen.getByText(/select date range/i);
    await act(async () => {
      fireEvent.click(selectDateButton);
    });


  });


  it("calls setDate with the selected date range", async () => {
    render(<DatePickerWithRange date={undefined} setDate={setDateMock} />);

    const button = screen.getByRole("button", { name: /pick a date/i });
    await act(async () => {
      fireEvent.click(button);
    });

    const selectDateButton = screen.getByText(/select date range/i);
    await act(async () => {
      fireEvent.click(selectDateButton);
    });

    expect(setDateMock).toHaveBeenCalledWith({
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 15),
    });
  });


  it("displays only the start date when the end date is not selected", async () => {
    render(<DatePickerWithRange date={undefined} setDate={setDateMock} />);

    const button = screen.getByRole("button", { name: /pick a date/i });
    await act(async () => {
      fireEvent.click(button);
    });

    const selectStartDateButton = screen.getByText(/select start date only/i);
    await act(async () => {
      fireEvent.click(selectStartDateButton);
    });

  });
});