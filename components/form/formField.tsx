import React, { ChangeEvent, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false)
  const handlePasswordVisible=()=>{
    setIsVisible(true)
  }
  return (
    <div className='flex flex-col space-y-1.5 mb-4'>
      <Label htmlFor={htmlFor} className={cn('text-sm text-black')}>
        {label} {isRequired && <sup className='text-danger'>*</sup>}
      </Label>
      <Input
        type={type}
        id={id}
        required={required}
        value={value} // The value must always be synced with the parent state
        startContent={startcnt}
        endContent={endContent}
        placeholder={placeholder}
        onChange={onChange} // Passing the entire event to onChange
        className='bg-slate-50'
      />
      {isInvalid && <div className='text-red-500'>{errorMessage}</div>}
    </div>
  );
};

export default FormField;
