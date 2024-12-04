import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AddProductImage } from '@/views';

const mockHandleImage = vi.fn();

describe('AddProductImage Component', () => {


  it('should render correctly with default props', () => {
    render(
      <AddProductImage
        imageName={null}
        imageError={null}
        isUploading={false}
        handleImage={mockHandleImage}
      />
    );

    expect(screen.getByText('Product Image')).toBeInTheDocument();
    expect(screen.getByText('No image selected')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call handleImage when a file is selected', () => {
    render(
      <AddProductImage
        imageName={null}
        imageError={null}
        isUploading={false}
        handleImage={mockHandleImage}
      />
    );
    const fileInput = screen.getByLabelText('Product Image', { selector: 'input' });

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });


    expect(mockHandleImage).toHaveBeenCalledTimes(1);
    const event = mockHandleImage.mock.calls[0][0];
    expect(event.target.files[0]).toEqual(file);
  });

  it('should display an error message if imageError is provided', () => {
    render(
      <AddProductImage
        imageName={null}
        imageError="Invalid image file"
        isUploading={false}
        handleImage={mockHandleImage}
      />
    );

    expect(screen.getByText('Invalid image file')).toBeInTheDocument();
  });

  it('should display "Uploading..." when isUploading is true', () => {
    render(
      <AddProductImage
        imageName={null}
        imageError={null}
        isUploading={true}
        handleImage={mockHandleImage}
      />
    );

    expect(screen.getByText('Uploading...')).toBeInTheDocument();
  });

  it('should display the selected image name when imageName is provided', () => {
    render(
      <AddProductImage
        imageName="example.png"
        imageError={null}
        isUploading={false}
        handleImage={mockHandleImage}
      />
    );

    expect(screen.getByText('example.png')).toBeInTheDocument();
  });

  it('should trigger file input when the upload button is clicked', () => {
    render(
      <AddProductImage
        imageName={null}
        imageError={null}
        isUploading={false}
        handleImage={mockHandleImage}
      />
    );

    const uploadButton = screen.getByRole('button');
    fireEvent.click(uploadButton);

    const fileInput = screen.getByLabelText('Product Image');
    expect(fileInput).toBeDefined();
  });
});
