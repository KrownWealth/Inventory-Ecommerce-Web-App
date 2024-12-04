import React, { ChangeEvent } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '../ui/textarea';



interface TextAreaProps {
  id: string
  label: string
  htmlFor: string
  name: string
  isInvalid: boolean
  value: string
  errorMessage: string
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextAreaField: React.FC<TextAreaProps> = ({
  id,
  label,
  htmlFor,
  name,
  isInvalid,
  errorMessage,
  required,
  value,
  onChange
}) => {

  return (
    <div className='flex flex-col space-y-1'>
      <Label htmlFor={htmlFor} className='mb-2 text-sm text-black'>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </Label>
      <Textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        aria-label="description"
      />
      {isInvalid && errorMessage && <span className='text-red-500 text-xs'>{errorMessage}</span>}
    </div>
  );
};

export default TextAreaField;
