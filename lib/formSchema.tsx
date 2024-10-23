import { z } from "zod";

export const formSchema = (
  validationFn: (value: string) => boolean,
  errorMessage: string
) => z.string().refine(validationFn, { message: errorMessage });

export const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must have 6 characters long'),
  })

// Product Name Schema
export const ProductNameSchema = formSchema(
  (data) => data.length > 0,
  "Product name cannot be empty"
);

// Price-related schemas simplified
export const CostPriceSchema = z.number().positive({
  message: "Cost price must be a positive number.",
});

export const MarkupPercentageSchema = z.number().nonnegative({
  message: "Markup percentage must be a non-negative number.",
});

export const StockSchema = z.number().positive({
  message: "Stock must be a positive number.",
});

// Required text fields using formSchema for reuse
export const DescriptionSchema = formSchema(
  (data) => data.length > 0,
  "Description cannot be empty"
);

export const CategorySchema = formSchema(
  (data) => data.length > 0,
  "Category must be selected"
);

export const StatusSchema = formSchema(
  (data) => data.length > 0,
  "Status must be selected"
);



