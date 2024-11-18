import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type InputType = "text" | "password" | "email" | "number" | "tel" | "url";

export type FormFieldProps = {
  label: string;
  htmlFor: string;
  name: string;
  type: InputType;
  value: string | number;
  isInvalid?: boolean;
  errorMessage?: string;
  placeholder?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  height?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  readOnly?: boolean;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  name,
  type,
  value,
  isInvalid = false,
  errorMessage,
  startContent,
  endContent,
  height,
  placeholder,
  onChange,
  required = false,
  readOnly = false,
}) => {
  const inputStyles: React.CSSProperties = height ? { height: `${height}px` } : {};

  return (
    <div className="flex flex-col space-y-1">
      <Label htmlFor={htmlFor} className="mb-2 text-sm text-black">
        {label} {required && <span className="text-red-500">*</span>}

      </Label>
      <Input
        type={type}
        name={name}
        id={htmlFor}
        value={value}
        style={inputStyles}
        onChange={onChange}
        placeholder={placeholder}
        startContent={startContent}
        endContent={endContent}
        className={`w-full ${isInvalid ? "border-red-500" : ""}`}
        readOnly={readOnly}
        autoComplete="off"
      />
      {isInvalid && errorMessage && (
        <span className="text-red-500 text-xs">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormField;
