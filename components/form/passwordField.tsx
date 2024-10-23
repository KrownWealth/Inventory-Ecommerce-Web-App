"use client"

import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { cn } from '@/lib';

interface PasswordFieldProps {
  label: string;
  htmlFor: string;
  id: string;
  placeholder?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  htmlFor,
  id,
  placeholder,
  isRequired,
  isInvalid,
  errorMessage,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col space-y-1.5 mb-4">
      <Label htmlFor={htmlFor} className={cn("text-sm text-black")}>
        {label} {isRequired && <sup className="text-danger">*</sup>}
      </Label>
      <Input
        type={showPassword ? 'text' : 'password'}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        endContent={
          <div onClick={togglePasswordVisibility} 
          className="cursor-pointer pointer-events-auto" >
            {showPassword ? (
              <FaRegEyeSlash className="w-4 h-4" />
            ) : (
              <FaRegEye className="w-4 h-4" />
            )}
          </div>
        }
        className="bg-slate-50"
      />
      {isInvalid && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
};

export default PasswordField;
