import { FormSchema } from "@/lib";
import { z } from "zod";

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
  onChange: (value: string) => void;
  value: string;
  isRequired?: string;
  required?: boolean;
  height?: string;
};

export type FormSchemaType = z.infer<typeof FormSchema>;
