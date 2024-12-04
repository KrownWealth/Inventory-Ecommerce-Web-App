"use client";

import React, { useRef } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';

interface AddProductImageProps {
  imageName: string | null;
  imageError: string | null;
  isUploading: boolean;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddProductImage: React.FC<AddProductImageProps> = ({
  imageName,
  imageError,
  isUploading,
  handleImage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">
        Product Image
      </label>
      <div className="flex items-center space-x-4">
        <input
          id='image'
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleImage(e)}
          className="hidden"
          accept="image/*"
        />
        <button
          type="button" onClick={handleClick}
          className="inline-flex items-center space-x-2 border px-4 "
        >
          <IoCloudUploadOutline className="w-12 h-12 text-gray-500" />
        </button>
        <span className="text-sm text-gray-700">
          {imageError ? imageError : isUploading ? 'Uploading...' : imageName || 'No image selected'}
        </span>
      </div>
    </div>
  );
};

export default AddProductImage;
