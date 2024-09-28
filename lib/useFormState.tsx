"use client"

import { useState } from 'react';
import { ZodError, ZodSchema } from 'zod';

export const useFormState = (initialValue: string, validationSchema: ZodSchema<string>) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>("");

  const handleChange = (newValue: string) => {
    setValue(newValue);
    try {
      validationSchema.parse(newValue);
      setError("");
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        setError(validationError.errors[0]?.message || "Validation error");
      }
    }
  };

  return {
    value,
    error,
    handleChange,
  };
};
