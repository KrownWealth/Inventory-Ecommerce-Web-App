"use client";

import React, { useRef, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';

interface AddProductImageProps {
  image: string | null;
  setImage: (imageUrl: string) => void;
  onChangePicture: (imageUrl: string) => void;
  productId?: string;
}

const AddProductImage: React.FC<AddProductImageProps> = ({ image, setImage, onChangePicture, productId }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageName, setImageName] = useState<string | null>(null);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageName(file.name);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'gewfxwe5');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      const imageUrl = data.secure_url;

      // If productId exists, we are updating an existing product
      if (productId) {
        await updateProductImage(productId, imageUrl);
      }

      onChangePicture(imageUrl);
      setImage(imageUrl);
    } catch (error) {
      console.error('Failed to upload image:', error);
      setImageName(null);
    } finally {
      setIsUploading(false);
    }
  };

  // Function to handle PATCH request
  const updateProductImage = async (id: string, imageUrl: string) => {
    try {
      const response = await fetch(`/api/edit-product`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, image: imageUrl }), 
      });

      if (!response.ok) {
        throw new Error('Failed to update product image');
      }
    } catch (error) {
      console.error('Failed to update product image:', error);
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor="product-image"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        Product Image
      </label>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
          accept="image/*"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center space-x-2"
        >
          <IoCloudUploadOutline className="w-12 h-12 text-gray-500" />
        </button>
        <span className="text-sm text-gray-700">
          {isUploading ? 'Uploading...' : imageName || 'No image selected'}
        </span>
      </div>
    </div>
  );
};

export default AddProductImage;
