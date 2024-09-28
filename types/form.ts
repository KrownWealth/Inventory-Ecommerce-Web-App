import { ChangeEvent } from "react";

export type FormFieldType = {
  label: string;
  htmlFor: string;
  type: string;
  id: string;
  isInvalid: boolean;
  errorMessage?: string;
  placeholder: string;
  startcnt?: React.ReactNode;
  endContent?: React.ReactNode;
  onChange: (value: string) => void; // Change event handler signature
  value: string;
  isRequired?: string;
  required?: boolean;
  height?: string;
};
