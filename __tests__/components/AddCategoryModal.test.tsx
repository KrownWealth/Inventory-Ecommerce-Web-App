import { AddCategoryModal } from '@/components/custom-ui/reuseables';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { vi } from 'vitest';

const mockSetIsModalOpen = vi.fn();
const mockSetCategoryInfo = vi.fn();



describe('AddCategoryModal Component', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should renders the modal when `isModalOpen` is true', () => {
    render(
      <AddCategoryModal
        isModalOpen={true}
        setIsModalOpen={mockSetIsModalOpen}
        setCategoryInfo={mockSetCategoryInfo}
      />
    );

    expect(screen.getByText('Add New Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Category Name')).toBeInTheDocument();
  });

  it('hould not render the modal when `isModalOpen` is false', () => {
    render(
      <AddCategoryModal
        isModalOpen={false}
        setIsModalOpen={mockSetIsModalOpen}
        setCategoryInfo={mockSetCategoryInfo}
      />
    );

    expect(screen.queryByText('Add New Category')).not.toBeInTheDocument();
  });

  it('should displays an error message if user tries to submit without any invalid input', async () => {
    render(
      <AddCategoryModal
        isModalOpen={true}
        setIsModalOpen={mockSetIsModalOpen}
        setCategoryInfo={mockSetCategoryInfo}
      />
    );

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Name is required')
    );
  });

  it('should calls `setCategoryInfo` and `setIsModalOpen` on successful submission', async () => {
    const mockResponse = { id: '123', name: 'Test Category' };
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url === '/api/add-category') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        });
      }
      return Promise.reject(new Error('Not Found'));
    });

    render(
      <AddCategoryModal
        isModalOpen={true}
        setIsModalOpen={mockSetIsModalOpen}
        setCategoryInfo={mockSetCategoryInfo}
      />
    );

    const input = screen.getByLabelText('Category Name');
    fireEvent.change(input, { target: { value: 'Test Category' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockSetCategoryInfo).toHaveBeenCalledWith(expect.any(Function)));
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
  });


  it('should disables the submit button while loading', async () => {

    global.fetch = vi.fn().mockImplementation((url) => {
      if (url === '/api/add-category') {
        return new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve({}),
              }),
            2000
          )
        );
      }
      return Promise.reject(new Error('Not Found'));
    });

    render(
      <AddCategoryModal
        isModalOpen={true}
        setIsModalOpen={mockSetIsModalOpen}
        setCategoryInfo={mockSetCategoryInfo}
      />
    );

    const input = screen.getByLabelText('Category Name');
    fireEvent.change(input, { target: { value: 'Test Category' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Loading...');

    await waitFor(() => expect(submitButton).toBeDisabled());
  });

});
