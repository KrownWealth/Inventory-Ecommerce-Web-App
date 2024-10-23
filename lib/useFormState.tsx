"use client"

import { useState, ChangeEvent } from "react";
import { ZodError, ZodSchema } from "zod";

export function useFormField<T>(
  initialValue: T,
  validationSchema: ZodSchema<T>,
  parser?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => T 
) {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = parser ? parser(e) : (e.target.value as unknown as T);

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

  return { value, error, handleChange };
}
