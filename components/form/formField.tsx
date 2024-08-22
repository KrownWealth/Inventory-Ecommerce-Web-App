import React, { ChangeEvent } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FormFieldType } from '@/types';
import { cn } from '@/lib';

const FormField: React.FC<FormFieldType> = ({
  label,
  htmlFor,
  type,
  id,
  isInvalid,
  errorMessage,
  placeholder,
  startcnt,
  endContent,
  onChange,
  value,
  isRequired,
  required,
  height,
}) => {
  return (
    <div className='flex flex-col space-y-1.5 mb-4'>
      <Label
        htmlFor={htmlFor}
        className={cn(' text-sm text-black')}
      >
        {label} {isRequired && <sup className='text-danger'>*</sup>}
      </Label>
      <Input
        type={type}
        id={id}
        required={required}
        value={value}
        startContent={startcnt}
        endContent={endContent}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className='bg-slate-50'
      />
      {isInvalid && <div className='text-red-500'>{errorMessage}</div>}
    </div>
  );
};

export default FormField;
