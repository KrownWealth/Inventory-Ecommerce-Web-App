"use client"

import React, { useState } from 'react';

interface DropdownButtonProps {
  categoryId: string;
  onEdit: () => void;
  onDelete: (categoryId: string) => Promise<void>;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ categoryId, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleEdit = () => {
    onEdit();
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(categoryId);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        role="button"
        aria-label="Options"
        onClick={toggleDropdown}
        className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
      >
        Options
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10"
        >
          <ul>
            <li
              data-testid="edit-category"
              onClick={handleEdit}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Edit
            </li>
            <li
              data-testid="delete-category"
              onClick={handleDelete}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
